import React, { FC } from 'react';
import { Charts } from '../../components/charts/Charts';
import { Favorite } from '../../components/favorite/Favorite';
import s from './Home.module.css';

const Home: FC = () => {
  return (
    <div className={s.wrapper}>
      <Favorite />
      <Charts />
    </div>
  );
};

export { Home };
