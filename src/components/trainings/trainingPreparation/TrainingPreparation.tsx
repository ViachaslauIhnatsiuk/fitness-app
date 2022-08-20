import React, { FC } from 'react';
import { Button } from '../../UI/button/Button';
import { CircleTimer } from '../../UI/circleTimer/CircleTimer';
import { PREPARATION_TIME } from '../constants';
import { TrainingPreparationProps } from './models';

const TrainingPreparation: FC<TrainingPreparationProps> = ({ onSkipHandler }) => {
  return (
    <div>
      <h1>Get Ready!</h1>
      <CircleTimer duration={PREPARATION_TIME} colors={['#7C00FF', '#7C00FF']} />
      <Button text="Start Over" onClick={onSkipHandler} isStyled />
    </div>
  );
};

export { TrainingPreparation };
