import React, { FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { getSecondPartPath } from '../../helpers/getSecondPartPath';
import s from './Food.module.css';
import { Links } from './models';

const Food: FC = () => {
  const location = useLocation();
  const secondPart = getSecondPartPath(location.pathname);

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Food</h2>
      <div className={s.links}>
        <Link to={Links.Recipes} className={secondPart === Links.Recipes ? s.link_active : s.link}>
          Recipes
        </Link>
        <Link to={Links.Ration} className={secondPart === Links.Ration ? s.link_active : s.link}>
          Daily ration
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export { Food };
