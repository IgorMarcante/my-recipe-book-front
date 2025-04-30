import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:8080/api/recipes';

  constructor() {}

  list(): Observable<Recipe[]> {
    return of([
      {
        id: 1,
        name: 'Bolo de Chocolate',
        prepTime: 45,
        yield: '8 porções',
        category: 'Sobremesa',
        ingredients: [{ id: 1, name: 'Farinha', quantity: 200, unit: 'gramas' }],
        prepSteps: [{ id: 1, stepOrder: 1, description: 'Misturar os ingredientes' }]
      }
    ]);
  }

  create(recipe: Recipe): Observable<Recipe> { return of(recipe); }
  findById(id: number): Observable<Recipe> { return of({} as Recipe); }
  update(id: number, recipe: Recipe): Observable<Recipe> { return of(recipe); }
  delete(id: number): Observable<void> { return of(); }
}