import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { IVideo, IVideoTrainings, IWorkout, IWorkouts, Status } from '../../../models/Workout';
import { WorkoutState } from './models';

const initialState: WorkoutState = {
  videos: [],
  trainings: [],
  categories: [],
  status: Status.loading,
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

const fetchTrainingVideos = createAsyncThunk(
  'workout/fetchTrainingVideos',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'videos'));

      return querySnapshot.forEach((doc) => {
        const { categories, videos } = doc.data() as IVideoTrainings;
        dispatch(setVideos(videos));
        dispatch(setCategories(categories));
      });
    } catch (error) {
      return rejectWithValue('Error fetching videos');
    }
  }
);

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setTrainings: (state, { payload }: PayloadAction<IWorkout[]>) => {
      state.trainings = payload;
    },
    setVideos: (state, { payload }: PayloadAction<IVideo[]>) => {
      state.videos = payload;
    },
    setCategories: (state, { payload }: PayloadAction<string[]>) => {
      state.categories = payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchTrainings.pending, (state) => {
      state.status = Status.loading;
      state.error = '';
    });
    builder.addCase(fetchTrainings.fulfilled, (state) => {
      state.status = Status.resolved;
    });
    builder.addCase(
      fetchTrainings.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => {
        state.status = Status.rejected;
        state.error = payload as string;
      }
    );
    builder.addCase(fetchTrainingVideos.pending, (state) => {
      state.status = Status.loading;
      state.error = '';
    });
    builder.addCase(fetchTrainingVideos.fulfilled, (state) => {
      state.status = Status.resolved;
    });
    builder.addCase(
      fetchTrainingVideos.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => {
        state.status = Status.rejected;
        state.error = payload as string;
      }
    );
  }
});

export const { setTrainings, setVideos, setCategories } = workoutSlice.actions;
export { workoutSlice, fetchTrainings, fetchTrainingVideos };
