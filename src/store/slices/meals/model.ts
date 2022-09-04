interface MealsResponse {
  items: IMeal[];
}

interface IMeal {
  sugar_g: number;
  fiber_g: number;
  serving_size_g: number;
  sodium_mg: number;
  name: string;
  potassium_mg: number;
  fat_saturated_g: number;
  fat_total_g: number;
  calories: number;
  cholesterol_mg: number;
  protein_g: number;
  carbohydrates_total_g: number;
}

interface IDailyMeals {
  id: number;
  title: string;
  date: string;
  meals: IMeal[];
}

interface MealsState {
  currentMeals: MealsResponse;
  isLoading: boolean;
  isUploaded: boolean;
  error: string;
  mealCardId: number | null;
}

export type { IMeal, MealsResponse, IDailyMeals, MealsState };
