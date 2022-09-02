import React, { FC, useEffect } from 'react';
import { Button } from '../../UI/button/Button';
import { WorkoutPath } from '../../../models/Workout';
import { TrainingResultProps } from './models';
import { useAppDispatch } from '../../../store/store';
import {
  setCalorieExpenditure,
  setDailyTimeTrainings,
  setTotalTimeTrainings,
  setTotalTrainings
} from '../../../store/slices/profileSlice';
import { covertToMinutesString } from '../../../helpers/covertSecondsToMinutes';
import s from './TrainingResult.module.css';

const TrainingResult: FC<TrainingResultProps> = ({ statisticsOfTraining: { cal, time } }) => {
  const dispatch = useAppDispatch();
  const resultCal = cal < 0 ? 0 : cal;
  const resultTime = time < 0 ? 0 : time;

  useEffect(() => {
    dispatch(setCalorieExpenditure(resultCal));
    dispatch(setTotalTimeTrainings(resultTime));
    dispatch(setDailyTimeTrainings(resultTime));
    dispatch(setTotalTrainings(resultCal));
  }, [resultCal, dispatch, resultTime]);

  return (
    <div className={s.wrapper}>
      <img className={s.image} src="/images/result.png" alt="result" />
      <h1 className={s.title}>Congratulations!</h1>
      <p className={s.description}>You have completed the workout!</p>
      <div className={s.value}>Cal: {resultCal}</div>
      <div className={s.value}>Time: {covertToMinutesString(resultTime)}</div>
      <div className={s.buttons}>
        <Button
          path={WorkoutPath.trainings}
          text="Next to Another Workout"
          isStyled
          customStyles={s.button}
        />
        <Button path={WorkoutPath.home} text="Home" isStyled customStyles={s.button_home} />
      </div>
    </div>
  );
};

export { TrainingResult };
