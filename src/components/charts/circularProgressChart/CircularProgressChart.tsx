import React, { FC } from 'react';
import s from './CircularProgressChart.module.css';
import { CircleChart } from '../../UI/circleChart/CircleChart';
import { useAppSelector } from '../../../store/model';
import { selectProfile, selectUserMeals } from '../../../store/selectors';
import { convertToThousands, convertMinutesToHours, getConsumptionStatistic } from './helpers';
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
        currentValue={totalTrainings}
        color="#fbd230"
        text="Workouts"
      />
      <CircleChart
        maxValue={MAX_HOURS}
        currentValue={convertMinutesToHours(totalTime)}
        color="#ff6267"
        text="Hours"
      />
      <CircleChart
        maxValue={MAX_CALORIES}
        currentValue={convertToThousands(calories)}
        isThousands
        color="#3778fd"
      />
      <CircleChart
        maxValue={MAX_CALORIES}
        currentValue={convertToThousands(proteins)}
        isThousands
        color="#21c064"
        text="Proteins"
      />
      <CircleChart
        maxValue={MAX_CALORIES}
        currentValue={convertToThousands(fats)}
        isThousands
        color="#fbd024"
        text="Fats"
      />
      <CircleChart
        maxValue={MAX_CALORIES}
        currentValue={convertToThousands(carbs)}
        isThousands
        color="#fe6469"
        text="Carbs"
      />
    </div>
  );
};

export { CircularProgressChart };
