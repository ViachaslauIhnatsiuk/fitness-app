import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import s from './SelectedExercises.module.css';
import { useAppSelector } from '../../../../store/model';
import { selectCustomTraining } from '../../../../store/selectors';
import { SelectedExerciseCard } from '../selectedExerciseCard/SelectedExerciseCard';

const SelectedExercises: FC = () => {
  const { exercises } = useAppSelector(selectCustomTraining);

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Added</h2>
      {exercises.map((exercise) => (
        <SelectedExerciseCard key={uuidv4()} exercise={exercise} />
      ))}
    </div>
  );
};

export { SelectedExercises };
