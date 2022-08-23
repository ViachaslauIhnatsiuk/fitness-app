import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeButton } from '../UI/navButtons/HomeButton';
import { WorkoutButton } from '../UI/navButtons/WorkoutButton';
import { FoodButton } from '../UI/navButtons/FoodButton';
import { ProfileButton } from '../UI/navButtons/ProfileButton';
import { INavLinksState } from './models';
import { resetState, defaultState } from './constants';
import s from './Navbar.module.css';

const Navbar: FC = () => {
  const [active, setActive] = useState<INavLinksState>(defaultState);

  const setLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    const tab = e.currentTarget.id;
    setActive({ ...resetState, [tab]: true });
  };

  return (
    <div className={s.wrapper}>
      <NavLink to="/" className={s.link} id="home" onClick={(e) => setLink(e)}>
        <HomeButton isActive={active.home} />
      </NavLink>
      <NavLink to="workout/videos" className={s.link} id="workout" onClick={(e) => setLink(e)}>
        <WorkoutButton isActive={active.workout} />
      </NavLink>
      <NavLink to="food" className={s.link} id="food" onClick={(e) => setLink(e)}>
        <FoodButton isActive={active.food} />
      </NavLink>
      <NavLink to="profile" className={s.link} id="profile" onClick={(e) => setLink(e)}>
        <ProfileButton isActive={active.profile} />
      </NavLink>
    </div>
  );
};

export { Navbar };
