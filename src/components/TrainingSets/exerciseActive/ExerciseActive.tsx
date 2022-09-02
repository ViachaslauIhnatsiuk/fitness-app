import React, { FC } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import s from './ExerciseActive.module.css';
import { Button } from '../../UI/button/Button';
import { CircleTimer } from '../../UI/circleTimer/CircleTimer';
import { ExerciseActiveProps } from './models';

const ExerciseActive: FC<ExerciseActiveProps> = ({
  exercise: { time, title },
  exerciseGifUrl,
  onPrevHandler,
  onNextHandler,
  onUpdate,
  currentPosition
}) => {
  return (
    <div className={s.wrapper}>
      <img src={exerciseGifUrl} alt="exercise" />
      <div className={s.info}>
        <h1>{title}</h1>
      </div>
      <CircleTimer
        duration={time}
        btnTitle="PAUSE"
        colors={['#7C00FF', '#7C00FF']}
        size={110}
        fontSize={50}
        strokeWidth={10}
        onUpdate={onUpdate}
        isTimerCanPause
      />
      <div className={s.buttons}>
        <Button
          text="Previous"
          onClick={onPrevHandler}
          isStyled
          icon={<AiOutlineArrowLeft />}
          customStyles={s.button}
          isDisabled={currentPosition === 0}
        />
        <Button
          text="Skip"
          onClick={onNextHandler}
          isStyled
          icon={<AiOutlineArrowRight />}
          iconPosition="right"
          customStyles={s.button}
        />
      </div>
    </div>
  );
};

export { ExerciseActive };
