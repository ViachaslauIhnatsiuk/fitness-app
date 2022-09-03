import { IDailyMeals } from '../../store/slices/meals/model';

type ReturnType = { [key: string]: number };

const getConsumptionCaloriesByDate = (dailyMeals: IDailyMeals[]): ReturnType => {
  const result: ReturnType = {};

  dailyMeals.forEach(({ date, meals }) => {
    const sumCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
    if (result[date]) {
      result[date] += sumCalories;
    } else {
      result[date] = sumCalories;
    }
  });

  return result;
};

export { getConsumptionCaloriesByDate };
