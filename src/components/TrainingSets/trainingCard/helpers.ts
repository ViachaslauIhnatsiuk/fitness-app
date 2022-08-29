import { FavoritePath } from '../../../models/Favorite';
import { WorkoutPath } from '../../../models/Workout';

const buildRedirectPath = (currentPath: string, trainingId: number): string => {
  const path = currentPath.includes(FavoritePath.trainings)
    ? `${WorkoutPath.trainings}/${String(trainingId)}/`
    : `${String(trainingId)}/`;

  return path;
};

export { buildRedirectPath };
