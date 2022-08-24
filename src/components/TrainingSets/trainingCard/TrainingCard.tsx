import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './TrainingCard.module.css';
import { TrainingCardProps } from './models';
import { useStorage } from '../../../hooks/useStorage';
import { LoadableImage } from '../../loadableImage/LoadableImage';

const TrainingCard: FC<TrainingCardProps> = ({ training: { id, level, title } }) => {
  const navigate = useNavigate();
  const { trainingImageUrl, getTrainingPreviewUrl } = useStorage();

  const openTrainingDetailsHandler = (): void => {
    const pathTraining = `${String(id)}/`;
    navigate(pathTraining);
  };

  useEffect(
    function setTrainingImage(): void {
      (async () => {
        await getTrainingPreviewUrl(title);
      })().catch((error: Error) => error);
    },
    [getTrainingPreviewUrl, title]
  );

  return (
    <div
      className={s.wrapper}
      onClick={openTrainingDetailsHandler}
      onKeyPress={openTrainingDetailsHandler}
      role="link"
      tabIndex={0}
    >
      <div className={s.info}>
        <h2>{title}</h2>
        <p>{level}</p>
      </div>
      <div className={s.image}>
        <LoadableImage src={trainingImageUrl} alt="training" />
      </div>
    </div>
  );
};

export { TrainingCard };
