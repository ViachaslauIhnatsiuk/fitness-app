import React, { FC } from 'react';
import { IoAdd } from 'react-icons/io5';
import s from './NewMealCard.module.css';

const NewMealCard: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.circle}>
        <IoAdd className={s.icon} />
      </div>
    </div>
  );
};

export { NewMealCard };
