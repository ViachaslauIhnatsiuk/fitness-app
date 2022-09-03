import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsBookmarkDash, BsPerson } from 'react-icons/bs';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { getPath, getCurrentPath } from './helpers';
import s from './Header.module.css';

const Header: FC = () => {
  const location = useLocation();
  const path = getCurrentPath(location.pathname);
  const validPathes =
    path === 'food/recipes' || path === 'workout/trainings' || path === 'workout/videos';

  return (
    <div className={s.wrapper}>
      <Link to="/" className={s.link}>
        <Logo className={s.logo} />
      </Link>
      {validPathes && (
        <div className={s.icons}>
          <Link to={getPath(path)} className={s.link}>
            <BsBookmarkDash className={s.bookmark} />
          </Link>
          <Link to="profile" className={s.link}>
            <BsPerson className={s.profile} />
          </Link>
        </div>
      )}
    </div>
  );
};

export { Header };
