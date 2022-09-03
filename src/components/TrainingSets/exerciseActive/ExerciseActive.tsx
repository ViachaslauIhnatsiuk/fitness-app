import React, { FC, useRef, useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Button } from '../../UI/button/Button';
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
        <Button
          text="Previous"
          onClick={onPrevHandler}
          isStyled
          icon={<AiOutlineLeft />}
          customStyles={s.button}
          isDisabled={currentPosition === 0}
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
      <CustomAudio ref={auidoRef} path={Audio.bell} />
    </div>
  );
};

export { ExerciseActive };
