import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './FavoriteCategory.module.css';
import { FavoriteCardProps } from './models';

const FavoriteCategory: FC<FavoriteCardProps> = ({ favorite: { image, redirectPath, title } }) => {
  return (
    <Link className={s.wrapper} to={redirectPath}>
      <div className={s.image_wrapper}>
        <img src={image} className={s.image} alt={title} />
      </div>
      <div className={s.overlay}>
        <span className={s.label}>{title}</span>
      </div>
    </Link>
  );
};

export { FavoriteCategory };
