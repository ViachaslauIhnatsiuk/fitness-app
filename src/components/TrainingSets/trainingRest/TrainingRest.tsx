import React, { FC } from 'react';
import { Button } from '../../UI/button/Button';
import { CircleTimer } from '../../UI/circleTimer/CircleTimer';
import { REST_TIME } from '../constants';
import { TrainingRestProps } from './models';
import s from './TrainingRest.module.css';

const TrainingRest: FC<TrainingRestProps> = ({
  onSkipHandler,
  exerciseGifUrl,
  nextExercise: { title }
}) => {
  return (
    <div className={s.rest}>
      <div className={s.timer}>
        <h1>Take a Rest!</h1>
        <CircleTimer
          duration={REST_TIME}
          colors={['#7755ff', '#7755ff']}
          size={80}
          strokeWidth={4}
          fontSize={28}
        />
      </div>
      <div className={s.info}>
        <h2 className={s.title}>
          Next exercise: <i>{title}</i>
        </h2>
        <img className={s.image} src={exerciseGifUrl} alt="exercise" />
      </div>
      <Button text="Skip Rest" onClick={onSkipHandler} isStyled customStyles={s.button} />
    </div>
  );
};

export { TrainingRest };
