import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../../components/registration/registrationUserData/models';
import type { ProfileState } from '../model';

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
    }
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
    setNewUser: (state, { payload }: PayloadAction<IUserData>) => {
      state.currentUser.userData = payload;
    }
  }
});

export const { setLogIn, setLogOut, setNewUser } = profileSlice.actions;
export { profileSlice };
