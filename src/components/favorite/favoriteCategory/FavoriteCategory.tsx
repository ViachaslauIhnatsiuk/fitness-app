import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './FavoriteCategory.module.css';
import { FavoriteCardProps } from './models';

const FavoriteCategory: FC<FavoriteCardProps> = ({ favorite: { image, redirectPath, title } }) => {
  return (
    <Link className={s.wrapper} to={redirectPath}>
      <h3 className={s.title}>{title}</h3>
      <div className={s.image}>
        <img src={image} alt={title} />
      </div>
    </Link>
  );
};

export { FavoriteCategory };
