import React, { FC } from 'react';
import { IoAdd } from 'react-icons/io5';
import s from './NewDishModal.module.css';

const NewDishModal: FC = () => {
  return (
    <div className={s.wrapper}>
      <input type="text" className={s.input} placeholder="Enter dish" />
    </div>
  );
};

export { NewDishModal };
