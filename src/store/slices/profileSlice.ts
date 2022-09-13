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
import { IWorkout } from '../../models/Workout';

const initialState: ProfileState = {
  isAuth: false,
  currentUser: {
    avatar: '',
    name: '',
    email: '',
    password: '',
    id: '',
    token: '',
    settings: {
      theme: 'dark',
      isSoundOn: true
    },
    userData: {
      gender: 'male',
      age: 30,
      height: 170,
      weight: 60,
      activity: 'intermediate',
      goal: 'get fitter'
    },
    statistics: {
      calorieExpenditure: {},
      calorieСonsumption: {},
      trainings: { dailyTimeTrainings: {}, totalTime: 0, totalTrainings: 0 }
    },
    favorite: { videoTrainings: [], trainings: [], recipes: [] },
    customTrainings: [],
    userMeals: []
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
      const { favorite, statistics, userMeals, settings, userData, customTrainings } = user;
      currentUser.id = user.id;
      currentUser.email = user.email;
      currentUser.name = user.name;
      if (user.password) currentUser.password = user.password;
      currentUser.token = user.token;
      currentUser.avatar = user.avatar;
      if (userData) currentUser.userData = userData;
      if (settings) currentUser.settings = settings;
      if (favorite) currentUser.favorite = favorite;
      if (statistics) currentUser.statistics = statistics;
      if (userMeals) currentUser.userMeals = userMeals;
      if (customTrainings) currentUser.customTrainings = customTrainings;
      updateFirestoreState(currentUser);
    },
    setNewUser: (state, { payload }: PayloadAction<IUserData>) => {
      state.currentUser.userData = payload;
    },
    setNewPassword: (state, { payload }: PayloadAction<string>) => {
      state.currentUser.password = payload;
    },

    setUpdatedUserData: (state, { payload: updatedUserData }: PayloadAction<IUserData>) => {
      state.currentUser.userData = updatedUserData;
    },
    setVideoTrainingToFavorites: (state, { payload: videoId }: PayloadAction<number>) => {
      const { favorite } = state.currentUser;
      favorite.videoTrainings = toggleValueInArray(favorite.videoTrainings, videoId);
      updateFirestoreState(state.currentUser);
    },
    setTrainingToFavorites: (state, { payload: trainingId }: PayloadAction<number>) => {
      const { favorite } = state.currentUser;
      favorite.trainings = toggleValueInArray(favorite.trainings, trainingId);
      updateFirestoreState(state.currentUser);
    },
    toggleRecipeInFavorites: (state, { payload }: PayloadAction<IRecipeInfoShort>) => {
      const { favorite } = state.currentUser;
      favorite.recipes = toggleObjectInArray(favorite.recipes, payload);
      updateFirestoreState(state.currentUser);
    },
    setCalorieExpenditure: (state, { payload: calorie }: PayloadAction<number>) => {
      const { calorieExpenditure } = state.currentUser.statistics;
      const date = convertDateToString(new Date());

      if (!calorieExpenditure[date]) {
        calorieExpenditure[date] = calorie;
      } else {
        const cal = calorieExpenditure[date];
        calorieExpenditure[date] = calorie + cal;
      }

      updateFirestoreState(state.currentUser);
    },
    setTotalTimeTrainings: (state, { payload: time }: PayloadAction<number>) => {
      const { trainings } = state.currentUser.statistics;
      trainings.totalTime += time;
      updateFirestoreState(state.currentUser);
    },
    setTotalTrainings: (state, { payload: count }: PayloadAction<number>) => {
      const { trainings } = state.currentUser.statistics;
      trainings.totalTrainings += count;
      updateFirestoreState(state.currentUser);
    },
    setDailyTimeTrainings: (state, { payload: time }: PayloadAction<number>) => {
      const { dailyTimeTrainings } = state.currentUser.statistics.trainings;

      const date = convertDateToString(new Date());

      if (!dailyTimeTrainings[date]) {
        dailyTimeTrainings[date] = time;
      } else {
        const currentTime = dailyTimeTrainings[date];
        dailyTimeTrainings[date] = currentTime + time;
      }

      updateFirestoreState(state.currentUser);
    },
    setCalorieСonsumption: (state, { payload: calorie }: PayloadAction<number>) => {
      const {
        statistics: { calorieСonsumption }
      } = state.currentUser;
      const date = convertDateToString(new Date());
      calorieСonsumption[date] = calorie;
      updateFirestoreState(state.currentUser);
    },
    setSoundOn: (state, { payload }: PayloadAction<boolean>) => {
      const { settings } = state.currentUser;
      settings.isSoundOn = payload;
      updateFirestoreState(state.currentUser);
    },
    toggleTheme: (state, { payload }: PayloadAction<string>) => {
      const { settings } = state.currentUser;
      settings.theme = payload;
      updateFirestoreState(state.currentUser);
    },
    addCustomTraining: (state, { payload: training }: PayloadAction<IWorkout>) => {
      const { customTrainings } = state.currentUser;
      customTrainings.push(training);
      updateFirestoreState(state.currentUser);
    },
    setMeals: ({ currentUser }, { payload }) => {
      const { date, mealCardId, meal } = payload;

      const foundedMealInd = currentUser.userMeals.findIndex(
        (item) => item.date === date && item.id === mealCardId
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
      const { mealCardId, mealDishId } = payload;

      currentUser.userMeals = currentUser.userMeals.map((dailyMeal) => {
        if (dailyMeal.id === mealCardId) {
          dailyMeal.meals = dailyMeal.meals.filter((_, index) => index !== mealDishId);
        }
        return dailyMeal;
      });

      updateFirestoreState(currentUser);
    },
    addCardToUserMeals: ({ currentUser }, { payload }: PayloadAction<string>) => {
      const newId = Date.now();
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
    },
    deleteCustomTraining: ({ currentUser }, { payload: trainingId }: PayloadAction<number>) => {
      currentUser.customTrainings = currentUser.customTrainings.filter(
        ({ id }) => id !== trainingId
      );
      updateFirestoreState(currentUser);
    },
    updateMealCards: ({ currentUser }, { payload }: PayloadAction<IDailyMeals[]>) => {
      currentUser.userMeals = currentUser.userMeals.filter(({ date }) => date !== payload[0].date);
      currentUser.userMeals = [...currentUser.userMeals, ...payload];
      updateFirestoreState(currentUser);
    }
  }
});

export const {
  setLogIn,
  setLogOut,
  setNewUser,
  setNewPassword,
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
  deleteCard,
  setTotalTimeTrainings,
  setTotalTrainings,
  setDailyTimeTrainings,
  addCustomTraining,
  setSoundOn,
  toggleTheme,
  deleteCustomTraining,
  setUpdatedUserData,
  updateMealCards
} = profileSlice.actions;
export { profileSlice };
