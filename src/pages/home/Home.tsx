import React, { FC } from 'react';
import { Favorite } from '../../components/favorite/Favorite';
import s from './Home.module.css';

const Home: FC = () => {
  return (
    <div className={s.wrapper}>
      <Favorite />
    </div>
  );
};

export { Home };
