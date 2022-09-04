import React, { FC } from 'react';
import { BsBookmarkDashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/model';
import { selectFavorites } from '../../../store/selectors';
import { RecipeCardProps } from './models';
import s from './RecipeCard.module.css';

const RecipeCard: FC<RecipeCardProps> = ({ data: { id, title, image } }) => {
  const favorites = useAppSelector(selectFavorites);
  const composePath = `${String(id)}/`;

  return (
    <Link to={composePath} className={s.link}>
      <div className={s.image_wrapper}>
        {favorites.recipes.find((recipe) => recipe.id === id) && (
          <BsBookmarkDashFill className={s.favorite} />
        )}
        <img src={image} className={s.image} alt={title} />
      </div>
      <div className={s.overlay}>
        <span className={s.label}>{title}</span>
      </div>
    </Link>
  );
};

export { RecipeCard };
