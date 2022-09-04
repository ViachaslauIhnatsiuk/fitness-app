import React, { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useFilteredTrainings } from '../../../../hooks/useFilteredTrainings';
import { getExercisesFromTrainings } from '../helpers';
import { useAppDispatch } from '../../../../store/store';
import { fetchTrainings } from '../../../../store/slices/training/trainingSlice';
import { IExercise } from '../../../../models/Workout';
import s from './Exercises.module.css';
import { addExercise } from '../../../../store/slices/customTrainingSlice';
import { ExerciseCard } from '../../exerciseCard/ExerciseCard';

const Exercises: FC = () => {
  const dispatch = useAppDispatch();
  const filteredTrainings = useFilteredTrainings();
  const generalExercises: IExercise[] = getExercisesFromTrainings(filteredTrainings);

  const addExerciseToCollection = (exercise: IExercise) => dispatch(addExercise(exercise));

  useEffect(() => {
    dispatch(fetchTrainings()).catch((err: Error) => err);
  }, [dispatch]);

  return (
    <div className={s.exercises}>
      {generalExercises.map((exercise) => {
        return (
          <div
            key={uuidv4()}
            tabIndex={0}
            onClick={() => addExerciseToCollection(exercise)}
            onKeyPress={() => addExerciseToCollection(exercise)}
            role="button"
          >
            <ExerciseCard exercise={exercise} />
          </div>
        );
      })}
    </div>
  );
};

export { Exercises };
