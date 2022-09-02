import React, { FC, useEffect } from 'react';
import { useStorage } from '../../../hooks/useStorage';
import { ExerciseProps } from './models';
import s from './ExerciseCard.module.css';

const ExerciseCard: FC<ExerciseProps> = ({ exercise: { time, title } }) => {
  const { exerciseGifUrl, getExerciseGifUrl } = useStorage();

  useEffect(() => {
    getExerciseGifUrl(title).catch((error: Error) => error);
  }, [getExerciseGifUrl, title]);

  return (
    <div className={s.wrapper}>
      <div className={s.image_wrapper}>
        <img src={exerciseGifUrl} alt="exercise" className={s.image} />
      </div>
      <div className={s.description}>
        <h2 className={s.title}>{title}</h2>
        <p className={s.info}>{time} seconds</p>
      </div>
    </div>
  );
};

export { ExerciseCard };
