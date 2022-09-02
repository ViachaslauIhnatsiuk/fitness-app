import { IConsumption } from '../../../models/Consumption';

export interface NutritionCardProps {
  title: string;
  curScore: IConsumption;
  maxScore: IConsumption;
}
