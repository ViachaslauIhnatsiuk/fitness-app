import React, { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BsArrowLeft, BsBookmarkDash } from 'react-icons/bs';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button } from '../../UI/button/Button';
import { ExerciseCard } from '../exerciseCard/ExerciseCard';
import { WorkoutPath } from '../../../models/Workout';
import { useTraining } from '../../../hooks/useTraining';
import Loader from '../../UI/loader/Loader';
import { useAppDispatch } from '../../../store/store';
import { setTrainingToFavorites } from '../../../store/slices/profileSlice';
import s from './Exercises.module.css';

const Exercises: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { trainingId } = useParams();
  const { getExercisesById, exercisesById, isLoading } = useTraining();

  const redirectPath = `${pathname}active`;

  useEffect(() => {
    if (trainingId) getExercisesById(trainingId).catch((error: Error) => error);
  }, [getExercisesById, trainingId]);

  const addToFavoriteHandler = () => {
    if (trainingId) dispatch(setTrainingToFavorites(Number(trainingId)));
  };

  return (
    <div className={s.wrapper}>
      <div className={s.main}>
        <Link className={s.return} to={WorkoutPath.trainings}>
          <BsArrowLeft className={s.icon} />
        </Link>
        {/* {favorites.recipes.find((recipe) => recipe.id === recipeInfo.id) ? (
            <BsBookmarkDashFill onClick={addToFavoriteHandler} className={s.bookmark} />
          ) : (
            <BsBookmarkDash onClick={addToFavoriteHandler} className={s.bookmark} />
          )} */}
        <BsBookmarkDash onClick={addToFavoriteHandler} className={s.bookmark} />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={s.exercises}>
              {exercisesById?.map((exercise) => {
                return <ExerciseCard key={uuidv4()} exercise={exercise} />;
              })}
            </div>
            {/* <Link to={redirectPath}>Start</Link> */}
            <Button path={redirectPath} text="Start" isStyled customStyles={s.button} />
          </>
        )}
      </div>
    </div>
  );
};

export { Exercises };
