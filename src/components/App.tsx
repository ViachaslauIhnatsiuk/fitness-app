import React, { FC } from 'react';
import s from './App.module.css';
import { Header } from './header/Header';
import { Home } from '../pages/home/Home';
import { Workout } from '../pages/workout/Workout';
import { Food } from '../pages/food/Food';
import { Profile } from '../pages/profile/Profile';
import { Navbar } from './navbar/Navbar';
import { Footer } from './footer/Footer';

const App: FC = () => {
  return (
    <div className={s.app}>
      <Header />
      <div className={s.main}>
        <Home />
        <Workout />
        <Food />
        <Profile />
      </div>
      <Navbar />
      <Footer />
    </div>
  );
};

export { App };
