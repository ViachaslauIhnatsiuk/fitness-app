interface IStatistics {
  calorieExpenditure: CalorieExpenditure;
  calorieСonsumption: CalorieСonsumption;
}

type CalorieExpenditure = { [key: string]: number };
type CalorieСonsumption = { [key: string]: number };

export type { IStatistics };
