import React, { FC } from 'react';
import { HomeButton } from '../UI/homeButton/HomeButton';
import { WorkoutButton } from '../UI/workoutButton/WorkoutButton';
import { FoodButton } from '../UI/foodButton/FoodButton';
import { ProfileButton } from '../UI/profileButton/ProfileButton';
import s from './Navbar.module.css';

const Navbar: FC = () => {
  return (
    <div className={s.wrapper}>
      <HomeButton />
      <WorkoutButton />
      <FoodButton />
      <ProfileButton />
    </div>
  );
};

export { Navbar };
