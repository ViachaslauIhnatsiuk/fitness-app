import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsBookmarkDash, BsPerson } from 'react-icons/bs';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import s from './Header.module.css';

const Header: FC = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const trainingsPath =
    path === 'workout/videos' ? 'favorite/video-trainings' : 'favorite/trainings';

  return (
    <div className={s.wrapper}>
      <Logo className={s.logo} />
      <div className={s.icons}>
        <Link to={path === 'food/recipes' ? 'favorite/recipes' : trainingsPath} className={s.link}>
          <BsBookmarkDash className={s.bookmark} />
        </Link>
        <Link to="profile" className={s.link}>
          <BsPerson className={s.profile} />
        </Link>
      </div>
    </div>
  );
};

export { Header };
