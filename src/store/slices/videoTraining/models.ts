import { IVideo, WorkoutStatus } from '../../../models/Workout';

type VideoTrainingState = {
  videos: IVideo[];
  categories: string[];
  status: WorkoutStatus;
  error: string;
};

export type { VideoTrainingState };
