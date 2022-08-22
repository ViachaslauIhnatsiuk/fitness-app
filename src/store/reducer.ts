import { combineReducers } from '@reduxjs/toolkit';
import { profileSlice } from './slices/profileSlice';
import { recipesSlice } from './slices/recipesSlice';

const rootReducer = combineReducers({
  profile: profileSlice.reducer,
  recipes: recipesSlice.reducer
});

export { rootReducer };
