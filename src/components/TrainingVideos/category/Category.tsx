import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../../../hooks/useStorage';
import { CategoryProps } from './models';
import s from './Category.module.css';
import { LoadableImage } from '../../loadableImage/LoadableImage';

const Category: FC<CategoryProps> = ({ category }) => {
  const navigate = useNavigate();
  const { categoryImageUrl, getCategoryImageUrl } = useStorage();

  useEffect(
    function setCategoryImage(): void {
      (async () => {
        await getCategoryImageUrl(category);
      })().catch((error: Error) => error);
    },
    [getCategoryImageUrl, category]
  );

  const openVideosByCategoryHandler = (): void => {
    const pathVideos = `${category}/`;
    navigate(pathVideos);
  };

  return (
    <div
      className={s.wrapper}
      onClick={openVideosByCategoryHandler}
      onKeyPress={openVideosByCategoryHandler}
      role="link"
      tabIndex={0}
    >
      <h3 className={s.title}>{category}</h3>
      <div className={s.image}>
        <LoadableImage src={categoryImageUrl} alt="category" />
      </div>
    </div>
  );
};

export { Category };
