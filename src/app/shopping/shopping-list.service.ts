import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChange = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()
  private ingredients:Ingredient[] = [
    new Ingredient('Chicken', 1),
    new Ingredient('Rice Bag', 2)
  ]

  constructor() {}

  getIngredients(){
    return this.ingredients.slice()
  }

  getIngredient(index:number){
    return this.ingredients[index]
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientChange.next(this.ingredients.slice())
  }

  updateIngredient(index:number, newIngredient:Ingredient){
    this.ingredients[index] = newIngredient
    this.ingredientChange.next(this.ingredients.slice())
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientChange.next(this.ingredients.slice())
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index, 1)
    this.ingredientChange.next(this.ingredients.slice())
  }
}
