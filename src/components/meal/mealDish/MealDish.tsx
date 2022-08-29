import React, { FC } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import image from '../../../assets/soup.jpg';
import s from './MealDish.module.css';

const MealDish: FC = () => {
  return (
    <div className={s.wrapper}>
      <img className={s.image} src={image} alt="dish" />
      <div className={s.info}>
        <div className={s.title}>Cream soup with croutons</div>
        <div className={s.calories}>100 calories</div>
        <div className={s.time}>10:00</div>
      </div>
      <IoTrashOutline className={s.remove} />
    </div>
  );
};

export { MealDish };
