import React, { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { useLocation, useParams } from 'react-router-dom';
import s from './Exercises.module.css';
import { Button } from '../../UI/button/Button';
import { ExerciseCard } from '../exerciseCard/ExerciseCard';
import { WorkoutPath } from '../../../models/Workout';
import { useTraining } from '../../../hooks/useTraining';
import Loader from '../../UI/loader/Loader';
import { useAppDispatch } from '../../../store/store';
import { setTrainingToFavorites } from '../../../store/slices/profileSlice';

const Exercises: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { trainingId } = useParams();
  const { getExercisesById, exercisesById, isLoading } = useTraining();

  const redirectPath = `${pathname}active`;

  useEffect(() => {
    if (trainingId) getExercisesById(trainingId).catch((error: Error) => error);
  }, [getExercisesById, trainingId]);

  const addToFavoriteHandler = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    if (trainingId) dispatch(setTrainingToFavorites(Number(trainingId)));
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Button path={WorkoutPath.trainings} icon={<IoChevronBackCircleOutline />} />
        <h2>Workout Activity</h2>
        <button onClick={addToFavoriteHandler} type="button">
          Add To Favorite
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={s.exercises}>
            {exercisesById?.map((exercise) => {
              return <ExerciseCard key={uuidv4()} exercise={exercise} />;
            })}
          </div>
          <Button path={redirectPath} text="START" isStyled customStyles={s.button} />
        </>
      )}
    </div>
  );
};

export { Exercises };
