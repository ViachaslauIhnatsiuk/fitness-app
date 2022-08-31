import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_KEY_MEAL, BASE_URL_MEAL } from '../../constants';
import { MealsResponse } from './model';

interface MealsState {
  currentMeals: MealsResponse;
  isLoading: boolean;
  error: string;
  mealCardType: string;
}

const initialState: MealsState = {
  currentMeals: {
    items: []
  },
  isLoading: false,
  error: '',
  mealCardType: ''
};

interface ConfigRequest {
  query: string;
  mealCardType: string;
}

export const fetchMeals = createAsyncThunk(
  'meals/fetchMeals',
  async (config: ConfigRequest, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL_MEAL}${config.query}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': API_KEY_MEAL
        }
      }).catch((error: Error) => error);
      const data = (await (response as Response).json()) as MealsResponse;
      return { data, mealCardType: config.mealCardType };
    } catch (error) {
      return rejectWithValue('Error fetching recipes');
    }
  }
);

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMeals.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMeals.fulfilled, (state, { payload }) => {
      state.currentMeals = payload.data;
      state.isLoading = false;
      state.error = '';
      state.mealCardType = payload.mealCardType;
    });
    builder.addCase(fetchMeals.rejected, (state, { payload }: PayloadAction<unknown | string>) => {
      state.isLoading = false;
      state.error = payload as string;
    });
  }
});

export { mealsSlice };
