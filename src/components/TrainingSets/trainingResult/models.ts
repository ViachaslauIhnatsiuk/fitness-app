type TrainingResultProps = {
  statisticsOfTraining: Statistics;
};

type Statistics = {
  time: number;
  cal: number;
  calPerExercise: number;
};

export type { TrainingResultProps };
