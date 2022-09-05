import { useMemo } from 'react';
import { dateToday } from '../../../helpers/transformDate';
import { useAppSelector } from '../../../store/model';
import { selectUserMeals } from '../../../store/selectors';

const useMeals = () => {
  const userMeals = useAppSelector(selectUserMeals);
  const filtered = useMemo(() => {
    return userMeals.filter((meal) => meal.date === dateToday);
  }, [userMeals]);
  return filtered;
};

export { useMeals };
