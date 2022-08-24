import React, { FC } from 'react';
import s from './ExerciseCard.module.css';
import { ExerciseProps } from './models';

const ExerciseCard: FC<ExerciseProps> = ({ exercise: { time, title } }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.description}>
        <h2>{title}</h2>
        <p className={s.info}>{time} seconds</p>
      </div>
    </div>
  );
};

export { ExerciseCard };
