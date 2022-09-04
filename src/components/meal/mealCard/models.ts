import { IMeal } from '../../../store/slices/meals/model';

interface MealCardProps {
  id: number;
  title: string;
  meals: IMeal[];
}

interface DishFormInputs {
  dishName: string;
  dishSize: number;
}

export type { MealCardProps, DishFormInputs };
