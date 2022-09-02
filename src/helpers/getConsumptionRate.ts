import { IConsumption } from '../models/Consumption';

const getConsumptionRate = (
  gender: string,
  weight: number,
  height: number,
  age: number,
  goal: string
): IConsumption => {
  let result = {
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0
  };
  let calories = 0;
  if (gender === 'male') {
    calories = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    calories = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }
  switch (goal) {
    case 'get fitter':
      calories *= 0.9;
      result = {
        calories: Math.round(calories),
        proteins: Math.round((calories * 0.15) / 4),
        fats: Math.round((calories * 0.3) / 9),
        carbs: Math.round((calories * 0.55) / 4)
      };
      break;
    case 'gain weight':
      calories *= 1.2;
      result = {
        calories: Math.round(calories),
        proteins: Math.round((calories * 0.1) / 4),
        fats: Math.round((calories * 0.25) / 9),
        carbs: Math.round((calories * 0.65) / 4)
      };
      break;
    case 'lose weight':
      calories *= 0.8;
      result = {
        calories: Math.round(calories),
        proteins: Math.round((calories * 0.15) / 4),
        fats: Math.round((calories * 0.25) / 9),
        carbs: Math.round((calories * 0.6) / 4)
      };
      break;
    case 'building muscles':
      calories *= 1.1;
      result = {
        calories: Math.round(calories),
        proteins: Math.round((calories * 0.15) / 4),
        fats: Math.round((calories * 0.2) / 9),
        carbs: Math.round((calories * 0.65) / 4)
      };
      break;
  }
  return result;
};

export { getConsumptionRate };
