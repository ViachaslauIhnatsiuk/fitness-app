import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import s from './Header.module.css';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { PathCurrentPage } from '../../global/types';

const Header: FC = () => {
  const { pathname } = useLocation();

  if (pathname === PathCurrentPage.PROFILE) return null;

  return (
    <div className={s.wrapper}>
      <Logo className={s.logo} />
    </div>
  );
};

export { Header };
