import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { IWorkout, IWorkouts } from '../../../models/Workout';
import { WorkoutState } from './models';

const initialState: WorkoutState = {
  videos: [],
  trainings: [],
  status: 'loading',
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

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setTrainings: (state, { payload }: PayloadAction<IWorkout[]>) => {
      state.trainings = payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchTrainings.pending, (state) => {
      state.status = 'loading';
      state.error = '';
    });
    builder.addCase(fetchTrainings.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(
      fetchTrainings.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => {
        state.status = 'rejected';
        state.error = payload as string;
      }
    );
  }
});

export const { setTrainings } = workoutSlice.actions;
export { workoutSlice, fetchTrainings };
