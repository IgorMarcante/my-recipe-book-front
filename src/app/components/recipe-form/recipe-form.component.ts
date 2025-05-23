import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  editMode = false;
  // Lista de unidades de medida
  unitOptions: string[] = [
    'caixa(s)',
    'colher(es) de chá',
    'colher(es) de sopa',
    'grama(s)',
    'litro(s)',
    'mililitro(s)',
    'pitada(s)',
    'quilograma(s)',
    'unidade(s)',
    'xícara(s)'
  ];

  // Lista de categorias de receitas
  categoryOptions: string[] = [
    'Acompanhamento',
    'Bebida',
    'Carne',
    'Doce',
    'Entrada',
    'Massa',
    'Pão',
    'Peixe e Frutos do Mar',
    'Prato Principal',
    'Salgado',
    'Sobremesa',
    'Sopa e Caldo'
  ].sort();

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService

  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      prepTime: [null, Validators.min(0)],
      yield: [''],
      category: ['', Validators.required],
      ingredients: this.fb.array([]),
      prepSteps: this.fb.array([])
    });
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.recipeService.findById(Number(id)).subscribe((recipe) => {
        this.recipeForm.patchValue({
          name: recipe.name,
          prepTime: recipe.prepTime,
          yield: recipe.yield,
          category: recipe.category
        });
        recipe.ingredients.forEach((ingredient) => {
          this.ingredients.push(this.fb.group({
            id: [ingredient.id],
            name: [ingredient.name, Validators.required],
            quantity: [ingredient.quantity, [Validators.required]],
            unit: [ingredient.unit, Validators.required]
          }));
        });
        recipe.prepSteps.forEach((step) => {
          this.prepSteps.push(this.fb.group({
            id: [step.id],
            stepOrder: [step.stepOrder, Validators.required],
            description: [step.description, Validators.required]
          }));
        });
      });
    }
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
      console.log('Dados enviados para o serviço:', recipe);
      if (this.editMode) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.recipeService.update(id, recipe).subscribe((updatedRecipe) => {
          console.log('Receita atualizada:', updatedRecipe);
          this.notificationService.show('Receita atualizada com sucesso!', 'success');
          this.router.navigate(['/']);
        });
      } else {
        this.recipeService.create(recipe).subscribe({
          next: (newRecipe) => {
            console.log('Receita adicionada:', newRecipe);
            this.notificationService.show('Receita salva com sucesso!', 'success');
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.notificationService.show('Erro ao salvar receita.', 'error');
            console.error('Erro ao adicionar receita:', error);
          }
        });
      }
    } else {
      console.log('Formulário inválido:', this.recipeForm.errors);
      this.notificationService.show('Formulário inválido.', 'error');
    }
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
}