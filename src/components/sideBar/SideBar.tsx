import React, { FC } from 'react';
import { Navbar } from '../navbar/Navbar';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import s from './SideBar.module.css';

const SideBar: FC = () => {
  return (
    <div className={s.wrapper}>
      <Logo className={s.logo} />
      <Navbar />
    </div>
  );
};

export { SideBar };
