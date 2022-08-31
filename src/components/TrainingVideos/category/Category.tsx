import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStorage } from '../../../hooks/useStorage';
import { CategoryProps } from './models';
import s from './Category.module.css';

const Category: FC<CategoryProps> = ({ category }) => {
  const { categoryImageUrl, getCategoryImageUrl } = useStorage();
  const redirectPath = `${category}/`;

  useEffect(() => {
    getCategoryImageUrl(category).catch((error: Error) => error);
  }, [getCategoryImageUrl, category]);

  return (
    <Link className={s.wrapper} to={redirectPath}>
      <h3 className={s.title}>{category}</h3>
      <div className={s.image_wrapper}>
        <img className={s.image} src={`/images/videoPreviews/${category}.jpg`} alt="category" />
      </div>
    </Link>
  );
};

export { Category };
