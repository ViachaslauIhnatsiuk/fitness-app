import { IExercise } from '../models';

type ExerciseActiveProps = {
  exercise: IExercise;
  onClickTimerHandler: () => void;
  onNextHandler: () => void;
  onPrevHandler: () => void;
};

export type { ExerciseActiveProps };
