import React, { FC, useEffect } from 'react';
import { useStorage } from '../../../../hooks/useStorage';
import s from './SelectedExerciseCard.module.css';
import { SelectedExerciseCardProps } from './models';
import { useAppDispatch } from '../../../../store/store';
import { removeExercise } from '../../../../store/slices/customTrainingSlice';

const SelectedExerciseCard: FC<SelectedExerciseCardProps> = ({ exercise }) => {
  const dispatch = useAppDispatch();
  const { exerciseGifUrl, getExerciseGifUrl } = useStorage();

  useEffect(() => {
    getExerciseGifUrl(exercise.title).catch((error: Error) => error);
  }, [getExerciseGifUrl, exercise.title]);

  const removeExerciseHandler = () => dispatch(removeExercise(exercise));

  return (
    <div
      className={s.wrapper}
      onClick={removeExerciseHandler}
      onKeyPress={removeExerciseHandler}
      tabIndex={0}
      role="button"
    >
      <div className={s.image_wrapper}>
        {exerciseGifUrl && <img src={exerciseGifUrl} alt="exercise" className={s.image} />}
      </div>
    </div>
  );
};

export { SelectedExerciseCard };
