import React, { FC, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import s from './NewDish.module.css';

const NewDish: FC = () => {
  const [dishName, setDishName] = useState<string>('');
  const [dishSize, setDishSize] = useState<number>();

  return (
    <div className={s.wrapper}>
      <input
        type="text"
        className={s.dish}
        placeholder="Dish"
        value={dishName}
        onChange={(e) => setDishName(e.target.value)}
      />
      <input
        type="number"
        className={s.size}
        placeholder="Dish size"
        value={dishSize}
        onChange={(e) => setDishSize(Number(e.target.value))}
      />
      <button type="submit" className={s.button}>
        <IoAdd className={s.icon} />
      </button>
    </div>
  );
};

export { NewDish };
