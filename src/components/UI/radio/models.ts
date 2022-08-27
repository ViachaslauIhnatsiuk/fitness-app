import { ChangeEvent } from 'react';
import { WorkoutFilterByLevel } from '../../../models/Workout';

type RadioProps = {
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  state?: WorkoutFilterByLevel;
};

export type { RadioProps };
