import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeButton } from '../UI/homeButton/HomeButton';
import { WorkoutButton } from '../UI/workoutButton/WorkoutButton';
import { FoodButton } from '../UI/foodButton/FoodButton';
import { ProfileButton } from '../UI/profileButton/ProfileButton';
import s from './Navbar.module.css';

const Navbar: FC = () => {
  return (
    <div className={s.wrapper}>
      <NavLink to="/">
        <HomeButton />
      </NavLink>
      <NavLink to="workout/videos">
        <WorkoutButton />
      </NavLink>
      <NavLink to="food">
        <FoodButton />
      </NavLink>
      <NavLink to="profile">
        <ProfileButton />
      </NavLink>
    </div>
  );
};

export { Navbar };
