import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { addCardToUserMeals } from '../../../store/slices/profileSlice';
import { useAppDispatch } from '../../../store/store';
import s from './NewMealCard.module.css';

const NewMealCard: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm<{ newTitle: string }>({
    mode: 'onChange'
  });

  const dispatch = useAppDispatch();

  const onSubmit = () => {
    dispatch(addCardToUserMeals(getValues('newTitle')));
    reset();
  };

  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <input
          type="text"
          className={errors.newTitle ? s.input_invalid : s.input}
          placeholder="Enter new card title"
          autoComplete="off"
          {...register('newTitle', { required: true })}
        />
        <button type="submit" className={s.button}>
          Add card
        </button>
      </form>
    </div>
  );
};

export { NewMealCard };
