import React, { FC } from 'react';
import s from './CircularProgressChart.module.css';
import { CircleChart } from '../../UI/circleChart/CircleChart';
import { useAppSelector } from '../../../store/model';
import { selectProfile, selectUserMeals } from '../../../store/selectors';
import { getConsumptionStatistic } from './helpers';
import { INITIAL_VALUE_CHART, MAX_CALORIES, MAX_HOURS } from './constants';

const CircularProgressChart: FC = () => {
  const { currentUser } = useAppSelector(selectProfile);
  const { totalTime, totalTrainings } = currentUser.statistics.trainings;
  const userMeals = useAppSelector(selectUserMeals);
  const { calories, carbs, fats, proteins } = getConsumptionStatistic(userMeals);

  return (
    <div className={s.circles}>
      <CircleChart
        maxValue={INITIAL_VALUE_CHART}
        currentValue={totalTrainings || 0}
        color="#fbd230"
        text="Workouts"
      />
      <CircleChart
        maxValue={MAX_HOURS}
        currentValue={totalTime || 0}
        isTime
        color="#ff6267"
        text="Hours"
      />
      <CircleChart maxValue={MAX_CALORIES} currentValue={calories || 0} color="#3778fd" />
      <CircleChart
        maxValue={MAX_CALORIES}
        currentValue={proteins || 0}
        color="#21c064"
        text="Proteins"
      />
      <CircleChart maxValue={MAX_CALORIES} currentValue={fats || 0} color="#fbd024" text="Fats" />
      <CircleChart maxValue={MAX_CALORIES} currentValue={carbs || 0} color="#fe6469" text="Carbs" />
    </div>
  );
};

export { CircularProgressChart };
