import { FavoritePath } from '../../../models/Favorite';
import { WorkoutPath } from '../../../models/Workout';

const buildRedirectPath = (currentPath: string, videoCategory: string, videoId: number): string => {
  const path = currentPath.includes(FavoritePath.videos)
    ? `${WorkoutPath.videoTrainings}/${videoCategory}/${String(videoId)}/`
    : `${String(videoId)}/`;

  return path;
};

export { buildRedirectPath };
