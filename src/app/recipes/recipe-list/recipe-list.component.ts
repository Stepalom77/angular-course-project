import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>()
  recipes:Recipe[] = [
    new Recipe('Arroz con pollo', 'This is a recipe for the arroz con pollo peruvian dish',
     'https://comidasperuanas.net/wp-content/uploads/2015/07/Arroz-con-pollo-peruano.webp')
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe)
  }

}
