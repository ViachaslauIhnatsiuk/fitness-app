import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { favorites } from './constants';
import { FavoriteCategory } from './favoriteCategory/FavoriteCategory';
import s from './Favorite.module.css';

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
