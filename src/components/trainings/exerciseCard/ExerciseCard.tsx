import React, { FC } from 'react';
import s from './ExerciseCard.module.css';
import { ExerciseProps } from './models';

const ExerciseCard: FC<ExerciseProps> = ({ exercise: { description, img, time, title } }) => {
  return (
    <div className={s.exercise}>
      <img className={s.image} src={img} alt="exercise" />
      <ul>
        <li>title: {title}</li>
        <li>description: {description}</li>
        <li>time: {time}</li>
      </ul>
    </div>
  );
};

export { ExerciseCard };
