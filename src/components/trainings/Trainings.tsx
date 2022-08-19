import React, { FC, useEffect, useState } from 'react';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../UI/button/Button';
import { ITraining, Path } from './models';
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
      <Button path={Path.videoTrainings} icon={<IoChevronBackCircleOutline />} />
      <div className={s.trainings}>
        {trainings.map((training) => {
          return <TrainingCard key={uuidv4()} training={training} />;
        })}
      </div>
    </div>
  );
};

export { Trainings };
