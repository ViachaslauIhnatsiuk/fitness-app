type IWorkouts = { [key: number]: IWorkout };

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
  videos: IVideos;
}

type IVideos = { [key: number]: IVideo };

interface IVideo {
  id: number;
  title: string;
  category: string;
  details: VideoDetails;
}

interface ICategories {
  categories: string[];
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

enum FirestoreCollection {
  trainings = 'trainings',
  videoTrainings = 'videoTrainings'
}

enum FirestoreDocument {
  trainings = 'Trainings',
  videos = 'Videos',
  categories = 'Categories'
}

export type { IVideoTrainings, IVideo, IWorkouts, IWorkout, IExercise, IVideos, ICategories };
export { WorkoutPath, WorkoutStatus, WorkoutFilterByLevel, FirestoreCollection, FirestoreDocument };
