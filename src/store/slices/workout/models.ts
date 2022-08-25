import { IVideo, IWorkout, WorkoutFilterByLevel, WorkoutStatus } from '../../../models/Workout';

type WorkoutState = {
  videos: IVideo[];
  trainings: IWorkout[];
  categories: string[];
  filterBySearch: string;
  filterByLevel: WorkoutFilterByLevel;
  status: WorkoutStatus;
  error: string;
};

export type { WorkoutState };
