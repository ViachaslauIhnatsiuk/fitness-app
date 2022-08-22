import { createSlice } from '@reduxjs/toolkit';
import type { ProfileState } from '../model';

const initialState: ProfileState = {
  isAuth: false,
  user: null
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLogIn: (state, payload) => {
      state.user = payload.payload;
      state.isAuth = true;
    },
    setLogOut: (state) => {
      state = initialState;
    }
  }
});

export const { setLogIn, setLogOut } = profileSlice.actions;
export { profileSlice };
