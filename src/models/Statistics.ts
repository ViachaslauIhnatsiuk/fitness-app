interface IStatistics {
  calorieExpenditure: CalorieExpenditure;
  calorieСonsumption: CalorieСonsumption;
  trainings: Trainings;
}

type Trainings = {
  totalTime: number;
  totalTrainings: number;
  dailyTimeTrainings: { [key: string]: number };
};

type CalorieExpenditure = { [key: string]: number };
type CalorieСonsumption = { [key: string]: number };

export type { IStatistics, CalorieExpenditure, CalorieСonsumption };
