import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './TrainingCard.module.css';
import { TrainingCardProps } from './models';
import { useStorage } from '../../../hooks/useStorage';

const TrainingCard: FC<TrainingCardProps> = ({ training: { id, level, title } }) => {
  const navigate = useNavigate();
  const { trainingPreviewUrl, getTrainingPreviewUrl } = useStorage();

  const openTrainingDetailsHandler = (): void => {
    const pathTraining = `${String(id)}/`;
    navigate(pathTraining);
  };

  useEffect(
    function setTrainingPreview(): void {
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
      {trainingPreviewUrl && (
        <>
          <div className={s.info}>
            <h2>{title}</h2>
            <p>{level}</p>
          </div>
          <img className={s.image} src={trainingPreviewUrl} alt="f" />
        </>
      )}
    </div>
  );
};

export { TrainingCard };
