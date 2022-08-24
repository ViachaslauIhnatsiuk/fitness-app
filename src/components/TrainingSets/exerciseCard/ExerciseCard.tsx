import React, { FC, useEffect } from 'react';
import { useStorage } from '../../../hooks/useStorage';
import s from './ExerciseCard.module.css';
import { ExerciseProps } from './models';

const ExerciseCard: FC<ExerciseProps> = ({ exercise: { time, title } }) => {
  const { exerciseGifUrl, getExerciseGifUrl } = useStorage();

  useEffect(
    function setExercisePreview(): void {
      (async () => {
        await getExerciseGifUrl(title);
      })().catch((error: Error) => error);
    },
    [getExerciseGifUrl, title]
  );

  return (
    <div className={s.wrapper}>
      <img src={exerciseGifUrl} alt="exercise" />
      <div className={s.description}>
        <h2>{title}</h2>
        <p className={s.info}>{time} seconds</p>
      </div>
    </div>
  );
};

export { ExerciseCard };
