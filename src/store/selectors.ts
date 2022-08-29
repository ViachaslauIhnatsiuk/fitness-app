import { RootState } from './store';

const selectProfile = (state: RootState) => state.profile;
const selectUserData = (state: RootState) => state.profile.currentUser.userData;
const selectFavorites = (state: RootState) => state.profile.currentUser.favorite;
const selectRecipes = (state: RootState) => state.recipes;
const selectTrainings = (state: RootState) => state.trainings;
const selectVideos = (state: RootState) => state.videos;

export {
  selectProfile,
  selectUserData,
  selectFavorites,
  selectRecipes,
  selectTrainings,
  selectVideos
};
