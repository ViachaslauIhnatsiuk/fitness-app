import React, { FC } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Button } from '../../UI/button/Button';
import { CircleTimer } from '../../UI/circleTimer/CircleTimer';
import { ExerciseActiveProps } from './models';
import s from './ExerciseActive.module.css';

const ExerciseActive: FC<ExerciseActiveProps> = ({
  exercise: { time, title },
  exerciseGifUrl,
  onClickTimerHandler,
  onPrevHandler,
  onNextHandler
}) => {
  return (
    <div className={s.wrapper}>
      <h1>{title}</h1>
      <img className={s.image} src={exerciseGifUrl} alt="exercise" />
      <CircleTimer
        duration={time}
        btnTitle="PAUSE"
        onClick={onClickTimerHandler}
        colors={['#7755ff', '#7755ff']}
        size={110}
        fontSize={42}
        strokeWidth={5}
      />
      <div className={s.buttons}>
        <Button
          text="Previous"
          onClick={onPrevHandler}
          isStyled
          icon={<AiOutlineLeft />}
          customStyles={s.button}
        />
        <Button
          text="Skip"
          onClick={onNextHandler}
          isStyled
          icon={<AiOutlineRight />}
          iconPosition="right"
          customStyles={s.button}
        />
      </div>
    </div>
  );
};

export { ExerciseActive };
