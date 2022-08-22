import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { rootReducer } from './reducer';

const store = configureStore({
  reducer: rootReducer
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type { RootState, AppDispatch };

export default store;
