import React from 'react';
import { Outlet } from 'react-router-dom';
import s from './Main.module.css';

const Main = () => {
  return (
    <div className={s.main}>
      Main wrapper for content of page
      <Outlet />
    </div>
  );
};

export { Main };
