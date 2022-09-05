import { useMemo, useState } from 'react';
import { dateToday } from '../../../helpers/transformDate';
import { useAppSelector } from '../../../store/model';
import { selectUserMeals } from '../../../store/selectors';

const useMeals = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  setIsLoading(true);
  const userMeals = useAppSelector(selectUserMeals);
  const filtered = useMemo(() => {
    return userMeals.filter((meal) => meal.date === dateToday);
  }, [userMeals]);
  setIsLoading(false);
  return { isLoading, filtered };
};

export { useMeals };
