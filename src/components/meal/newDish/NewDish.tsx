import React, { FC } from 'react';
import { IoAdd } from 'react-icons/io5';
import s from './NewDish.module.css';

const NewDish: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.text}>Add new dish</div>
      <IoAdd className={s.icon} />
    </div>
  );
};

export { NewDish };
