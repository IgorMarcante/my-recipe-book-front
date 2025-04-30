import { Ingredient } from './ingredient';
import { PrepStep } from './prep-step';

export interface Recipe {
  id: number;
  name: string;
  prepTime?: number;
  yield?: string;
  category?: string;
  ingredients: Ingredient[];
  prepSteps: PrepStep[];
}