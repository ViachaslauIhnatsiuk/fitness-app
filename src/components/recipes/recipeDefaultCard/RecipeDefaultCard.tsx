import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { concatName } from '../../../helpers/concatName';
import { setTitleCase } from '../../../helpers/setTitleCase';
import { useAppSelector } from '../../../store/model';
import { selectRecipes } from '../../../store/selectors';
import { setQueryParams } from '../../../store/slices/recipes/recipesSlice';
import { useAppDispatch } from '../../../store/store';
import { RecipeDefaultCardProps } from './models';
import s from './RecipeDefaultCard.module.css';

const RecipeDefaultCard: FC<RecipeDefaultCardProps> = ({ type }) => {
  const { queryParams } = useAppSelector(selectRecipes);
  const dispatch = useAppDispatch();
  const typeName = concatName(type);
  const composePath = `category=${typeName}/`;
  const imgSrc = `/images/recipePreviews/${concatName(typeName)}.jpg`;

  const handleClickCard = () => dispatch(setQueryParams({ ...queryParams, type }));

  return (
    <Link to={composePath} className={s.link} onClick={handleClickCard}>
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
