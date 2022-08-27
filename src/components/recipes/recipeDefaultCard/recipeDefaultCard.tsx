import React, { FC } from 'react';
import { concatName } from '../../../helpers/concatName';
import { setTitleCase } from '../../../helpers/setTitleCase';
import { RecipeDefaultCardProps } from './models';
import s from './recipeDefaultCard.module.css';

const RecipeDefaultCard: FC<RecipeDefaultCardProps> = ({ type, onClick }) => {
  return (
    <button type="button" className={s.wrapper_card} onClick={() => onClick(type)}>
      <div className={s.image_wrapper}>
        <img
          src={process.env.PUBLIC_URL?.concat(`/images/recipePreviews/${concatName(type)}.jpg`)}
          className={s.image}
          alt={type}
        />
      </div>
      <div className={s.overlay}>
        <span className={s.label}>{setTitleCase(type)}</span>
      </div>
    </button>
  );
};

export { RecipeDefaultCard };
