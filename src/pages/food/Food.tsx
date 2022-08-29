import React, { FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { getSecondPartPath } from '../../helpers/getSecondPartPath';
import s from './Food.module.css';
import { Links } from './models';

const Food: FC = () => {
  const location = useLocation();
  const secondPart = getSecondPartPath(location.pathname);

  const recipesClassName = secondPart === Links.Recipes ? s.link_active : s.link;
  const rationClassName = secondPart === Links.Ration ? s.link_active : s.link;

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Food</h2>
      <div className={s.links}>
        <Link to={Links.Recipes} className={recipesClassName}>
          Recipes
        </Link>
        <Link to={Links.Ration} className={rationClassName}>
          Meal
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export { Food };
