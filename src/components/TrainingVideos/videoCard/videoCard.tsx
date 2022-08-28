import React, { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useStorage } from '../../../hooks/useStorage';
import { LoadableImage } from '../../loadableImage/LoadableImage';
import { VideoCardProps } from './models';
import { convertTitleVideoCard } from '../utils';
import s from './videoCard.module.css';
import { useAppSelector } from '../../../store/model';
import { selectProfile } from '../../../store/selectors';

const VideoCard: FC<VideoCardProps> = ({ title, id }) => {
  const navigate = useNavigate();
  const {
    currentUser: { favorite }
  } = useAppSelector(selectProfile);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { videoPreviewUrl, getVideoPreviewUrl } = useStorage();

  useEffect(() => {
    getVideoPreviewUrl(title).catch((error: Error) => error);
  }, [getVideoPreviewUrl, title]);

  useEffect(
    function setFavoriteMark(): void {
      if (favorite) {
        const { videoTrainings } = favorite;
        if (videoTrainings && videoTrainings.includes(id)) {
          setIsFavorite(true);
        }
      }
    },
    [favorite, id]
  );

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
      {isFavorite && <span className={s.favorite}>In Favorite</span>}
      <h3 className={s.title}>{convertTitleVideoCard(title)}</h3>
      <div className={s.image}>
        <LoadableImage src={videoPreviewUrl} alt="preview" />
      </div>
    </div>
  );
};

export { VideoCard };
