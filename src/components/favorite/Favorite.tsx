import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { favorites } from './constants';
import s from './Favorite.module.css';
import { FavoriteCategory } from './favoriteCategory/FavoriteCategory';

const Favorite: FC = () => {
  return (
    <div className={s.wrapper}>
      {favorites.map((favorite) => (
        <FavoriteCategory key={uuidv4()} favorite={favorite} />
      ))}
    </div>
  );
};

export { Favorite };
