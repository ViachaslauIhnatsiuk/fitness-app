import { RootState } from './store';

const selectProfile = (state: RootState) => state.profile;
const selectRecipes = (state: RootState) => state.recipes;
const selectTrainings = (state: RootState) => state.trainings;
const selectVideos = (state: RootState) => state.videos;

export { selectProfile, selectRecipes, selectTrainings, selectVideos };
