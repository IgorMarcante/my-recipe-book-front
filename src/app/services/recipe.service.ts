import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: 1,
      name: 'Bolo de Chocolate',
      prepTime: 45,
      yield: '8 porções',
      category: 'Sobremesa',
      ingredients: [
        { id: 1, name: 'Farinha', quantity: 200, unit: 'gramas' },
        { id: 2, name: 'Chocolate', quantity: 100, unit: 'gramas' }
      ],
      prepSteps: [
        { id: 1, stepOrder: 1, description: 'Misturar os ingredientes' },
        { id: 2, stepOrder: 2, description: 'Assar por 30 minutos' }
      ]
    }
  ];

  list(): Observable<Recipe[]> {
    return of(this.recipes);
  }

  create(recipe: Recipe): Observable<Recipe> {
    const newRecipe = { ...recipe, id: this.recipes.length + 1 };
    this.recipes.push(newRecipe);
    return of(newRecipe);
  }

  findById(id: number): Observable<Recipe> {
    const recipe = this.recipes.find(r => r.id === id);
    return of(recipe!);
  }

  update(id: number, recipe: Recipe): Observable<Recipe> {
    const index = this.recipes.findIndex(r => r.id === id);
    if (index !== -1) {
      this.recipes[index] = { ...recipe, id };
      return of(this.recipes[index]);
    }
    throw new Error('Receita não encontrada');
  }

  delete(id: number): Observable<void> {
    this.recipes = this.recipes.filter(r => r.id !== id);
    return of(void 0);
  }
}