import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChange = new Subject<Ingredient[]>()
  private ingredients:Ingredient[] = [
    new Ingredient('Chicken', 1),
    new Ingredient('Rice Bag', 2)
  ]

  constructor() {}

  getIngredient(){
    return this.ingredients.slice()
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientChange.next(this.ingredients.slice())
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientChange.next(this.ingredients.slice())
  }
}
