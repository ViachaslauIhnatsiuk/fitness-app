import { combineReducers } from '@reduxjs/toolkit';
import { profileSlice } from './slices/profileSlice';
import { recipesSlice } from './slices/recipesSlice';
import { trainingSlice } from './slices/training/trainingSlice';
import { videoTrainingSlice } from './slices/videoTraining/videoTraining';

const rootReducer = combineReducers({
  profile: profileSlice.reducer,
  recipes: recipesSlice.reducer,
  trainings: trainingSlice.reducer,
  videos: videoTrainingSlice.reducer
});

export { rootReducer };
