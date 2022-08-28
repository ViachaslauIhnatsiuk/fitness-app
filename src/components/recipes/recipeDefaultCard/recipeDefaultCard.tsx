import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { concatName } from '../../../helpers/concatName';
import { setTitleCase } from '../../../helpers/setTitleCase';
import { RecipeDefaultCardProps } from './models';
import s from './RecipeDefaultCard.module.css';

const RecipeDefaultCard: FC<RecipeDefaultCardProps> = ({ type, onClick }) => {
  const composePath = `recipesCategory=${type}/`;
  const imgSrc = process.env.PUBLIC_URL?.concat(`/images/recipePreviews/${concatName(type)}.jpg`);

  return (
    <Link to={composePath} className={s.link} onClick={() => onClick(type)}>
      <div className={s.image_wrapper}>
        <img src={imgSrc} className={s.image} alt={type} />
      </div>
      <div className={s.overlay}>
        <span className={s.label}>{setTitleCase(type)}</span>
      </div>
    </Link>
  );
};

export { RecipeDefaultCard };
