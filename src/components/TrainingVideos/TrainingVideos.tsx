import React, { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WorkoutStatus } from '../../models/Workout';
import { useAppSelector } from '../../store/model';
import { selectVideos } from '../../store/selectors';
import { fetchVideoCategories } from '../../store/slices/videoTraining/videoTraining';
import { useAppDispatch } from '../../store/store';
import Loader from '../UI/loader/Loader';
import { Category } from './category/Category';
import s from './TrainingVideos.module.css';

const TrainingVideos: FC = () => {
  const dispatch = useAppDispatch();
  const { categories, status } = useAppSelector(selectVideos);

  useEffect(() => {
    dispatch(fetchVideoCategories()).catch((error: Error) => error);
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      {status === WorkoutStatus.loading && <Loader />}
      {status === WorkoutStatus.resolved && (
        <div className={s.categories}>
          {categories.map((category) => {
            return <Category category={category} key={uuidv4()} />;
          })}
        </div>
      )}
    </div>
  );
};

export { TrainingVideos };
