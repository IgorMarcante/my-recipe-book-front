import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'new-recipe', component: RecipeFormComponent, canActivate: [AuthGuard] },
  { path: 'recipe/:id', component: RecipeDetailComponent, canActivate: [AuthGuard]},
  { path: 'edit-recipe/:id', component: RecipeFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];