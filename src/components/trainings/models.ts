interface ITraining {
  id: number;
  title: string;
  level: string;
  img: string;
  exercises: IExercise[];
}

interface IExercise {
  title: string;
  description: string;
  time: number;
  img: string;
}

enum Path {
  home = '/',
  trainings = '/workout/trainings',
  videoTrainings = '/workout/videos'
}

export { Path };
export type { ITraining, IExercise };
