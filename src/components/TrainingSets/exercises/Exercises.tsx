import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BsArrowLeft, BsBookmarkDash, BsBookmarkDashFill } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button } from '../../UI/button/Button';
import { ExerciseCard } from '../exerciseCard/ExerciseCard';
import { WorkoutPath } from '../../../models/Workout';
import { useTraining } from '../../../hooks/useTraining';
import Loader from '../../UI/loader/Loader';
import { useAppDispatch } from '../../../store/store';
import { deleteCustomTraining, setTrainingToFavorites } from '../../../store/slices/profileSlice';
import { useAppSelector } from '../../../store/model';
import { selectProfile } from '../../../store/selectors';
import s from './Exercises.module.css';
import { isCustomTraining } from './helpers';

const Exercises: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { trainingId } = useParams();
  const { getExercisesById, exercisesById, isLoading } = useTraining();
  const {
    currentUser: {
      customTrainings,
      favorite: { trainings }
    }
  } = useAppSelector(selectProfile);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const isVisible = isCustomTraining(customTrainings, trainingId as string);
  const redirectPath = `${pathname}active`;

  useEffect(() => {
    if (trainingId) getExercisesById(trainingId).catch((error: Error) => error);
  }, [getExercisesById, trainingId]);

  const addToFavoriteHandler = () => {
    if (trainingId) dispatch(setTrainingToFavorites(Number(trainingId)));
  };

  useEffect(
    function changeStateIsFavorite() {
      const state = trainings.includes(Number(trainingId));
      setIsFavorite(state);
    },
    [trainingId, trainings]
  );

  const deleteCustomTrainingHandler = () => {
    if (trainingId) {
      if (trainings.includes(Number(trainingId))) {
        dispatch(setTrainingToFavorites(Number(trainingId)));
      }
      dispatch(deleteCustomTraining(Number(trainingId)));
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.main}>
        <Link className={s.return} to={WorkoutPath.trainings}>
          <BsArrowLeft className={s.icon} />
        </Link>
        {isFavorite ? (
          <BsBookmarkDashFill onClick={addToFavoriteHandler} className={s.bookmark} />
        ) : (
          <BsBookmarkDash onClick={addToFavoriteHandler} className={s.bookmark} />
        )}
        {isVisible && (
          <Link to={WorkoutPath.trainings}>
            <RiDeleteBin5Line className={s.delete} onClick={deleteCustomTrainingHandler} />
          </Link>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={s.exercises}>
              {exercisesById?.map((exercise) => {
                return <ExerciseCard key={uuidv4()} exercise={exercise} />;
              })}
            </div>
            <Button path={redirectPath} text="Start" isStyled customStyles={s.button} />
          </>
        )}
      </div>
    </div>
  );
};

export { Exercises };
