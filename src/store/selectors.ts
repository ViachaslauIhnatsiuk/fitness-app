import { RootState } from './store';

const selectProfile = (state: RootState) => state.profile;
const selectStatistics = (state: RootState) => state.profile.currentUser.statistics;
const selectUserData = (state: RootState) => state.profile.currentUser.userData;
const selectFavorites = (state: RootState) => state.profile.currentUser.favorite;
const selectRecipes = (state: RootState) => state.recipes;
const selectTrainings = (state: RootState) => state.trainings;
const selectVideos = (state: RootState) => state.videos;

export {
  selectProfile,
  selectUserData,
  selectRecipes,
  selectTrainings,
  selectVideos,
  selectStatistics,
  selectFavorites
};
