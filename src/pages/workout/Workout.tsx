import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NavbarWorkout } from '../../components/navbar/navbarWorkout/NavbarWorkout';
import s from './Workout.module.css';

const Workout: FC = () => {
  return (
    <div className={s.wrapper}>
      <NavbarWorkout />
      <Outlet />
    </div>
  );
};

export { Workout };
