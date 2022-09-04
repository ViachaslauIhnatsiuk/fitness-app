import React, { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Exercise } from '../exercise/Exercise';
import { ExercisesProps } from './models';
import { useFilteredTrainings } from '../../../../hooks/useFilteredTrainings';
import { getExercisesFromTrainings } from '../helpers';
import { useAppDispatch } from '../../../../store/store';
import { fetchTrainings } from '../../../../store/slices/training/trainingSlice';
import { IExercise } from '../../../../models/Workout';
import s from './Exercises.module.css';

const Exercises: FC<ExercisesProps> = ({ selectedExercises, onClickHandler }) => {
  const dispatch = useAppDispatch();
  const filteredTrainings = useFilteredTrainings();
  const generalExercises: IExercise[] = getExercisesFromTrainings(filteredTrainings);

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
            onClick={() => onClickHandler(exercise)}
            onKeyPress={() => onClickHandler(exercise)}
            role="button"
          >
            <Exercise exercise={exercise} selectedExercises={selectedExercises} />
          </div>
        );
      })}
    </div>
  );
};

export { Exercises };
