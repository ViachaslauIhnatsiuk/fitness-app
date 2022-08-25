interface IWorkouts {
  trainings: IWorkout[];
}
interface IWorkout {
  id: number;
  title: string;
  level: WorkoutFilterByLevel;
  cal: number;
  exercises: IExercise[];
}

interface IExercise {
  title: string;
  time: number;
}

interface IVideoTrainings {
  categories: string[];
  videos: IVideo[];
}
interface IVideo {
  id: number;
  title: string;
  category: string;
  details: VideoDetails;
}

type VideoDetails = {
  description: string;
  cal: number;
  rest: number;
  levels: number[];
  reps: string;
};

enum WorkoutPath {
  home = '/',
  trainings = '/workout/trainings',
  videoTrainings = '/workout/videos'
}

enum WorkoutStatus {
  loading = 'loading',
  resolved = 'resolved',
  rejected = 'rejected'
}

enum WorkoutFilterByLevel {
  all = 'All',
  beginner = 'Beginner',
  intermediate = 'Intermediate',
  advanced = 'Advanced'
}

export type { IVideoTrainings, IVideo, IWorkouts, IWorkout, IExercise };
export { WorkoutPath, WorkoutStatus, WorkoutFilterByLevel };
