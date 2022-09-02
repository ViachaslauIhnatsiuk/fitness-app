import React, { FC } from 'react';
import s from './CircularProgressChart.module.css';
import { CircleChart } from '../../UI/circleChart/CircleChart';
import { useAppSelector } from '../../../store/model';
import { selectProfile } from '../../../store/selectors';
import { DEFAULT_CIRCULAR_PATH_COLOR } from './constants';
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
      <CircleChart
        maxValue={100}
        currentValue={totalTrainings + 10}
        color={DEFAULT_CIRCULAR_PATH_COLOR}
        text="Workouts"
      />
      <CircleChart
        maxValue={200}
        currentValue={covertToMinutesNumber(totalTime)}
        color={DEFAULT_CIRCULAR_PATH_COLOR}
        text="Minutes"
      />
      <CircleChart maxValue={100} currentValue={0} color={DEFAULT_CIRCULAR_PATH_COLOR} />
      <CircleChart maxValue={100} currentValue={0} color={DEFAULT_CIRCULAR_PATH_COLOR} />
    </div>
  );
};

export { CircularProgressChart };
