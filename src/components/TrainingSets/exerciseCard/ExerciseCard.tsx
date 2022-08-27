import React, { FC, useEffect } from 'react';
import { useStorage } from '../../../hooks/useStorage';
import { LoadableImage } from '../../loadableImage/LoadableImage';
import s from './ExerciseCard.module.css';
import { ExerciseProps } from './models';

const ExerciseCard: FC<ExerciseProps> = ({ exercise: { time, title } }) => {
  const { exerciseGifUrl, getExerciseGifUrl } = useStorage();

  useEffect(() => {
    getExerciseGifUrl(title).catch((error: Error) => error);
  }, [getExerciseGifUrl, title]);

  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <LoadableImage src={exerciseGifUrl} alt="exercise" />
      </div>
      <div className={s.description}>
        <h2>{title}</h2>
        <p className={s.info}>{time} seconds</p>
      </div>
    </div>
  );
};

export { ExerciseCard };
