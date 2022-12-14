import React, { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useFilteredTrainings } from '../../hooks/useFilteredTrainings';
import { WorkoutStatus } from '../../models/Workout';
import { useAppSelector } from '../../store/model';
import { selectTrainings } from '../../store/selectors';
import { useAppDispatch } from '../../store/store';
import { TrainingCard } from './trainingCard/TrainingCard';
import { FilterBySearch } from './FilterBySearch/filterBySearch';
import { FilterByLevel } from './FilterByLevel/filterByLevel';
import { fetchTrainings } from '../../store/slices/training/trainingSlice';
import Loader from '../UI/loader/Loader';
import s from './TrainingSets.module.css';

const TrainingSets: FC = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectTrainings);

  useEffect(() => {
    dispatch(fetchTrainings()).catch((error: Error) => error);
  }, [dispatch]);

  const filteredTrainings = useFilteredTrainings();

  return (
    <div className={s.wrapper}>
      <div className={s.main}>
        <div className={s.navigation}>
          <FilterByLevel />
          <FilterBySearch />
          <Link to="create" className={s.button}>
            Create new
          </Link>
        </div>
        {status === WorkoutStatus.loading && <Loader />}
        <div className={s.trainings}>
          {status === WorkoutStatus.resolved &&
            filteredTrainings.map((training) => {
              return <TrainingCard key={uuidv4()} training={training} />;
            })}
        </div>
      </div>
    </div>
  );
};

export { TrainingSets };
