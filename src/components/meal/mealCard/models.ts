import { IMeal } from '../../../store/slices/meals/model';

export interface MealCardProps {
  id: number;
  title: string;
  meals: IMeal[];
}
