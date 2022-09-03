import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebase';
import { IUser } from '../../../models/User';
import {
  FirestoreCollection,
  FirestoreDocument,
  IWorkout,
  IWorkouts,
  WorkoutFilterByLevel,
  WorkoutStatus
} from '../../../models/Workout';
import { getValuesFromArrayByArrayOfId, getValuesFromObjectByArrayOfId } from '../../helpers';
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

      const docRefUser = doc(db, 'users', auth.currentUser?.uid as string);
      const docSnapUser = await getDoc(docRefUser);

      if (!docSnap.exists()) {
        throw new Error('Trainings dont exists!');
      }

      if (!docSnapUser.exists()) {
        throw new Error('Trainings dont exists!');
      }

      const trainings = docSnap.data() as IWorkouts;
      const { customTrainings } = docSnapUser.data() as IUser;

      const arrayOfTrainings = Object.values(trainings);

      if (customTrainings.length) {
        arrayOfTrainings.push(...customTrainings);
      }

      return arrayOfTrainings;
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

      const docRefUser = doc(db, 'users', auth.currentUser?.uid as string);
      const docSnapUser = await getDoc(docRefUser);

      if (!docSnapUser.exists()) {
        throw new Error('Trainings dont exists!');
      }
      if (!docSnap.exists()) {
        throw new Error('Trainings dont exists!');
      }

      const trainings = docSnap.data() as IWorkouts;
      const { customTrainings } = docSnapUser.data() as IUser;

      const favoriteTrainings = getValuesFromObjectByArrayOfId(
        trainingIds,
        trainings
      ) as IWorkout[];
      const favoriteCustomTrainings = getValuesFromArrayByArrayOfId(trainingIds, customTrainings);

      return [...favoriteTrainings, ...favoriteCustomTrainings];
    } catch (error) {
      return rejectWithValue('Error fetching trainings');
    }
  }
);

const fetchCustomTrainings = createAsyncThunk(
  'workout/fetchCustomTrainings',
  async (_, { rejectWithValue }) => {
    try {
      const docRefUser = doc(db, 'users', auth.currentUser?.uid as string);
      const docSnapUser = await getDoc(docRefUser);

      if (!docSnapUser.exists()) {
        throw new Error('Trainings dont exists!');
      }

      const { customTrainings } = docSnapUser.data() as IUser;
      return customTrainings;
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
    builder.addCase(fetchCustomTrainings.pending, (state) => {
      state.status = WorkoutStatus.loading;
      state.error = '';
    });
    builder.addCase(
      fetchCustomTrainings.fulfilled,
      (state, { payload }: PayloadAction<IWorkout[]>) => {
        state.status = WorkoutStatus.resolved;
        state.favorite = payload;
      }
    );
    builder.addCase(
      fetchCustomTrainings.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => {
        state.status = WorkoutStatus.rejected;
        state.error = payload as string;
      }
    );
  }
});

export const { setTrainings, setFilterByLevel, setFilterBySearch } = trainingSlice.actions;
export { trainingSlice, fetchTrainings, fetchFavoriteTrainings, fetchCustomTrainings };
