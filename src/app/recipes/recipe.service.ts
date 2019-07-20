import {Recipe} from "./recipes.model";
import { Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";


@Injectable()
export class RecipeService {
  recipesChange = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test Recipe',
  //     'This is simply desc',
  //     'https://images-na.ssl-images-amazon.com/images/I/61k9AjsgiEL._SX258_BO1,204,203,200_.jpg',
  //     [new Ingredient('Meat',1),
  //     new Ingredient('French Fries',20)]),
  //   new Recipe(
  //     'Another Test Recipe',
  //     'This is simply desc',
  //     'https://images-na.ssl-images-amazon.com/images/I/61k9AjsgiEL._SX258_BO1,204,203,200_.jpg',
  //     [new Ingredient('Tomattoes',2),
  //     new Ingredient('Pottatoes',2)])
  // ];
  private recipes:Recipe[] = [];

  constructor(private slService:ShoppingListService) {

  }


  getRecipes(){
   return this.recipes.slice();
 }

 addIngredientsToShoppingList(ingredients:Ingredient[]){
this.slService.addIngredients(ingredients);
 }

 getRecipe(index:number){
    return this.recipes[index];
 }

 addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
   this.recipesChange.next(this.recipes.slice());

 }

 updateRecipe(index: number, newRecipe:Recipe){
    this.recipes[index] = newRecipe;
   this.recipesChange.next(this.recipes.slice());

 }

 deleteRecipe(index:number){
    this.recipes.splice(index,1);
   this.recipesChange.next(this.recipes.slice());

 }

 setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipesChange.next(this.recipes.slice());
 }

}
