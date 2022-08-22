import { RootState } from './store';

const selectProfile = (state: RootState) => state.profile;
const selectRecipes = (state: RootState) => state.recipes;

export { selectProfile, selectRecipes };
