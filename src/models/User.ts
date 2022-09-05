import { IFavorite } from './Favorite';
import { IDailyMeals } from '../store/slices/meals/model';
import { IStatistics } from './Statistics';
import { IWorkout } from './Workout';

interface IUser {
  avatar: string;
  name: string;
  email: string;
  password: string;
  id: string;
  token: string;
  settings: {
    theme: string;
    isSoundOn: boolean;
  };
  userData: {
    gender: string;
    age: number;
    height: number;
    weight: number;
    activity: string;
    goal: string;
  };
  statistics: IStatistics;
  favorite: IFavorite;
  customTrainings: IWorkout[];
  userMeals: IDailyMeals[];
}

export type { IUser };
