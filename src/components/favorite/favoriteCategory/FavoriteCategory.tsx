import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './FavoriteCategory.module.css';
import { FavoriteCardProps } from './models';

const FavoriteCategory: FC<FavoriteCardProps> = ({ favorite: { image, redirectPath, title } }) => {
  const navigate = useNavigate();

  const openFavoriteHandler = () => {
    const path = redirectPath;
    navigate(path);
  };

  return (
    <div
      className={s.wrapper}
      onClick={openFavoriteHandler}
      onKeyPress={openFavoriteHandler}
      role="link"
      tabIndex={0}
    >
      <h3 className={s.title}>{title}</h3>
      <div className={s.image}>
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export { FavoriteCategory };
