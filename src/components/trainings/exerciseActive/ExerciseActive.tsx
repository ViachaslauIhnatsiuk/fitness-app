import React, { FC } from 'react';
import { Button } from '../../UI/button/Button';
import { CircleTimer } from '../../UI/circleTimer/CircleTimer';
import { ExerciseActiveProps } from './models';

const ExerciseActive: FC<ExerciseActiveProps> = ({
  exercise: { description, img, time, title },
  onClickTimerHandler,
  onPrevHandler,
  onNextHandler
}) => {
  return (
    <div>
      <img src={img} alt="exercise" />
      <br />
      <h4>{title}</h4>
      <span>time: {time}</span>
      <br />
      <h4>{description}</h4>
      <CircleTimer
        duration={time}
        btnTitle="PAUSE"
        onClick={onClickTimerHandler}
        colors={['#7C00FF', '#7C00FF']}
      />
      <Button text="prev" onClick={onPrevHandler} isStyled />
      <Button text="next" onClick={onNextHandler} isStyled />
    </div>
  );
};

export { ExerciseActive };
