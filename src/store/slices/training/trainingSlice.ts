import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import {
  FirestoreCollection,
  FirestoreDocument,
  IWorkout,
  IWorkouts,
  WorkoutFilterByLevel,
  WorkoutStatus
} from '../../../models/Workout';
import { getValuesFromObjectByArrayOfId } from '../../helpers';
import { TrainingState } from './models';

const initialState: TrainingState = {
  trainings: [],
  favorite: [],
  filterByLevel: WorkoutFilterByLevel.all,
  status: WorkoutStatus.loading,
  filterBySearch: '',
  error: ''
};

const fetchTrainings = createAsyncThunk(
  'workout/fetchTrainings',
  async (_, { rejectWithValue }) => {
    try {
      const docRef = doc(db, FirestoreCollection.trainings, FirestoreDocument.trainings);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Trainings dont exists!');
      }
      const trainings = docSnap.data() as IWorkouts;
      return Object.values(trainings);
    } catch (error) {
      return rejectWithValue('Error fetching trainings');
    }
  }
);

const fetchFavoriteTrainings = createAsyncThunk(
  'workout/fetchFavoriteTrainings',
  async (trainingIds: number[], { rejectWithValue }) => {
    try {
      const docRef = doc(db, FirestoreCollection.trainings, FirestoreDocument.trainings);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Trainings dont exists!');
      }
      const trainings = docSnap.data() as IWorkouts;

      const favoriteTrainings = getValuesFromObjectByArrayOfId(
        trainingIds,
        trainings
      ) as IWorkout[];

      return favoriteTrainings;
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
    builder.addCase(fetchTrainings.fulfilled, (state, { payload }: PayloadAction<IWorkout[]>) => {
      state.status = WorkoutStatus.resolved;
      state.trainings = payload;
    });
    builder.addCase(
      fetchTrainings.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => {
        state.status = WorkoutStatus.rejected;
        state.error = payload as string;
      }
    );
    builder.addCase(fetchFavoriteTrainings.pending, (state) => {
      state.status = WorkoutStatus.loading;
      state.error = '';
    });
    builder.addCase(
      fetchFavoriteTrainings.fulfilled,
      (state, { payload }: PayloadAction<IWorkout[]>) => {
        state.status = WorkoutStatus.resolved;
        state.favorite = payload;
      }
    );
    builder.addCase(
      fetchFavoriteTrainings.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => {
        state.status = WorkoutStatus.rejected;
        state.error = payload as string;
      }
    );
  }
});

export const { setTrainings, setFilterByLevel, setFilterBySearch } = trainingSlice.actions;
export { trainingSlice, fetchTrainings, fetchFavoriteTrainings };
