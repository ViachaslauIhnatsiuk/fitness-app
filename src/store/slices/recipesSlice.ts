import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY, APP_ID, BASE_URL } from '../constants';
import type { RecipesState } from '../model';

const initialState: RecipesState = {
  recipes: {
    from: 0,
    to: 0,
    count: 0,
    _links: {
      self: {
        href: '',
        title: ''
      },
      next: {
        href: '',
        title: ''
      }
    },
    hits: [
      {
        recipe: {
          uri: '',
          label: '',
          image: '',
          images: {
            THUMBNAIL: {
              url: '',
              width: 0,
              height: 0
            },
            SMALL: {
              url: '',
              width: 0,
              height: 0
            },
            REGULAR: {
              url: '',
              width: 0,
              height: 0
            },
            LARGE: {
              url: '',
              width: 0,
              height: 0
            }
          },
          source: '',
          url: '',
          shareAs: '',
          yield: 0,
          dietLabels: [],
          healthLabels: [],
          cautions: [],
          ingredientLines: [],
          ingredients: [
            {
              text: '',
              quantity: 0,
              measure: '',
              food: '',
              weight: 0,
              foodId: ''
            }
          ],
          calories: 0,
          glycemicIndex: 0,
          totalCO2Emissions: 0,
          co2EmissionsClass: '',
          totalWeight: 0,
          cuisineType: [],
          mealType: [],
          dishType: [],
          instructions: [],
          tags: [],
          externalId: '',
          totalNutrients: {},
          totalDaily: {},
          digest: [
            {
              label: '',
              tag: '',
              schemaOrgTag: '',
              total: 0,
              hasRDI: true,
              daily: 0,
              unit: '',
              sub: {}
            }
          ]
        },
        _links: {
          self: {
            href: '',
            title: ''
          },
          next: {
            href: '',
            title: ''
          }
        }
      }
    ]
  },
  isLoading: false,
  error: ''
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}?type=public&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`
      ).catch((error: Error) => error);
      return (await (response as Response).json()) as RecipesState;
    } catch (error) {
      return rejectWithValue('Error fetching recipes');
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipes',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${id}?type=public&app_id=${APP_ID}&app_key=${API_KEY}`
      ).catch((error: Error) => error);
      return (await (response as Response).json()) as RecipesState;
    } catch (error) {
      return rejectWithValue('Error fetching recipes');
    }
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRecipes.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.recipes = action.payload;
    },
    [fetchRecipes.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchRecipes.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export { recipesSlice };
