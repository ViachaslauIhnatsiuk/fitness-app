import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExercise } from '../../models/Workout';

const initialState: { exercises: IExercise[] } = {
  exercises: []
};

const customTrainingSlice = createSlice({
  name: 'customTraining',
  initialState,
  reducers: {
    addExercise: (state, { payload }: PayloadAction<IExercise>) => {
      let isIncludesExercise = false;
      state.exercises.forEach((item) => {
        if (item.title === payload.title) {
          state.exercises = state.exercises.filter(({ title }) => title !== payload.title);
          isIncludesExercise = true;
        }
      });

      if (!isIncludesExercise) {
        state.exercises.push(payload);
        isIncludesExercise = false;
      }
    },
    resetCustomTrainingState: (state) => {
      state.exercises = [];
    },
    removeExercise: (state, { payload: exercise }: PayloadAction<IExercise>) => {
      state.exercises = state.exercises.filter(({ title }) => title !== exercise.title);
    }
  }
});

export const { addExercise, removeExercise, resetCustomTrainingState } =
  customTrainingSlice.actions;
export { customTrainingSlice };
