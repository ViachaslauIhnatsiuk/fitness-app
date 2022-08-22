import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './TrainingCard.module.css';
import { TrainingCardProps } from './models';

const TrainingCard: FC<TrainingCardProps> = ({ training: { id, level, title, img } }) => {
  const navigate = useNavigate();

  const openTrainingDetailsHandler = () => {
    const pathTraining = `${String(id)}/`;
    navigate(pathTraining);
  };

  const srcPreviewImage = `url(${String(img)})`;
  const styles = {
    backgroundImage: srcPreviewImage
  };

  return (
    <div
      className={s.training}
      onClick={openTrainingDetailsHandler}
      onKeyPress={openTrainingDetailsHandler}
      role="link"
      tabIndex={0}
      style={styles}
    >
      <h2>{title}</h2>
      <p>{level}</p>
    </div>
  );
};

export { TrainingCard };
