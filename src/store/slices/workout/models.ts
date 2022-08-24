import { IVideo, IWorkout } from '../../../models/Workout';

type WorkoutState = {
  videos: IVideo[];
  trainings: IWorkout[];
  status: 'loading' | 'resolved' | 'rejected';
  error: string;
};

export type { WorkoutState };
