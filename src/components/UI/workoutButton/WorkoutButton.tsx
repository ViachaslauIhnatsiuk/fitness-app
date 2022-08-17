import React, { FC } from 'react';
import { IoIosFitness } from 'react-icons/io';
import s from './WorkoutButton.module.css';

const WorkoutButton: FC = () => {
  return (
    <div className={s.wrapper}>
      <h3 className={s.icon}>
        <IoIosFitness />
      </h3>
      <div className={s.title}>Workout</div>
    </div>
  );
};

export { WorkoutButton };
