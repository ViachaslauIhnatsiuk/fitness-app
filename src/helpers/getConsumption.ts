import { IConsumption } from '../models/Consumption';
import { IMeal } from '../store/slices/meals/model';

const getConsumption = (meals: IMeal[]): IConsumption => {
  return {
    calories: Math.round(meals.reduce((acc, cur) => acc + cur.calories, 0)),
    proteins: Math.round(meals.reduce((acc, cur) => acc + cur.protein_g, 0)),
    fats: Math.round(meals.reduce((acc, cur) => acc + cur.fat_total_g, 0)),
    carbs: Math.round(meals.reduce((acc, cur) => acc + cur.carbohydrates_total_g, 0))
  };
};

export { getConsumption };
