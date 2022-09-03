import { IWorkout } from '../../../models/Workout';

const isCustomTraining = (trainings: IWorkout[], trainingId: string): boolean => {
  return !!trainings.find(({ id }) => id === Number(trainingId));
};

export { isCustomTraining };
