import { combineReducers } from '@reduxjs/toolkit';
import { profileSlice } from './slices/profileSlice';
import { trainingSlice } from './slices/training/trainingSlice';
import { videoTrainingSlice } from './slices/videoTraining/videoTraining';
import { recipesSlice } from './slices/recipes/recipesSlice';
import { mealsSlice } from './slices/meals/mealsSlice';
import { customTrainingSlice } from './slices/customTrainingSlice';

const rootReducer = combineReducers({
  profile: profileSlice.reducer,
  recipes: recipesSlice.reducer,
  trainings: trainingSlice.reducer,
  videos: videoTrainingSlice.reducer,
  meals: mealsSlice.reducer,
  customTraining: customTrainingSlice.reducer
});

export { rootReducer };
