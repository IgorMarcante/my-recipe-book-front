import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      prepTime: [null, Validators.min(0)],
      yield: [''],
      category: [''],
      ingredients: this.fb.array([]),
      prepSteps: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Inicialização mantida simples por enquanto
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get prepSteps(): FormArray {
    return this.recipeForm.get('prepSteps') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required]
    }));
  }

  addPrepStep(): void {
    this.prepSteps.push(this.fb.group({
      stepOrder: [this.prepSteps.length + 1, Validators.required],
      description: ['', Validators.required]
    }));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  removePrepStep(index: number): void {
    this.prepSteps.removeAt(index);
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const recipe: Recipe = this.recipeForm.value;
      console.log('Dados enviados para o serviço:', recipe); // Log para depuração
      this.recipeService.create(recipe).subscribe((newRecipe) => {
        console.log('Receita adicionada:', newRecipe); // Log para confirmar adição
        this.router.navigate(['/']);
      });
    } else {
      console.log('Formulário inválido:', this.recipeForm.errors); // Log para depuração
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}