import React, { FC, useEffect, useState } from 'react';
import { IoChevronBackCircleOutline, IoSearch } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';
import { Path } from '../../models/Workout';
import { Button } from '../UI/button/Button';
import { ITraining } from './models';
import { TrainingCard } from './trainingCard/TrainingCard';
import s from './Trainings.module.css';

const Trainings: FC = () => {
  const [trainings, setTrainings] = useState<ITraining[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/data/trainings.json');
      const data = (await response.json()) as ITraining[];
      setTrainings(data);
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
        <Button text="Begginer" isStyled customStyles={s.button} />
        <Button text="Intermediate" isStyled customStyles={s.button} />
        <Button text="Advanced" isStyled customStyles={s.button} />
      </div>
      <div className={s.trainings}>
        {trainings.map((training) => {
          return <TrainingCard key={uuidv4()} training={training} />;
        })}
      </div>
    </div>
  );
};

export { Trainings };
