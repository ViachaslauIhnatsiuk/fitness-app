import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { IUser } from '../models/User';
import { RootState } from './store';

interface ProfileState {
  isAuth: boolean;
  currentUser: IUser;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type { ProfileState };
