import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './TrainingCard.module.css';
import { TrainingCardProps } from './models';
import { useStorage } from '../../../hooks/useStorage';

const TrainingCard: FC<TrainingCardProps> = ({ training: { id, level, title } }) => {
  const navigate = useNavigate();
  const [urlBackgroundImage, setUrlBackgroundImage] = useState<string>('');

  const openTrainingDetailsHandler = (): void => {
    const pathTraining = `${String(id)}/`;
    navigate(pathTraining);
  };

  const { getTrainingPreviewUrl } = useStorage();

  useEffect(
    function setTrainingPreview(): void {
      (async () => {
        const urlPreview = await getTrainingPreviewUrl(title);
        setUrlBackgroundImage(urlPreview);
      })().catch((error: Error) => error);
    },
    [getTrainingPreviewUrl, title]
  );

  return (
    <div className={s.wrapper}>
      {urlBackgroundImage && (
        <>
          <div
            className={s.info}
            onClick={openTrainingDetailsHandler}
            onKeyPress={openTrainingDetailsHandler}
            role="link"
            tabIndex={0}
          >
            <h2>{title}</h2>
            <p>{level}</p>
          </div>
          <img className={s.image} src={urlBackgroundImage} alt="f" />
        </>
      )}
    </div>
  );
};

export { TrainingCard };
