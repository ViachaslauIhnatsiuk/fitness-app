import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BsArrowLeft, BsBookmarkDash, BsBookmarkDashFill } from 'react-icons/bs';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button } from '../../UI/button/Button';
import { ExerciseCard } from '../exerciseCard/ExerciseCard';
import { WorkoutPath } from '../../../models/Workout';
import { useTraining } from '../../../hooks/useTraining';
import Loader from '../../UI/loader/Loader';
import { useAppDispatch } from '../../../store/store';
import { setTrainingToFavorites } from '../../../store/slices/profileSlice';
import { useAppSelector } from '../../../store/model';
import { selectProfile } from '../../../store/selectors';
import s from './Exercises.module.css';

const Exercises: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { trainingId } = useParams();
  const { getExercisesById, exercisesById, isLoading } = useTraining();
  const {
    currentUser: {
      favorite: { trainings }
    }
  } = useAppSelector(selectProfile);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

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
