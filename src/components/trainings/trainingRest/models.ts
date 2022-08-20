import { IExercise } from '../models';

type TrainingRestProps = {
  onSkipHandler: () => void;
  nextExercise: IExercise;
};

export type { TrainingRestProps };
