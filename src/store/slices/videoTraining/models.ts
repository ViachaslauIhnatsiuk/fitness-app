import { IVideo, WorkoutStatus } from '../../../models/Workout';

type VideoTrainingState = {
  videos: IVideo[];
  categories: string[];
  favorite: IVideo[];
  status: WorkoutStatus;
  error: string;
};

export type { VideoTrainingState };
