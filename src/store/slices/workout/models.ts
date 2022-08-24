import { IVideo, IWorkout, Status } from '../../../models/Workout';

type WorkoutState = {
  videos: IVideo[];
  trainings: IWorkout[];
  status: Status;
  error: string;
};

export type { WorkoutState };
