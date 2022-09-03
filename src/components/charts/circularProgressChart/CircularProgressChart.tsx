import React, { FC } from 'react';
import s from './CircularProgressChart.module.css';
import { CircleChart } from '../../UI/circleChart/CircleChart';
import { useAppSelector } from '../../../store/model';
import { selectProfile } from '../../../store/selectors';
import { covertToMinutesNumber } from '../../../helpers/covertSecondsToMinutes';

const CircularProgressChart: FC = () => {
  const {
    currentUser: {
      statistics: {
        trainings: { totalTrainings, totalTime }
      }
    }
  } = useAppSelector(selectProfile);

  return (
    <div className={s.circles}>
      <CircleChart maxValue={100} currentValue={totalTrainings} color="#fbd230" text="Workouts" />
      <CircleChart
        maxValue={200}
        currentValue={covertToMinutesNumber(totalTime)}
        color="#ff6267"
        text="Minutes"
      />
      <CircleChart maxValue={100} currentValue={0} color="#2f72fd" />
      <CircleChart maxValue={100} currentValue={0} color="#2f72fd" text="Proteins" />
      <CircleChart maxValue={100} currentValue={0} color="#2f72fd" text="Fats" />
      <CircleChart maxValue={100} currentValue={0} color="#2f72fd" text="Carbs" />
    </div>
  );
};

export { CircularProgressChart };
