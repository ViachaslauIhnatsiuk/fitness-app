import { ISelectOptions } from './models';

const genderOptions = [
  { type: 'gender', value: 'male', label: 'Male' },
  { type: 'gender', value: 'female', label: 'Female' }
];

const ageOptions = [...Array(101)]
  .map((_, index) => ({ type: 'age', label: index, value: index }))
  .slice(10);

const heightOptions = [...Array(231)]
  .map((_, index) => ({ type: 'height', label: index, value: index }))
  .slice(120);

const weightOptions = [...Array(251)]
  .map((_, index) => ({ type: 'weight', label: index, value: index }))
  .slice(30);

const activityOptions = [
  { type: 'activity', value: 'beginner', label: 'Beginner' },
  { type: 'activity', value: 'intermediate', label: 'Intermediate' },
  { type: 'activity', value: 'advanced', label: 'Advanced' }
];

const goalOptions = [
  { type: 'goal', value: 'get fitter', label: 'Get fitter' },
  { type: 'goal', value: 'gain weight', label: 'Gain weight' },
  { type: 'goal', value: 'lose weight', label: 'Lose weight' },
  { type: 'goal', value: 'building muscles', label: 'Building muscles' }
];

const selectOptions: ISelectOptions = {
  gender: genderOptions,
  age: ageOptions,
  height: heightOptions,
  weight: weightOptions,
  activity: activityOptions,
  goal: goalOptions
};

const initialUserData = {
  gender: 'male',
  age: 30,
  height: 170,
  weight: 60,
  activity: 'intermediate',
  goal: 'get fitter'
};

const registrationSelects = ['gender', 'age', 'height', 'weight', 'activity', 'goal'];

export { selectOptions, initialUserData, registrationSelects };
