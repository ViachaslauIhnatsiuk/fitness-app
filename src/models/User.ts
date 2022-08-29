import { IFavorite } from './Favorite';
import { IStatistics } from './Statistics';

interface IUser {
  avatar: string;
  name: string;
  email: string;
  password: string;
  id: string;
  token: string;
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
}

export type { IUser };
