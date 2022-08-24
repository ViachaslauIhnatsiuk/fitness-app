import React, { FC, useEffect } from 'react';
import { useStorage } from '../../../hooks/useStorage';
import { CategoryProps } from './models';
import s from './Category.module.css';
import { LoadableImage } from '../../loadableImage/LoadableImage';

const Category: FC<CategoryProps> = ({ category }) => {
  const { categoryImageUrl, getCategoryImageUrl } = useStorage();

  useEffect(
    function setCategoryImage(): void {
      (async () => {
        await getCategoryImageUrl(category);
      })().catch((error: Error) => error);
    },
    [getCategoryImageUrl, category]
  );

  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>{category}</h3>
      <div className={s.image}>
        <LoadableImage src={categoryImageUrl} alt="category" />
      </div>
    </div>
  );
};

export { Category };
