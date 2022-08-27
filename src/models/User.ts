interface IUser {
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
}

export type { IUser };
