import { createSlice } from '@reduxjs/toolkit';
import { ProfileState, RootState } from '../model';

const initialState: ProfileState = {
  isAuth: false,
  user: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLogIn: (state, payload) => {
      state.user = payload.payload;
      state.isAuth = true;
    },
    setLogOut: (state) => {
      state = initialState;
    },
  },
});

export const { setLogIn, setLogOut } = profileSlice.actions;
export const profileSelector = (state: RootState) => state.profile;
export default profileSlice.reducer;
