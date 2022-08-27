import { RootState } from './store';

const selectProfile = (state: RootState) => state.profile;
const selectUserData = (state: RootState) => state.profile.currentUser.userData;
const selectRecipes = (state: RootState) => state.recipes;
const selectWorkout = (state: RootState) => state.workout;

export { selectProfile, selectUserData, selectRecipes, selectWorkout };
