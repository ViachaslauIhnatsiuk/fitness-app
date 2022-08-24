import React, { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Status } from '../../models/Workout';
import { useAppSelector } from '../../store/model';
import { selectWorkout } from '../../store/selectors';
import { fetchTrainingVideos } from '../../store/slices/workout/workoutSlice';
import { useAppDispatch } from '../../store/store';
import { Category } from './category/Category';
import s from './TrainingVideos.module.css';

const TrainingVideos: FC = () => {
  const dispatch = useAppDispatch();
  const { categories, status } = useAppSelector(selectWorkout);

  useEffect(() => {
    (async () => {
      await dispatch(fetchTrainingVideos());
    })().catch((error: Error) => error);
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      {status === Status.loading && <h1>LOADING...</h1>}
      <div className={s.categories}>
        {categories.map((category) => {
          return <Category category={category} key={uuidv4()} />;
        })}
      </div>
    </div>
  );
};

export { TrainingVideos };
