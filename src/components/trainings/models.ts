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

export type { ITraining, IExercise };
