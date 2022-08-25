import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { IWorkout, IWorkouts, WorkoutFilterByLevel, WorkoutStatus } from '../../../models/Workout';
import { TrainingState } from './models';

const initialState: TrainingState = {
  trainings: [],
  filterByLevel: WorkoutFilterByLevel.all,
  status: WorkoutStatus.loading,
  filterBySearch: '',
  error: ''
};

const fetchTrainings = createAsyncThunk(
  'workout/fetchTrainings',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'trainings'));

      return querySnapshot.forEach((doc) => {
        const { trainings } = doc.data() as IWorkouts;
        dispatch(setTrainings(trainings));
      });
    } catch (error) {
      return rejectWithValue('Error fetching trainings');
    }
  }
);

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    setTrainings: (state, { payload }: PayloadAction<IWorkout[]>) => {
      state.trainings = payload;
    },
    setFilterBySearch: (state, { payload }: PayloadAction<string>) => {
      state.filterBySearch = payload;
    },
    setFilterByLevel: (state, { payload }: PayloadAction<WorkoutFilterByLevel>) => {
      state.filterByLevel = payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchTrainings.pending, (state) => {
      state.status = WorkoutStatus.loading;
      state.error = '';
    });
    builder.addCase(fetchTrainings.fulfilled, (state) => {
      state.status = WorkoutStatus.resolved;
    });
    builder.addCase(
      fetchTrainings.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => {
        state.status = WorkoutStatus.rejected;
        state.error = payload as string;
      }
    );
  }
});

export const { setTrainings, setFilterByLevel, setFilterBySearch } = trainingSlice.actions;
export { trainingSlice, fetchTrainings };
