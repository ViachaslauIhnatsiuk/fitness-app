import React, { FC } from 'react';
import s from './TrainingResult.module.css';
import { Button } from '../../UI/button/Button';
import { WorkoutPath } from '../../../models/Workout';
import { LoadableImage } from '../../loadableImage/LoadableImage';

const TrainingResult: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <LoadableImage src="/images/result.png" alt="result" />
      </div>
      <h1 className={s.title}>Congratulations!</h1>
      <p className={s.description}>You have completed the workout!</p>
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
