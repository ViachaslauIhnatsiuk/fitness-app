import { IExercise, IWorkout } from '../../../models/Workout';

const getExercisesFromTrainings = (trainings: IWorkout[]): IExercise[] => {
  const result: IExercise[] = [];

  for (const training of trainings) {
    const { exercises } = training;
    if (result.length < 20) {
      result.push(...exercises);
    }
  }
  const resultWithoutDuplicates = Array.from(new Set(result));
  return resultWithoutDuplicates.slice(0, 20);
};

export { getExercisesFromTrainings };
