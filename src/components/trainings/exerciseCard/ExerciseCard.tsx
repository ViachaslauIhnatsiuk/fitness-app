import React, { FC } from 'react';
import s from './ExerciseCard.module.css';
import { ExerciseProps } from './models';

const ExerciseCard: FC<ExerciseProps> = ({ exercise: { img, time, title } }) => {
  return (
    <div className={s.wrapper}>
      <img className={s.image} src={img} alt="exercise" />
      <div className={s.description}>
        <h2>{title}</h2>
        <p className={s.info}>{time} seconds</p>
      </div>
    </div>
  );
};

export { ExerciseCard };
