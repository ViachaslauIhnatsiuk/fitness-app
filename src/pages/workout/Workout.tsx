import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { WorkoutNavbar } from '../../components/navbar/workoutNavbar/WorkoutNavbar';
import s from './Workout.module.css';

const Workout: FC = () => {
  return (
    <div className={s.wrapper}>
      <WorkoutNavbar />
      <Outlet />
    </div>
  );
};

export { Workout };
