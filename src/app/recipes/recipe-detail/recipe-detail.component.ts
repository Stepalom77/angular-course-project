import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe
  id:number

  constructor(private recipeService:RecipeService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id']
        this.recipe = this.recipeService.getRecipe(this.id)
      }
    )
  }

  onAddShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo:this.route})
  }

}
