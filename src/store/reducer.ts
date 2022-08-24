import { combineReducers } from '@reduxjs/toolkit';
import { profileSlice } from './slices/profileSlice';
import { recipesSlice } from './slices/recipesSlice';
import { workoutSlice } from './slices/workout/workoutSlice';

const rootReducer = combineReducers({
  profile: profileSlice.reducer,
  recipes: recipesSlice.reducer,
  workout: workoutSlice.reducer
});

export { rootReducer };
