import { RootState } from './store';

const selectProfile = (state: RootState) => state.profile;
const selectStatistics = (state: RootState) => state.profile.currentUser.statistics;
const selectUserData = (state: RootState) => state.profile.currentUser.userData;
const selectUserMeals = (state: RootState) => state.profile.currentUser.userMeals;
const selectFavorites = (state: RootState) => state.profile.currentUser.favorite;
const selectRecipes = (state: RootState) => state.recipes;
const selectMeals = (state: RootState) => state.meals;
const selectTrainings = (state: RootState) => state.trainings;
const selectVideos = (state: RootState) => state.videos;

export {
  selectProfile,
  selectUserData,
  selectUserMeals,
  selectFavorites,
  selectRecipes,
  selectMeals,
  selectTrainings,
  selectVideos,
  selectStatistics,
  selectFavorites
};
