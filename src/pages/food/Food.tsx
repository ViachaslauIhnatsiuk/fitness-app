import React, { FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import s from './Food.module.css';

const Food: FC = () => {
  const location = useLocation();
  const currentLocation = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Food</h2>
      <div className={s.links}>
        <Link to="recipes" className={currentLocation === 'recipes' ? s.link_active : s.link}>
          Recipes
        </Link>
        <Link to="ration" className={currentLocation === 'ration' ? s.link_active : s.link}>
          Daily ration
        </Link>
      </div>
      {currentLocation === 'food' && (
        <p className={s.decription}>
          В этом разделе Вы можете найти подходящий для себя рецепт. Контролировать свой дневной
          рацион питания.
        </p>
      )}
      <Outlet />
    </div>
  );
};

export { Food };
