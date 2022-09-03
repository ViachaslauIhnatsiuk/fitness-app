import { FavoritePath } from '../../../models/Favorite';
import { WorkoutPath } from '../../../models/Workout';

const buildRedirectPath = (currentPath: string, trainingId: number): string => {
  if (
    currentPath.includes(FavoritePath.customTrainings) ||
    currentPath.includes(FavoritePath.trainings)
  ) {
    return `${WorkoutPath.trainings}/${String(trainingId)}/`;
  }

  return `${String(trainingId)}/`;
};

export { buildRedirectPath };
