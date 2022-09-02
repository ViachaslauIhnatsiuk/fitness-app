import React, { FC, useEffect } from 'react';
import { Button } from '../../UI/button/Button';
import { WorkoutPath } from '../../../models/Workout';
import { TrainingResultProps } from './models';
import { useAppDispatch } from '../../../store/store';
import { setCalorieExpenditure } from '../../../store/slices/profileSlice';
import s from './TrainingResult.module.css';

const TrainingResult: FC<TrainingResultProps> = ({ statisticsOfTraining: { cal, time } }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCalorieExpenditure(cal));
  }, [cal, dispatch]);

  return (
    <div className={s.wrapper}>
      <img className={s.image} src="/images/result.png" alt="result" />
      <h1 className={s.title}>Congratulations!</h1>
      <p className={s.description}>You have completed the workout!</p>
      <div className={s.value}>Cal: {cal}</div>
      <div className={s.value}>Time: {time}</div>
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
