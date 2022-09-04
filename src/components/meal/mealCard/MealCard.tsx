import React, { FC, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoAdd, IoSearchOutline } from 'react-icons/io5';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { MealDish } from '../mealDish/MealDish';
import { DishFormInputs, MealCardProps } from './models';
import { useAppDispatch } from '../../../store/store';
import { useAppSelector } from '../../../store/model';
import { selectMeals } from '../../../store/selectors';
import { fetchMeals, resetMeals, setMealCardId } from '../../../store/slices/meals/mealsSlice';
import { deleteCard, editCardTitle, setMeals } from '../../../store/slices/profileSlice';
import { dateToday } from '../../../helpers/transformDate';
import Loader from '../../UI/loader/Loader';
import s from './MealCard.module.css';

const MealCard: FC<MealCardProps> = ({ id, title, meals }) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm<DishFormInputs>({
    mode: 'onChange'
  });
  const [newTitle, setNewTitle] = useState<string>(title);
  const [editMode, setEditMode] = useState<boolean>(false);
  const totalCalories = meals.reduce((acc, cur) => acc + cur.calories, 0).toFixed(1);

  const dispatch = useAppDispatch();
  const {
    isLoading,
    error,
    mealCardId,
    currentMeals: { items },
    isUploaded
  } = useAppSelector(selectMeals);

  const onSubmit = () => {
    const dishName = getValues('dishName');
    const dishSize = getValues('dishSize');
    const query = `${String(dishSize)}g ${String(dishName)}`;
    dispatch(setMealCardId(id));
    dispatch(fetchMeals(query)).catch((err: Error) => err);
  };

  const handleSubmitEdit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(editCardTitle({ id, newTitle }));
    setEditMode(false);
  };

  const handleAddNewDish = () => {
    dispatch(setMeals({ date: dateToday, mealCardId: id, meal: items[0] }));
    reset();
    dispatch(resetMeals());
  };

  const handleReturnToForm = () => {
    reset();
    dispatch(resetMeals());
  };

  const handleDeleteCard = () => dispatch(deleteCard({ id }));

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        {editMode ? (
          <form onSubmit={handleSubmitEdit} className={s.form_edit}>
            <input
              type="text"
              className={s.input_edit}
              placeholder="New title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button type="submit" className={s.remove}>
              Update
            </button>
          </form>
        ) : (
          <div className={s.header} onDoubleClick={() => setEditMode(true)}>
            <div className={s.info}>
              <div className={s.meals}>{meals.length} meals</div>
              <div className={s.calories}>{totalCalories} cal</div>
            </div>
            <div className={s.title}>{title}</div>
            <button type="button" className={s.remove} onClick={handleDeleteCard}>
              Remove
            </button>
          </div>
        )}
      </div>
      {id !== mealCardId ? (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form_wrapper}>
          <input
            type="text"
            className={errors.dishName ? s.dish_invalid : s.dish}
            placeholder="Dish, name"
            autoComplete="off"
            {...register('dishName', { required: true, minLength: 3 })}
          />
          <input
            type="number"
            className={errors.dishSize ? s.size_invalid : s.size}
            placeholder="Size, g"
            autoComplete="off"
            {...register('dishSize', { required: true, min: 10, max: 5000 })}
          />
          <button type="submit" className={s.button}>
            <IoSearchOutline className={s.icon} />
          </button>
        </form>
      ) : (
        <div>
          {error && <h3>{error}</h3>}
          {isLoading && (
            <div className={s.center}>
              <Loader size={10} />
            </div>
          )}
          {isUploaded &&
            (items.length ? (
              <div className={s.form_wrapper}>
                <div className={s.preview}>
                  {items[0].name}: {items[0].serving_size_g} g, {items[0].calories} cal
                </div>
                <button type="button" className={s.button} onClick={handleAddNewDish}>
                  <IoAdd className={s.icon} />
                </button>
              </div>
            ) : (
              <div className={s.form_wrapper}>
                <div className={s.preview}>Nothing was found. Please, try again</div>
                <button type="button" className={s.button} onClick={handleReturnToForm}>
                  <RiArrowGoBackFill className={s.icon} />
                </button>
              </div>
            ))}
        </div>
      )}
      <div className={s.meals_wrapper}>
        {meals.map((meal, ind) => (
          <MealDish props={meal} mealCardId={id} mealDishId={ind} key={uuidv4()} />
        ))}
      </div>
    </div>
  );
};

export { MealCard };
