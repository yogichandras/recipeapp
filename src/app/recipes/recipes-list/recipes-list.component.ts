import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipes.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit,OnDestroy {

  recipes:Recipe[];
  subscription:Subscription;
  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) {
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnInit() {
 this.subscription = this.recipeService.recipesChange.subscribe(
      (recipe: Recipe[])=>{
        this.recipes = recipe;
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'],{relativeTo:this.route});
  }
}
