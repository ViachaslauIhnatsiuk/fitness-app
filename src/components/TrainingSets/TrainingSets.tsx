import React, { FC, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';
import { useTrainings } from '../../hooks/useTrainings';
import { WorkoutStatus } from '../../models/Workout';
import { useAppSelector } from '../../store/model';
import { selectTrainings } from '../../store/selectors';
import { useAppDispatch } from '../../store/store';
import { TrainingCard } from './trainingCard/TrainingCard';
import s from './TrainingSets.module.css';
import { FilterBySearch } from './FilterBySearch/filterBySearch';
import { FilterByLevel } from './FilterByLevel/filterByLevel';
import { fetchTrainings } from '../../store/slices/training/trainingSlice';

const TrainingSets: FC = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectTrainings);

  useEffect(() => {
    (async () => {
      await dispatch(fetchTrainings());
    })().catch((error: Error) => error);
  }, [dispatch]);

  const filteredTrainings = useTrainings();

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <FilterBySearch />
        <button type="button" className={s.search}>
          <IoSearch />
        </button>
      </div>
      <FilterByLevel />
      <div className={s.trainings}>
        {status === WorkoutStatus.loading && <h1>LOADING...</h1>}
        {filteredTrainings.map((training) => {
          return <TrainingCard key={uuidv4()} training={training} />;
        })}
      </div>
    </div>
  );
};

export { TrainingSets };
