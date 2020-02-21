import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  searchForm: FormGroup;
  errorMessage: string;
  searchResults: any;
  recipeToView: Recipe;
  searchOptions = ['Title', 'Tags', 'Ingredient', 'Description'];

  constructor(private fb : FormBuilder, private recipeService : RecipeService, private router : Router) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      'term' : ['', [Validators.required]],
      'searchBy' : ['', [Validators.required]]
    })
  }

  onSubmit(){
    var searchRequest: string;
    if(this.searchForm.value.searchBy != 'ingredient'){
      searchRequest = '{ "' + this.searchForm.value.searchBy + '" : { "$regex" : "' + this.searchForm.value.term + '", "$options": "i" } }';
      this.recipeService.search(JSON.parse(searchRequest)).subscribe(
        result => {this.searchResults = result},
        error => {this.errorMessage = error.error.message}
      )
    }
    else{
      searchRequest = '{ "ingredients.ingredient" : { "$regex" : "' + this.searchForm.value.term + '", "$options": "i" } }';
      this.recipeService.search(JSON.parse(searchRequest)).subscribe(
        result => {this.searchResults = result},
        error => {this.errorMessage = error.error.message}
      )
    }
  }

  view(recipe: Recipe){
    this.recipeToView = recipe;
  }

  backToSearch(){
    this.recipeToView = null;
  }

}
