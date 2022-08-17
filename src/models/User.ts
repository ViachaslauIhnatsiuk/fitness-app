import { IMeal } from './Product';
import { ISettings } from './Settings';

interface IUser {
  id: number;
  fullName: string;
  nickName: string;
  email: string;
  phone: string;
  password: string;
  sex: string;
  age: number;
  weight: number;
  goals: string[];
  trainingLevel: string;
  settings: ISettings | null;
  mealShedule: IMeal[];
}

export type { IUser };
