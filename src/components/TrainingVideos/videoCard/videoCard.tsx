import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../../../hooks/useStorage';
import { LoadableImage } from '../../loadableImage/LoadableImage';
import { VideoCardProps } from './models';
import { convertTitleVideoCard } from '../utils';
import s from './videoCard.module.css';

const VideoCard: FC<VideoCardProps> = ({ title, id }) => {
  const navigate = useNavigate();
  const { videoPreviewUrl, getVideoPreviewUrl } = useStorage();

  useEffect(() => {
    getVideoPreviewUrl(title).catch((error: Error) => error);
  }, [getVideoPreviewUrl, title]);

  const openPageVideoHandler = () => {
    const pathTraining = `${String(id)}/`;
    navigate(pathTraining);
  };

  return (
    <div
      className={s.wrapper}
      onClick={openPageVideoHandler}
      onKeyPress={openPageVideoHandler}
      role="link"
      tabIndex={0}
    >
      <h3 className={s.title}>{convertTitleVideoCard(title)}</h3>
      <div className={s.image}>
        <LoadableImage src={videoPreviewUrl} alt="preview" />
      </div>
    </div>
  );
};

export { VideoCard };
