import { RootState } from './store';

const selectProfile = (state: RootState) => state.profile;
const selectRecipes = (state: RootState) => state.recipes;
const selectWorkout = (state: RootState) => state.workout;

export { selectProfile, selectRecipes, selectWorkout };
