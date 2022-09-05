import React, { FC, useRef, useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { CircleTimer } from '../../UI/circleTimer/CircleTimer';
import { ExerciseActiveProps } from './models';
import s from './ExerciseActive.module.css';
import { useAppSelector } from '../../../store/model';
import { selectSettings } from '../../../store/selectors';
import { CustomAudio } from '../../UI/customAudio/CustomAudio';
import { Audio } from '../../../models/audio';

const ExerciseActive: FC<ExerciseActiveProps> = ({
  exercise: { time, title },
  exerciseGifUrl,
  onPrevHandler,
  onNextHandler,
  onUpdate,
  currentPosition
}) => {
  const { isSoundOn } = useAppSelector(selectSettings);
  const auidoRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (auidoRef.current && isSoundOn) {
      auidoRef.current.volume = 0.4;
      auidoRef.current.play().catch(() => {});
    }
  }, [isSoundOn]);

  return (
    <div className={s.wrapper}>
      <h1>{title}</h1>
      <img className={s.image} src={exerciseGifUrl} alt="exercise" />
      <CircleTimer
        duration={time}
        btnTitle="PAUSE"
        colors={['#7755ff', '#7755ff']}
        size={110}
        fontSize={42}
        strokeWidth={5}
        onUpdate={onUpdate}
        isTimerCanPause
      />
      <div className={s.buttons}>
        <button
          type="button"
          onClick={onPrevHandler}
          className={s.button}
          disabled={currentPosition === 0}
        >
          <AiOutlineLeft />
          Previous
        </button>
        <button type="button" onClick={onNextHandler} className={s.button}>
          Skip
          <AiOutlineRight />
        </button>
      </div>
      <CustomAudio ref={auidoRef} path={Audio.bell} />
    </div>
  );
};

export { ExerciseActive };
