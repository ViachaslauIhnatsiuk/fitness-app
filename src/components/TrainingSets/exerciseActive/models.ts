import { IExercise } from '../../../models/Workout';

type ExerciseActiveProps = {
  exercise: IExercise;
  exerciseGifUrl: string;
  onNextHandler: () => void;
  onPrevHandler: () => void;
  onUpdate: (remainingTime: number) => void;
  currentPosition: number;
};

export type { ExerciseActiveProps };
