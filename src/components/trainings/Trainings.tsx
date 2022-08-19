import React, { FC, useEffect, useState } from 'react';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { Button } from '../UI/button/Button';
import { ITraining, Path } from './models';
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
    </div>
  );
};

export { Trainings };
