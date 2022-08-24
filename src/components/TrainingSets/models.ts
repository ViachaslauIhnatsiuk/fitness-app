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

export type { IWorkouts, IWorkout, IExercise };
