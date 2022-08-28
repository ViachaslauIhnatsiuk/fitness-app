import React, { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WorkoutStatus } from '../../../models/Workout';
import { useAppSelector } from '../../../store/model';
import { selectProfile, selectTrainings } from '../../../store/selectors';
import { fetchFavoriteTrainings } from '../../../store/slices/training/trainingSlice';
import { useAppDispatch } from '../../../store/store';
import { TrainingCard } from '../../TrainingSets/trainingCard/TrainingCard';
import Loader from '../../UI/loader/Loader';
import s from './FavoriteTrainings.module.css';

const FavoriteTrainings: FC = () => {
  const dispatch = useAppDispatch();
  const { status, favorite: favoriteTrainings } = useAppSelector(selectTrainings);
  const {
    currentUser: { favorite }
  } = useAppSelector(selectProfile);

  useEffect(() => {
    const trainingIds = favorite.trainings;
    dispatch(fetchFavoriteTrainings(trainingIds)).catch((error: Error) => error);
  }, [dispatch, favorite.trainings]);

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Favorite Trainings</h2>
      <div className={s.trainings}>
        {status === WorkoutStatus.loading && <Loader />}
        {status === WorkoutStatus.resolved &&
          favoriteTrainings.map((training) => {
            return <TrainingCard key={uuidv4()} training={training} />;
          })}
      </div>
    </div>
  );
};

export { FavoriteTrainings };
