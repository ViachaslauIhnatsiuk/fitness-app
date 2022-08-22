import React, { FC } from 'react';
import s from './TrainingPreparation.module.css';
import { Button } from '../../UI/button/Button';
import { CircleTimer } from '../../UI/circleTimer/CircleTimer';
import { PREPARATION_TIME } from '../constants';
import { TrainingPreparationProps } from './models';

const TrainingPreparation: FC<TrainingPreparationProps> = ({ onSkipHandler }) => {
  return (
    <div className={s.preparation}>
      <div className={s.preparation__timer}>
        <h1>Get Ready!</h1>
        <CircleTimer duration={PREPARATION_TIME} colors={['#7C00FF', '#7C00FF']} fontSize={70} />
      </div>
      <Button text="Start Over" onClick={onSkipHandler} isStyled customStyles={s.button} />
    </div>
  );
};

export { TrainingPreparation };
