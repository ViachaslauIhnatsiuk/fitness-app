import { IExercise } from '../../../../models/Workout';

type ExercisesProps = {
  selectedExercises: IExercise[];
  onClickHandler: (exercise: IExercise) => void;
};

export type { ExercisesProps };
