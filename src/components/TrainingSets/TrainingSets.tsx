import React, { FC, useEffect } from 'react';
import { IoChevronBackCircleOutline, IoSearch } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';
import { Path, Status } from '../../models/Workout';
import { useAppSelector } from '../../store/model';
import { selectWorkout } from '../../store/selectors';
import { fetchTrainings } from '../../store/slices/workout/workoutSlice';
import { useAppDispatch } from '../../store/store';
import { Button } from '../UI/button/Button';
import { TrainingCard } from './trainingCard/TrainingCard';
import s from './TrainingSets.module.css';

const TrainingSets: FC = () => {
  const dispatch = useAppDispatch();
  const { trainings: workouts, status } = useAppSelector(selectWorkout);

  useEffect(() => {
    (async () => {
      await dispatch(fetchTrainings());
    })().catch((error: Error) => error);
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Button path={Path.videoTrainings} icon={<IoChevronBackCircleOutline />} />
        <button type="button" className={s.search}>
          <IoSearch />
        </button>
      </div>
      <div className={s.filters}>
        <Button text="Beginner" isStyled customStyles={s.button} />
        <Button text="Intermediate" isStyled customStyles={s.button} />
        <Button text="Advanced" isStyled customStyles={s.button} />
      </div>
      <div className={s.trainings}>
        {status === Status.loading && <h1>LOADING...</h1>}
        {workouts.map((training) => {
          return <TrainingCard key={uuidv4()} training={training} />;
        })}
      </div>
    </div>
  );
};

export { TrainingSets };
