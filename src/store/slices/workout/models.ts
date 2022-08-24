import { IVideo, IWorkout, Status } from '../../../models/Workout';

type WorkoutState = {
  videos: IVideo[];
  trainings: IWorkout[];
  categories: string[];
  status: Status;
  error: string;
};

export type { WorkoutState };
