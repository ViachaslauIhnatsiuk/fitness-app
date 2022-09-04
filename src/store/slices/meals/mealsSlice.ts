import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_KEY_MEAL, BASE_URL_MEAL } from '../../constants';
import type { MealsResponse, MealsState } from './model';

const initialState: MealsState = {
  currentMeals: {
    items: []
  },
  isLoading: false,
  isUploaded: false,
  error: '',
  mealCardId: null
};

export const fetchMeals = createAsyncThunk(
  'meals/fetchMeals',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL_MEAL}${String(query)}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': API_KEY_MEAL
        }
      }).catch((error: Error) => error);
      const data = (await (response as Response).json()) as MealsResponse;
      return data;
    } catch (error) {
      return rejectWithValue('Error fetching recipes');
    }
  }
);

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setMealCardId: (state, { payload }: PayloadAction<number | null>) => {
      state.mealCardId = payload;
    },
    resetMeals: (state) => {
      state.currentMeals.items = [];
      state.mealCardId = null;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchMeals.pending, (state) => {
      state.isLoading = true;
      state.isUploaded = false;
    });
    builder.addCase(fetchMeals.fulfilled, (state, { payload }: PayloadAction<MealsResponse>) => {
      state.currentMeals = payload;
      state.isLoading = false;
      state.isUploaded = true;
      state.error = '';
    });
    builder.addCase(fetchMeals.rejected, (state, { payload }: PayloadAction<unknown | string>) => {
      state.isLoading = false;
      state.error = payload as string;
    });
  }
});

export const { setMealCardId, resetMeals } = mealsSlice.actions;
export { mealsSlice };
