import { useDispatch } from 'react-redux';
import { IUser } from '../models/User';
import { store } from './store';

interface ProfileState {
  isAuth: boolean;
  user: IUser | null;
}

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;

export type { ProfileState, RootState, AppDispatch, useAppDispatch };
