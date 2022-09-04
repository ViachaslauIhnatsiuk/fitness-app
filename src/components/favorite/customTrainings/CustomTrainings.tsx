import React, { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WorkoutStatus } from '../../../models/Workout';
import { useAppSelector } from '../../../store/model';
import { selectProfile, selectTrainings } from '../../../store/selectors';
import { fetchCustomTrainings } from '../../../store/slices/training/trainingSlice';
import { useAppDispatch } from '../../../store/store';
import { TrainingCard } from '../../TrainingSets/trainingCard/TrainingCard';
import Loader from '../../UI/loader/Loader';
import s from './CustomTrainings.module.css';

const CustomTrainings: FC = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectTrainings);
  const {
    currentUser: { customTrainings }
  } = useAppSelector(selectProfile);

  useEffect(() => {
    dispatch(fetchCustomTrainings()).catch((error: Error) => error);
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Custom Trainings</h2>
      {status === WorkoutStatus.loading && <Loader />}
      {status === WorkoutStatus.resolved && (
        <div className={customTrainings.length ? s.trainings : s.flex_trainings}>
          {customTrainings.length === 0 && <h4>There is nothing here yet</h4>}
          {customTrainings.map((training) => {
            return <TrainingCard key={uuidv4()} training={training} />;
          })}
        </div>
      )}
    </div>
  );
};

export { CustomTrainings };
