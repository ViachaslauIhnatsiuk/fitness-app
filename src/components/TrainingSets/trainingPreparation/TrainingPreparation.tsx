import React, { FC } from 'react';
import s from './TrainingPreparation.module.css';
import { Button } from '../../UI/button/Button';
import { CircleTimer } from '../../UI/circleTimer/CircleTimer';
import { PREPARATION_TIME } from '../constants';
import { TrainingPreparationProps } from './models';

const TrainingPreparation: FC<TrainingPreparationProps> = ({ onSkipHandler, onUpdate }) => {
  const onUpdateHandler = (remainingTime: number) => {
    if (onUpdate) onUpdate(remainingTime);
  };

  return (
    <div className={s.preparation}>
      <div className={s.preparation__timer}>
        <h1 className={s.title}>Get Ready!</h1>
        <h4>Use arrows and space bar to control your workout</h4>
        <CircleTimer
          duration={PREPARATION_TIME}
          colors={['#7755ff', '#7755ff']}
          fontSize={70}
          onUpdate={onUpdateHandler}
        />
      </div>
      <Button text="Start Over" onClick={onSkipHandler} isStyled customStyles={s.button} />
    </div>
  );
};

export { TrainingPreparation };
