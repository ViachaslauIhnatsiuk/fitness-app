import { getConsumption } from '../../../helpers/getConsumption';
import { IConsumption } from '../../../models/Consumption';
import { IDailyMeals } from '../../../store/slices/meals/model';

const getConsumptionStatistic = (dailyMeals: IDailyMeals[]): IConsumption => {
  const meals = dailyMeals.map((dailyMeal) => dailyMeal.meals).flat();
  const statistic = getConsumption(meals);
  return statistic;
};

const convertMinutesToHours = (minutes: number): number => {
  const hours = Number((minutes / 3600).toFixed(2));

  if (!hours) {
    return minutes;
  }
  return hours;
};

const convertToThousands = (calories: number): number => {
  const thousands = Number((calories / 1000).toFixed(2));
  if (!thousands) return calories;
  return thousands;
};

export { getConsumptionStatistic, convertMinutesToHours, convertToThousands };
