import React, { FC } from 'react';
import { Footer } from '../footer/Footer';
import { SideBar } from '../sideBar/SideBar';
import { Main } from '../main/Main';
import s from './Layout.module.css';

const Layout: FC = () => {
  return (
    <div className={s.layout}>
      <div className={s.main}>
        <SideBar />
        <Main />
      </div>
      <Footer />
    </div>
  );
};

export { Layout };
