import React, { FC, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoAdd, IoTrashOutline, IoSearchOutline, IoReturnUpBack } from 'react-icons/io5';
import { MealDish } from '../mealDish/MealDish';
import { MealCardProps } from './models';
import s from './MealCard.module.css';
import { useAppDispatch } from '../../../store/store';
import { useAppSelector } from '../../../store/model';
import { selectMeals } from '../../../store/selectors';
import { fetchMeals, resetMeals, setMealCardType } from '../../../store/slices/meals/mealsSlice';
import { deleteCard, editCardTitle, setMeals } from '../../../store/slices/profileSlice';
import { dateToday } from '../../../helpers/transformDate';
import Loader from '../../UI/loader/Loader';

const MealCard: FC<MealCardProps> = ({ id, title, meals }) => {
  const [dishName, setDishName] = useState<string>('');
  const [dishSize, setDishSize] = useState<number>(0);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [editMode, setEditMode] = useState<boolean>(false);
  const totalCalories = meals.reduce((acc, cur) => acc + cur.calories, 0).toFixed(1);

  const dispatch = useAppDispatch();
  const {
    isLoading,
    error,
    mealCardType,
    currentMeals: { items },
    isUploaded
  } = useAppSelector(selectMeals);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(setMealCardType(title));
    dispatch(fetchMeals({ query: `${dishSize}g ${dishName}`, mealCardType: title })).catch(
      (err: Error) => err
    );
  };

  const handleSubmitEdit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(editCardTitle({ id, newTitle }));
    setEditMode(false);
  };

  const handleAddNewDish = () => {
    dispatch(setMeals({ date: dateToday, mealTitle: title, meal: items[0] }));
    setDishName('');
    setDishSize(0);
    dispatch(resetMeals());
  };

  const handleReturnToForm = () => {
    setDishName('');
    setDishSize(0);
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
          </form>
        ) : (
          <div className={s.title} onDoubleClick={() => setEditMode(true)}>
            <span>{title}</span>
            <button type="button" className={s.btn_delete} onClick={handleDeleteCard}>
              <IoTrashOutline className={s.delete_icon} />
            </button>
            <div className={s.info}>
              <div className={s.meals}>{meals.length} meals</div>
              <div className={s.calories}>{totalCalories} calories</div>
            </div>
          </div>
        )}
      </div>
      <div>
        {title !== mealCardType ? (
          <form onSubmit={handleSubmit} className={s.form_wrapper}>
            <input
              type="text"
              className={s.dish}
              placeholder="Dish: name"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
            />
            <input
              type="number"
              min={0}
              className={s.size}
              placeholder="Size: g"
              value={dishSize || ''}
              onChange={(e) => setDishSize(Number(e.target.value))}
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
                <Loader size={15} />
              </div>
            )}
            {isUploaded &&
              (items.length ? (
                <div className={s.form_wrapper}>
                  <div className={s.preview}>
                    {items[0].name} - {items[0].serving_size_g}g: {items[0].calories}cal
                  </div>
                  <button type="button" className={s.button} onClick={handleAddNewDish}>
                    <IoAdd className={s.icon} />
                  </button>
                </div>
              ) : (
                <div className={s.form_wrapper}>
                  <div className={s.preview}>Nothing was found. repeat the search</div>
                  <button type="button" className={s.button} onClick={handleReturnToForm}>
                    <IoReturnUpBack className={s.icon} />
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
      {meals.map((meal) => (
        <MealDish props={meal} key={uuidv4()} title={title} />
      ))}
    </div>
  );
};

export { MealCard };
