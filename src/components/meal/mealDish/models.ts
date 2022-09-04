import { IMeal } from '../../../store/slices/meals/model';

interface MealDishProps {
  mealCardId: number;
  mealDishId: number;
  props: IMeal;
}

export type { MealDishProps };
