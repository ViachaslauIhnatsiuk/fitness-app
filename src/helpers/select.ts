import { IUserData, IOption } from '../pages/registrationDataPage/models';

const handleValue = (state: IUserData, value: string | number, options: IOption[]) => {
  return state[value] ? options.find((item) => item.value === state[value]) : '';
};

export { handleValue };
