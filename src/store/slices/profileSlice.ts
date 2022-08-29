import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../../components/registration/registrationUserData/models';
import { toggleValueInArray } from '../../helpers/toggleValueInArray';
import { updateFirestoreState } from '../../helpers/updateFirestoreState';
import { IUser } from '../../models/User';
import type { ProfileState } from '../model';
import { convertDateToString } from '../helpers';
import { IRecipeInfoShort } from '../../models/modelRecipeById';
import { toggleObjectInArray } from '../../helpers/toggleObjectInArray';

const initialState: ProfileState = {
  isAuth: false,
  currentUser: {
    avatar: '',
    name: '',
    email: '',
    password: '',
    id: '',
    token: '',
    userData: {
      gender: 'male',
      age: 30,
      height: 170,
      weight: 60,
      activity: 'intermediate',
      goal: 'get fitter'
    },
    statistics: { calorieExpenditure: {}, calorieСonsumption: {} },
    favorite: { videoTrainings: [], trainings: [], recipes: [] }
  }
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLogIn: (state) => {
      state.isAuth = true;
    },
    setLogOut: (state) => {
      state.isAuth = false;
    },
    setUserState: (state, { payload: user }: PayloadAction<IUser>) => {
      const { currentUser } = state;
      const { favorite, statistics } = user;
      currentUser.userData = user.userData;
      currentUser.id = user.id;
      currentUser.email = user.email;
      currentUser.name = user.name;
      currentUser.password = user.password;
      currentUser.token = user.token;

      if (favorite) currentUser.favorite = favorite;
      if (statistics) currentUser.statistics = statistics;
    },
    setNewUser: (state, { payload }: PayloadAction<IUserData>) => {
      state.currentUser.userData = payload;
    },
    setVideoTrainingToFavorites: (state, { payload: videoId }: PayloadAction<number>) => {
      const {
        currentUser: { favorite }
      } = state;

      favorite.videoTrainings = toggleValueInArray(favorite.videoTrainings, videoId);
      updateFirestoreState(state.currentUser);
    },
    setTrainingToFavorites: (state, { payload: trainingId }: PayloadAction<number>) => {
      const {
        currentUser: { favorite }
      } = state;

      favorite.trainings = toggleValueInArray(favorite.trainings, trainingId);
      updateFirestoreState(state.currentUser);
    },
    toggleRecipeInFavorites: (state, { payload }: PayloadAction<IRecipeInfoShort>) => {
      const {
        currentUser: { favorite }
      } = state;

      favorite.recipes = toggleObjectInArray(favorite.recipes, payload);
      updateFirestoreState(state.currentUser);
    },
    setCalorieExpenditure: (state, { payload: calorie }: PayloadAction<number>) => {
      const {
        currentUser: { statistics }
      } = state;
      const { calorieExpenditure } = statistics;

      const date = convertDateToString(new Date());

      if (!calorieExpenditure[date]) {
        calorieExpenditure[date] = calorie;
      }

      const cal = calorieExpenditure[date];
      calorieExpenditure[date] = calorie + cal;

      updateFirestoreState(state.currentUser);
    },
    setCalorieСonsumption: ({ currentUser }, { payload: calorie }: PayloadAction<number>) => {
      const {
        statistics: { calorieСonsumption }
      } = currentUser;
      const date = convertDateToString(new Date());
      calorieСonsumption[date] = calorie;
    }
  }
});

export const {
  setLogIn,
  setLogOut,
  setNewUser,
  setUserState,
  setVideoTrainingToFavorites,
  setTrainingToFavorites,
  toggleRecipeInFavorites,
  setCalorieExpenditure,
  setCalorieСonsumption
} = profileSlice.actions;
export { profileSlice };
