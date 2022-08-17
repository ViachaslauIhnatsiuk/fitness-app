import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import s from './App.module.css';
import { Home } from '../pages/home/Home';
import { Workout } from '../pages/workout/Workout';
import { Food } from '../pages/food/Food';
import { Profile } from '../pages/profile/Profile';
import { Layout } from './layout/Layout';
import { NotFound } from '../pages/notFound/NotFound';

const App: FC = () => {
  return (
    <div className={s.app}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="workout" element={<Workout />} />
          <Route path="food" element={<Food />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export { App };
