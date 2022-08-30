import React, { FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { getSecondPartPath } from '../../helpers/getSecondPartPath';
import { Links } from './models';
import s from './Food.module.css';

const Food: FC = () => {
  const location = useLocation();
  const secondPart = getSecondPartPath(location.pathname);

  const recipesClassName = secondPart === Links.Recipes ? s.link_active : s.link;
  const rationClassName = secondPart === Links.Meal ? s.link_active : s.link;

  return (
    <div className={s.wrapper}>
      <div className={s.links}>
        <Link to={Links.Recipes} className={recipesClassName}>
          Recipes
        </Link>
        <Link to={Links.Meal} className={rationClassName}>
          Meal
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export { Food };
