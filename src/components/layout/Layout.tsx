import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';
import { SideBar } from '../sideBar/SideBar';
import { Footer } from '../footer/Footer';
import s from './Layout.module.css';

const Layout: FC = () => {
  return (
    <div className={s.layout}>
      <Header />
      <div className={s.main}>
        <SideBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export { Layout };
