interface IDish {
  name: string;
  time: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

interface IMeal {
  [meal: string]: IDish[];
}

interface IMeals {
  [date: string]: IMeal;
}

export type { IMeal, IMeals };
