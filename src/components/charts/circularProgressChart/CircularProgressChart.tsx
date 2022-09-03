import React, { FC } from 'react';
import s from './CircularProgressChart.module.css';
import { CircleChart } from '../../UI/circleChart/CircleChart';
import { useAppSelector } from '../../../store/model';
import { selectProfile, selectUserMeals } from '../../../store/selectors';
import { covertToMinutesNumber } from '../../../helpers/covertSecondsToMinutes';
import { getConsumptionStatistic } from './helpers';
import { INITIAL_VALUE_CHART } from './constants';

const CircularProgressChart: FC = () => {
  const { currentUser } = useAppSelector(selectProfile);
  const { totalTime, totalTrainings } = currentUser.statistics.trainings;
  const userMeals = useAppSelector(selectUserMeals);
  const { calories, carbs, fats, proteins } = getConsumptionStatistic(userMeals);

  return (
    <div className={s.circles}>
      <CircleChart
        maxValue={INITIAL_VALUE_CHART}
        currentValue={totalTrainings}
        color="#fbd230"
        text="Workouts"
      />
      <CircleChart
        maxValue={INITIAL_VALUE_CHART}
        currentValue={covertToMinutesNumber(totalTime)}
        color="#ff6267"
        text="Minutes"
      />
      <CircleChart maxValue={INITIAL_VALUE_CHART} currentValue={calories} color="#2f72fd" />
      <CircleChart
        maxValue={INITIAL_VALUE_CHART}
        currentValue={proteins}
        color="#2f72fd"
        text="Proteins"
      />
      <CircleChart maxValue={INITIAL_VALUE_CHART} currentValue={fats} color="#2f72fd" text="Fats" />
      <CircleChart
        maxValue={INITIAL_VALUE_CHART}
        currentValue={carbs}
        color="#2f72fd"
        text="Carbs"
      />
    </div>
  );
};

export { CircularProgressChart };
