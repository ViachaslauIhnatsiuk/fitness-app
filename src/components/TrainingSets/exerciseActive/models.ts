import { IExercise } from '../../../models/Workout';

type ExerciseActiveProps = {
  exercise: IExercise;
  exerciseGifUrl: string;
  onClickTimerHandler: () => void;
  onNextHandler: () => void;
  onPrevHandler: () => void;
};

export type { ExerciseActiveProps };
