import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping/shopping-list.service';
import { Recipe } from './recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes:Recipe[] = [
    new Recipe('Arroz con pollo', 'This is a recipe for the arroz con pollo peruvian dish',
     'https://comidasperuanas.net/wp-content/uploads/2015/07/Arroz-con-pollo-peruano.webp', [
      new Ingredient('Rice', 2), new Ingredient('Chicken', 1)
     ]),
     new Recipe('Arroz con pollo', 'This is a recipe for the arroz con pollo peruvian dish',
     'https://comidasperuanas.net/wp-content/uploads/2015/07/Arroz-con-pollo-peruano.webp', [
      new Ingredient('Rice', 2), new Ingredient('Chicken', 1)
     ])
  ]
  constructor(private shoppingListService:ShoppingListService) {}

  getRecipes(){
    return this.recipes.slice()
  }

  getRecipe(index:number){
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.shoppingListService.addIngredients(ingredients)
  }
}
