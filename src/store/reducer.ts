import { combineReducers } from 'redux';
import profileSlice from './slices/profileSlice';

const rootReducer = combineReducers({
  profile: profileSlice,
});

type RootState = ReturnType<typeof rootReducer>;
export { rootReducer, type RootState };
