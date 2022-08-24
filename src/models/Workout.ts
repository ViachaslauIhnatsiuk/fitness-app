interface IWorkouts {
  trainings: IWorkout[];
}
interface IWorkout {
  id: number;
  title: string;
  level: 'Begginer' | 'Intermediate' | 'Advanced';
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

enum Path {
  home = '/',
  trainings = '/workout/trainings',
  videoTrainings = '/workout/videos'
}

export type { IVideoTrainings, IVideo, IWorkouts, IWorkout, IExercise };
export { Path };
