import React, { FC } from 'react';
import s from './TrainingResult.module.css';
import { Button } from '../../UI/button/Button';
import { Path } from '../../../models/Workout';

const TrainingResult: FC = () => {
  return (
    <div className={s.wrapper}>
      <img className={s.image} src="/images/result.png" alt="result" />
      <h1 className={s.title}>Congratulations!</h1>
      <p className={s.description}>You have completed the workout!</p>
      <div className={s.buttons}>
        <Button
          path={Path.trainings}
          text="Next to Another Workout"
          isStyled
          customStyles={s.button}
        />
        <Button path={Path.home} text="Home" isStyled customStyles={s.button_home} />
      </div>
    </div>
  );
};

export { TrainingResult };
