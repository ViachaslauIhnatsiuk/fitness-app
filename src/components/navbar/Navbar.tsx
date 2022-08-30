import React, { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeButton } from '../UI/navButtons/HomeButton';
import { WorkoutButton } from '../UI/navButtons/WorkoutButton';
import { FoodButton } from '../UI/navButtons/FoodButton';
import { ProfileButton } from '../UI/navButtons/ProfileButton';
import { INavLinksState } from './models';
import { defaultState } from './constants';
import s from './Navbar.module.css';

const Navbar: FC = () => {
  const [active, setActive] = useState<INavLinksState>(defaultState);
  const location = useLocation();

  useEffect(() => {
    const [, path] = location.pathname.split('/');

    switch (path) {
      case '':
        setActive({ ...defaultState, home: true });
        break;
      case 'workout':
        setActive({ ...defaultState, workout: true });
        break;
      case 'food':
        setActive({ ...defaultState, food: true });
        break;
      case 'profile':
        setActive({ ...defaultState, profile: true });
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <div className={s.wrapper}>
      <NavLink to="/" className={s.link} id="home">
        <HomeButton isActive={active.home} />
      </NavLink>
      <NavLink to="workout/videos" className={s.link} id="workout">
        <WorkoutButton isActive={active.workout} />
      </NavLink>
      <NavLink to="food/recipes" className={s.link} id="food">
        <FoodButton isActive={active.food} />
      </NavLink>
      <NavLink to="profile" className={s.link} id="profile">
        <ProfileButton isActive={active.profile} />
      </NavLink>
    </div>
  );
};

export { Navbar };
