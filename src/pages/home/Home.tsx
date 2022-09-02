import React, { FC } from 'react';
import { Charts } from '../../components/charts/Charts';
import { Favorite } from '../../components/favorite/Favorite';
import s from './Home.module.css';

const Home: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.main}>
        <Favorite />
        <Charts />
      </div>
    </div>
  );
};

export { Home };
