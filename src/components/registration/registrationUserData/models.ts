interface IOption {
  type: string | number;
  value: string | number;
  label: string | number;
}

interface IUserData {
  [key: string]: string | number;
}

interface ISelectOptions {
  [key: string]: IOption[];
}

export type { IOption, IUserData, ISelectOptions };
