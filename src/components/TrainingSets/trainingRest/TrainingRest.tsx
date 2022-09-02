import React, { FC } from 'react';
import s from './TrainingRest.module.css';
import { Button } from '../../UI/button/Button';
import { CircleTimer } from '../../UI/circleTimer/CircleTimer';
import { REST_TIME } from '../constants';
import { TrainingRestProps } from './models';
import { LoadableImage } from '../../loadableImage/LoadableImage';

const TrainingRest: FC<TrainingRestProps> = ({
  onSkipHandler,
  exerciseGifUrl,
  nextExercise: { title },
  onUpdate
}) => {
  return (
    <div className={s.rest}>
      <div className={s.rest__timer}>
        <h1>Take a Rest!</h1>
        <CircleTimer
          duration={REST_TIME}
          colors={['#7C00FF', '#7C00FF']}
          size={80}
          strokeWidth={8}
          fontSize={30}
          onUpdate={onUpdate}
        />
      </div>
      <div className={s.rest__info}>
        <h2>
          Next exercise: <i>{title}</i>
        </h2>
        <LoadableImage src={exerciseGifUrl} alt="exercise" />
      </div>
      <Button text="Skip Rest" onClick={onSkipHandler} isStyled customStyles={s.button} />
    </div>
  );
};

export { TrainingRest };
