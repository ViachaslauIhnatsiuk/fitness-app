import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { WorkoutNavbar } from '../../components/navbar/workoutNavbar/WorkoutNavbar';
import s from './Workout.module.css';

const Workout: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.main}>
        <WorkoutNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export { Workout };
