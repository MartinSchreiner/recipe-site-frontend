import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from '../shared/recipe.model';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit {

  mode: string = 'displayAll';
  userRecipes: any;
  errorMessage: string;
  successMessage: string;
  recipeToView: Recipe;
  addRecipeForm: FormGroup;
  updateRecipeForm: FormGroup;
  needsId: boolean;

  constructor(private recipeService : RecipeService, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.recipeService.getMyRecipes().subscribe(
      res => {this.userRecipes = res},
      err => {this.errorMessage = err.error.message}
    );
    this.addRecipeForm = this.fb.group({
      authorId:[this.userService.getUserPayload()._id],
      title: ['', [Validators.required]],
      description: [''],
      ingredients: this.fb.array([this.createIngredient()]),
      steps: this.fb.array([new FormControl('', [Validators.required])]),
      tags: this.fb.array([new FormControl('', [Validators.required])])
    })
    this.needsId = true;
    this.updateRecipeForm = this.fb.group({
      '_id': '',
      authorId:[this.userService.getUserPayload()._id],
      title: ['', [Validators.required]],
      description: [''],
      ingredients: this.fb.array([this.createIngredient()]),
      steps: this.fb.array([new FormControl('', [Validators.required])]),
      tags: this.fb.array([new FormControl('', [Validators.required])]),
      '__v':''
    })
    this.needsId=false; 
  }
  //view changers
  view(recipe: Recipe){
    this.mode='view';
    this.recipeToView = recipe;
  }

  displayAll(){
    this.mode='displayAll';
  }

  addMode(){
    this.mode='add';
  }

  updateMode(recipe: Recipe){
    this.needsId = true;
    while((this.updateRecipeForm.get('ingredients') as FormArray).controls.length < recipe.ingredients.length){
      this.addIngredient(this.updateRecipeForm);
    }
    while((this.updateRecipeForm.get('steps') as FormArray).controls.length < recipe.steps.length){
      this.addStep(this.updateRecipeForm);
    }
    while((this.updateRecipeForm.get('tags') as FormArray).controls.length < recipe.tags.length){
      this.addTag(this.updateRecipeForm);
    }
    this.updateRecipeForm.setValue(recipe);
    this.needsId=false;
    this.mode='update';
  }

  //Form field controls
  createIngredient() : FormGroup {
    if(this.needsId)
    return this.fb.group({
      '_id':'',
      'amount': ['', [Validators.required]],
      'ingredient': ['', [Validators.required]]
    });
    else
    return this.fb.group({
      'amount': ['', [Validators.required]],
      'ingredient': ['', [Validators.required]]
    });
  }

  addIngredient(form: FormGroup){
    (form.get('ingredients') as FormArray).push(this.createIngredient());
  }

  addStep(form: FormGroup){
    (form.get('steps') as FormArray).push(new FormControl('', [Validators.required]));
  }

  addTag(form: FormGroup){
    (form.get('tags') as FormArray).push(new FormControl('', [Validators.required]));
  }

  deleteIngredient(form: FormGroup, index: number){
    (form.get('ingredients') as FormArray).removeAt(index);
  }

  deleteStep(form: FormGroup, index: number){
    (form.get('steps') as FormArray).removeAt(index);
  }

  deleteTag(form: FormGroup, index: number){
    (form.get('tags') as FormArray).removeAt(index);
  }

  //Service calls
  refreshRecipes() {
    this.recipeService.getMyRecipes().subscribe(
      res => {this.userRecipes = res},
      err => {this.errorMessage = err.error.message}
    );
  }

  delete(recipe: Recipe){
    if(confirm('Are you sure you want to delete "' + recipe.title + '"')){
      this.recipeService.delete(recipe).pipe(finalize(() => { this.refreshRecipes();})).subscribe(
        res => {},
        err => {this.errorMessage = err.error.message}
      );
    }else{

    }
  }

  add(){
    this.recipeService.add(this.addRecipeForm.value).pipe(finalize(() => { this.refreshRecipes(); this.mode = 'displayAll';})).subscribe(
      res => {},
      err => {this.errorMessage = err.error.message}
    );
  }

  update(){
    this.recipeService.update(this.updateRecipeForm.value).pipe(finalize(() => { this.refreshRecipes(); this.mode = 'displayAll';})).subscribe(
      res => {},
      err => {this.errorMessage = err.error.message}
    );
  }
  
}
