import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import {
  FirestoreCollection,
  FirestoreDocument,
  ICategories,
  IVideo,
  IVideos,
  WorkoutStatus
} from '../../../models/Workout';
import { getValuesFromObjectByArrayOfId } from '../../helpers';
import { VideoTrainingState } from './models';

const initialState: VideoTrainingState = {
  videos: [],
  favorite: [],
  categories: [],
  status: WorkoutStatus.loading,
  error: ''
};

const fetchTrainingVideos = createAsyncThunk(
  'workout/fetchTrainingVideos',
  async (_, { rejectWithValue }) => {
    try {
      const docRef = doc(db, FirestoreCollection.videoTrainings, FirestoreDocument.videos);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Videos dont exists!');
      }
      const videos = docSnap.data() as IVideos;
      return Object.values(videos);
    } catch (error) {
      return rejectWithValue('Error fetching videos');
    }
  }
);

const fetchFavoriteVideos = createAsyncThunk(
  'workout/fetchFavoriteVideos',
  async (videoIds: number[], { rejectWithValue }) => {
    try {
      const docRef = doc(db, FirestoreCollection.videoTrainings, FirestoreDocument.videos);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Videos dont exists!');
      }
      const videos = docSnap.data() as IVideos;

      const favoriteVideos = getValuesFromObjectByArrayOfId(videoIds, videos) as IVideo[];

      return favoriteVideos;
    } catch (error) {
      return rejectWithValue('Error fetching videos');
    }
  }
);

const fetchVideoCategories = createAsyncThunk(
  'workout/fetchVideoCategories',
  async (_, { rejectWithValue }) => {
    try {
      const docRef = doc(db, FirestoreCollection.videoTrainings, FirestoreDocument.categories);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Categories dont exists!');
      }
      const { categories } = docSnap.data() as ICategories;
      return categories;
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
    builder.addCase(
      fetchTrainingVideos.fulfilled,
      (state, { payload }: PayloadAction<IVideo[]>) => {
        state.status = WorkoutStatus.resolved;
        state.videos = payload;
      }
    );
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
    builder.addCase(
      fetchVideoCategories.fulfilled,
      (state, { payload }: PayloadAction<string[]>) => {
        state.status = WorkoutStatus.resolved;
        state.categories = payload;
      }
    );
    builder.addCase(
      fetchVideoCategories.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => {
        state.status = WorkoutStatus.rejected;
        state.error = payload as string;
      }
    );
    builder.addCase(fetchFavoriteVideos.pending, (state) => {
      state.status = WorkoutStatus.loading;
      state.error = '';
    });
    builder.addCase(
      fetchFavoriteVideos.fulfilled,
      (state, { payload }: PayloadAction<IVideo[]>) => {
        state.status = WorkoutStatus.resolved;
        state.favorite = payload;
      }
    );
    builder.addCase(
      fetchFavoriteVideos.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => {
        state.status = WorkoutStatus.rejected;
        state.error = payload as string;
      }
    );
  }
});

export const { setVideos, setCategories } = videoTrainingSlice.actions;
export { videoTrainingSlice, fetchTrainingVideos, fetchVideoCategories, fetchFavoriteVideos };
