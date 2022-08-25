import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { IVideo, IVideoTrainings, WorkoutStatus } from '../../../models/Workout';
import { VideoTrainingState } from './models';

const initialState: VideoTrainingState = {
  videos: [],
  categories: [],
  status: WorkoutStatus.loading,
  error: ''
};

const fetchTrainingVideos = createAsyncThunk(
  'workout/fetchTrainingVideos',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'videos'));

      return querySnapshot.forEach((doc) => {
        const { videos } = doc.data() as IVideoTrainings;
        dispatch(setVideos(videos));
      });
    } catch (error) {
      return rejectWithValue('Error fetching videos');
    }
  }
);

const fetchVideoCategories = createAsyncThunk(
  'workout/fetchVideoCategories',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'videos'));

      return querySnapshot.forEach((doc) => {
        const { categories } = doc.data() as IVideoTrainings;
        dispatch(setCategories(categories));
      });
    } catch (error) {
      return rejectWithValue('Error fetching categories');
    }
  }
);

const videoTrainingSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setVideos: (state, { payload }: PayloadAction<IVideo[]>) => {
      state.videos = payload;
    },
    setCategories: (state, { payload }: PayloadAction<string[]>) => {
      state.categories = payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchTrainingVideos.pending, (state) => {
      state.status = WorkoutStatus.loading;
      state.error = '';
    });
    builder.addCase(fetchTrainingVideos.fulfilled, (state) => {
      state.status = WorkoutStatus.resolved;
    });
    builder.addCase(
      fetchTrainingVideos.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => {
        state.status = WorkoutStatus.rejected;
        state.error = payload as string;
      }
    );
    builder.addCase(fetchVideoCategories.pending, (state) => {
      state.status = WorkoutStatus.loading;
      state.error = '';
    });
    builder.addCase(fetchVideoCategories.fulfilled, (state) => {
      state.status = WorkoutStatus.resolved;
    });
    builder.addCase(
      fetchVideoCategories.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => {
        state.status = WorkoutStatus.rejected;
        state.error = payload as string;
      }
    );
  }
});

export const { setVideos, setCategories } = videoTrainingSlice.actions;
export { videoTrainingSlice, fetchTrainingVideos, fetchVideoCategories };
