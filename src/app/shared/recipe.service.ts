import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  noAuthHeader = {headers: new HttpHeaders({'NoAuth': 'True'})};

  constructor(private http : HttpClient) { }

  search(searchRequest){
    return this.http.post(environment.recipeAPIurl + '/search', searchRequest, this.noAuthHeader);
  }

  getMyRecipes(){
    return this.http.get(environment.recipeAPIurl + '/getRecipes');
  }

  delete(recipe: Recipe){
    return this.http.post(environment.recipeAPIurl + '/deleteRecipe', recipe);
  }

  add(recipe: Recipe){
    return this.http.post(environment.recipeAPIurl + '/newRecipe', recipe);
  }

  update(recipe: Recipe){
    return this.http.post(environment.recipeAPIurl + '/updateRecipe', recipe);
  }
}
