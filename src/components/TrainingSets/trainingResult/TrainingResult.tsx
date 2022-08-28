import React, { FC, useEffect } from 'react';
import s from './TrainingResult.module.css';
import { Button } from '../../UI/button/Button';
import { WorkoutPath } from '../../../models/Workout';
import { TrainingResultProps } from './models';
import { useAppDispatch } from '../../../store/store';
import { setCalorieExpenditure } from '../../../store/slices/profileSlice';

const TrainingResult: FC<TrainingResultProps> = ({ statisticsOfTraining: { cal, time } }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCalorieExpenditure(cal));
  }, [cal, dispatch]);

  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <img src="/images/result.png" alt="result" />
      </div>
      <h1 className={s.title}>Congratulations!</h1>
      <p className={s.description}>You have completed the workout!</p>
      <span>Cal: {cal}</span>
      <span>Time: {time}</span>
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
