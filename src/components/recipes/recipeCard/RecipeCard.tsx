import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { RecipeCardProps } from './models';
import s from './RecipeCard.module.css';

const RecipeCard: FC<RecipeCardProps> = ({ data: { id, title, image } }) => {
  const composePath = `${String(id)}/`;

  return (
    <div className={s.wrapper}>
      <Link to={composePath} className={s.link}>
        <div className={s.image_wrapper}>
          <img src={image} className={s.image} alt={title} />
        </div>
        <div className={s.overlay}>
          <span className={s.label}>{title}</span>
        </div>
      </Link>
    </div>
  );
};

export { RecipeCard };
