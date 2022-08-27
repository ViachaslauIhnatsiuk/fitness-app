interface IOption {
  type: string | number;
  value: string | number;
  label: string | number;
}

interface IUserData {
  gender: string;
  age: number;
  height: number;
  weight: number;
  activity: string;
  goal: string;
  [key: string]: string | number;
}

interface ISelectOptions {
  [key: string]: IOption[];
}

export type { IOption, IUserData, ISelectOptions };
