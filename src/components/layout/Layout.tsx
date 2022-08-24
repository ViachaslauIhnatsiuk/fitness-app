import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { SideBar } from '../sideBar/SideBar';
import s from './Layout.module.css';

const Layout: FC = () => {
  return (
    <div className={s.layout}>
      <div className={s.main}>
        <SideBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export { Layout };
