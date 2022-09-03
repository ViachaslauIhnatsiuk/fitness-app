import React, { FC, useEffect, useState } from 'react';
import s from './Exercise.module.css';
import { ExerciseCard } from '../../exerciseCard/ExerciseCard';
import { ExerciseProps } from './models';

const Exercise: FC<ExerciseProps> = ({ exercise, selectedExercises }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setIsSelected(selectedExercises.includes(exercise));
  }, [exercise, selectedExercises]);

  const onClickHandler = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      tabIndex={0}
      onClick={onClickHandler}
      onKeyPress={onClickHandler}
      role="button"
      className={isSelected ? [s.card, s.active].join(' ') : s.card}
    >
      <ExerciseCard exercise={exercise} />
    </div>
  );
};

export { Exercise };
