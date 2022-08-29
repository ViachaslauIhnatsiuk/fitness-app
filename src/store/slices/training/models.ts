import { IWorkout, WorkoutFilterByLevel, WorkoutStatus } from '../../../models/Workout';

type TrainingState = {
  trainings: IWorkout[];
  favorite: IWorkout[];
  filterBySearch: string;
  filterByLevel: WorkoutFilterByLevel;
  status: WorkoutStatus;
  error: string;
};

export type { TrainingState };
