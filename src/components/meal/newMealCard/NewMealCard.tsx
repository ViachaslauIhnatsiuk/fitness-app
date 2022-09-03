import React, { FC, FormEvent, useState } from 'react';
import { addCardToUserMeals } from '../../../store/slices/profileSlice';
import { useAppDispatch } from '../../../store/store';
import s from './NewMealCard.module.css';

const NewMealCard: FC = () => {
  const [newTitle, setNewTitle] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addCardToUserMeals(newTitle));
    setNewTitle('');
  };
  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          className={s.input}
          placeholder="Enter new card title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="submit" className={s.button}>
          Add card
        </button>
      </form>
    </div>
  );
};

export { NewMealCard };
