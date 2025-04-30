import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';

export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'new-recipe', component: RecipeFormComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'edit-recipe/:id', component: RecipeFormComponent },
  { path: '**', redirectTo: '' }
];