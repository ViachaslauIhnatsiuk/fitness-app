import { IExercise } from '../../../models/Workout';

type TrainingRestProps = {
  onSkipHandler: () => void;
  nextExercise: IExercise;
  exerciseGifUrl: string;
};

export type { TrainingRestProps };
