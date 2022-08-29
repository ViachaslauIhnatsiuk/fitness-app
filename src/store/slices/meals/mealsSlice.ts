import { createSlice } from '@reduxjs/toolkit';
import { IMeal } from './model';

const initialState = new Map<string, IMeal>([
  [
    '29.08.2022',
    {
      breakfast: [
        {
          name: '',
          time: '',
          calories: 0,
          proteins: 0,
          fats: 0,
          carbs: 0
        }
      ],
      lunch: [
        {
          name: '',
          time: '',
          calories: 0,
          proteins: 0,
          fats: 0,
          carbs: 0
        }
      ],
      dinner: [
        {
          name: '',
          time: '',
          calories: 0,
          proteins: 0,
          fats: 0,
          carbs: 0
        }
      ]
    }
  ]
]);

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {}
});

export { mealsSlice };
