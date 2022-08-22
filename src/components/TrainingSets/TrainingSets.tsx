import React, { FC, useEffect, useState } from 'react';
import { IoChevronBackCircleOutline, IoSearch } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';
import { Path } from '../../models/Workout';
import { Button } from '../UI/button/Button';
import { IWorkout } from './models';
import { TrainingCard } from './trainingCard/TrainingCard';
import s from './TrainingSets.module.css';

const TrainingSets: FC = () => {
  const [workout, setWorkout] = useState<IWorkout[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/data/trainings.json');
      const data = (await response.json()) as IWorkout[];
      setWorkout(data);
    })().catch(() => {});
  }, []);

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
        {workout.map((training) => {
          return <TrainingCard key={uuidv4()} training={training} />;
        })}
      </div>
    </div>
  );
};

export { TrainingSets };
