import React, { FC } from 'react';
import { Button } from '../../UI/button/Button';
import { CircleTimer } from '../../UI/circleTimer/CircleTimer';
import { REST_TIME } from '../constants';
import { TrainingRestProps } from './models';

const TrainingRest: FC<TrainingRestProps> = ({ onSkipHandler }) => {
  return (
    <div>
      <h1>Take a Rest!</h1>
      <CircleTimer duration={REST_TIME} colors={['#7C00FF', '#7C00FF']} />
      <Button text="Skip Rest" onClick={onSkipHandler} isStyled />
    </div>
  );
};

export { TrainingRest };
