import React, { FC } from 'react';
import s from './WorkoutButton.module.css';
import { ReactComponent as Workout } from '../../../assets/navigation/workout.svg';

const WorkoutButton: FC = () => {
  return (
    <div className={s.wrapper}>
      <Workout className={s.icon} />
      <div className={s.title}>Workout</div>
    </div>
  );
};

export { WorkoutButton };
