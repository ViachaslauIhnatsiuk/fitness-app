import React from 'react';
import { FiVideo } from 'react-icons/fi';
import { MdOutlineSportsBar } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { CustomLink } from '../../UI/customLink/CustomLink';
import s from './NavbarWorkout.module.css';

const NavbarWorkout = () => {
  const { pathname } = useLocation();

  if (pathname !== '/workout/videos') return null;

  return (
    <div className={s.navbar}>
      <CustomLink path="videos" title="Video trainings" icon={<FiVideo />} />
      <CustomLink path="trainings" title="Trainings" icon={<MdOutlineSportsBar />} />
    </div>
  );
};

export { NavbarWorkout };
