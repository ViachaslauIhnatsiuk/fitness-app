import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import s from './SideBar.module.css';

const SideBar: FC = () => {
  return (
    <div className={s.wrapper}>
      <Link to="/" className={s.link}>
        <Logo className={s.logo} />
      </Link>
      <Navbar />
    </div>
  );
};

export { SideBar };
