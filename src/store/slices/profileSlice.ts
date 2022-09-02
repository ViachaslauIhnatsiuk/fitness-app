import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../../components/registration/registrationUserData/models';
import { toggleValueInArray } from '../../helpers/toggleValueInArray';
import { updateFirestoreState } from '../../helpers/updateFirestoreState';
import { IUser } from '../../models/User';
import type { ProfileState } from '../model';
import { convertDateToString } from '../helpers';
import { IRecipeInfoShort } from '../../models/modelRecipeById';
import { toggleObjectInArray } from '../../helpers/toggleObjectInArray';
import { IDailyMeals } from './meals/model';
import { dateToday } from '../../helpers/transformDate';

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
    favorite: { videoTrainings: [], trainings: [], recipes: [] },
    userMeals: [
      { id: 0, title: 'breakfast', date: dateToday, meals: [] },
      { id: 1, title: 'lunch', date: dateToday, meals: [] },
      { id: 2, title: 'dinner', date: dateToday, meals: [] }
    ]
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
      const { favorite, statistics, userMeals } = user;
      currentUser.userData = user.userData;
      currentUser.id = user.id;
      currentUser.email = user.email;
      currentUser.name = user.name;
      currentUser.password = user.password;
      currentUser.token = user.token;
      currentUser.avatar = user.avatar;

      if (favorite) currentUser.favorite = favorite;
      if (statistics) currentUser.statistics = statistics;
      if (userMeals) currentUser.userMeals = userMeals;
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
    },
    setMeals: ({ currentUser }, { payload }) => {
      const { date, mealTitle, meal } = payload;

      const foundedMealInd = currentUser.userMeals.findIndex(
        (item) => item.date === date && item.title === mealTitle
      );

      if (foundedMealInd !== -1) {
        currentUser.userMeals[foundedMealInd].meals = [
          ...currentUser.userMeals[foundedMealInd].meals,
          meal
        ];
      }

      updateFirestoreState(currentUser);
    },
    removeMeals: ({ currentUser }, { payload }) => {
      const { mealTitle, dishNameForRemoval } = payload;
      const foundedMealInd = currentUser.userMeals.findIndex((item) => item.title === mealTitle);

      if (foundedMealInd !== -1) {
        const newMeals = currentUser.userMeals[foundedMealInd].meals.filter(
          (meal) => meal.name !== dishNameForRemoval
        );
        currentUser.userMeals[foundedMealInd].meals = newMeals;
      }

      updateFirestoreState(currentUser);
    },
    addCardToUserMeals: ({ currentUser }, { payload }: PayloadAction<string>) => {
      const { userMeals } = currentUser;

      const arrIds = userMeals.map((meal: IDailyMeals): number => meal.id);
      const newId = arrIds[userMeals.length - 1] + 1 || 0;

      const newCard = {
        id: newId,
        title: payload,
        date: dateToday,
        meals: []
      };

      currentUser.userMeals = [...currentUser.userMeals, newCard];

      updateFirestoreState(currentUser);
    },
    editCardTitle: (
      { currentUser },
      { payload: { id, newTitle } }: PayloadAction<{ id: number; newTitle: string }>
    ) => {
      const { userMeals } = currentUser;

      currentUser.userMeals = userMeals.map((meal: IDailyMeals): IDailyMeals => {
        if (meal.id === id) {
          return { ...meal, title: newTitle };
        }
        return meal;
      });

      updateFirestoreState(currentUser);
    },
    deleteCard: ({ currentUser }, { payload: { id } }: PayloadAction<{ id: number }>) => {
      const { userMeals } = currentUser;

      currentUser.userMeals = userMeals.filter((meal: IDailyMeals) => meal.id !== id);

      updateFirestoreState(currentUser);
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
  setCalorieСonsumption,
  setMeals,
  removeMeals,
  addCardToUserMeals,
  editCardTitle,
  deleteCard
} = profileSlice.actions;
export { profileSlice };
