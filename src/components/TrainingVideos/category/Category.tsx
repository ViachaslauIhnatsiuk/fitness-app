import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CategoryProps } from './models';
import s from './Category.module.css';

const Category: FC<CategoryProps> = ({ category }) => {
  const redirectPath = `${category}/`;

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
