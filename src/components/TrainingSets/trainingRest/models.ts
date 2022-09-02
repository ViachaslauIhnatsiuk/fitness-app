import { IExercise } from '../../../models/Workout';

type TrainingRestProps = {
  onSkipHandler: () => void;
  nextExercise: IExercise;
  exerciseGifUrl: string;
  onUpdate: (value: number) => void;
};

export type { TrainingRestProps };
