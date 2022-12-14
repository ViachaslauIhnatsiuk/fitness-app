import React, { FC, useEffect, useRef } from 'react';
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
import { CustomAudio } from '../../UI/customAudio/CustomAudio';
import { Audio } from '../../../models/audio';
import { useAppSelector } from '../../../store/model';
import { selectSettings } from '../../../store/selectors';

const TrainingResult: FC<TrainingResultProps> = ({ statisticsOfTraining: { cal, time } }) => {
  const { isSoundOn } = useAppSelector(selectSettings);
  const auidoRef = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();
  cal = cal < 0 ? 0 : cal;
  time = time < 0 ? 0 : time;

  useEffect(() => {
    dispatch(setCalorieExpenditure(cal));
    dispatch(setTotalTimeTrainings(time));
    dispatch(setDailyTimeTrainings(time));
    dispatch(setTotalTrainings(1));
  }, [cal, dispatch, time]);

  useEffect(() => {
    if (auidoRef.current && isSoundOn) {
      auidoRef.current.volume = 0.1;
      auidoRef.current.play().catch(() => {});
    }
  }, [isSoundOn]);

  return (
    <div className={s.wrapper}>
      <img className={s.image} src="/images/result.png" alt="result" />
      <h1 className={s.title}>Congratulations!</h1>
      <p className={s.description}>You have completed the workout!</p>
      <div className={s.value}>Cal: {cal}</div>
      <div className={s.value}>Time: {covertToMinutesString(time)}</div>
      <div className={s.buttons}>
        <Button
          path={WorkoutPath.trainings}
          text="Next to Another Workout"
          isStyled
          customStyles={s.button}
        />
        <Button path={WorkoutPath.home} text="Home" isStyled customStyles={s.button_home} />
      </div>
      <CustomAudio ref={auidoRef} path={Audio.finish} />
    </div>
  );
};

export { TrainingResult };
