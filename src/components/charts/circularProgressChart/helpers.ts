import { getConsumption } from '../../../helpers/getConsumption';
import { IConsumption } from '../../../models/Consumption';
import { IDailyMeals } from '../../../store/slices/meals/model';

const getConsumptionStatistic = (dailyMeals: IDailyMeals[]): IConsumption => {
  const meals = dailyMeals.map((dailyMeal) => dailyMeal.meals).flat();
  const statistic = getConsumption(meals);
  return statistic;
};

const convertMinutesToHours = (minutes: number): number => {
  return Math.ceil(minutes / 3600);
};

const convertToThousands = (calories: number): number => {
  return Math.ceil(calories / 1000);
};

export { getConsumptionStatistic, convertMinutesToHours, convertToThousands };
