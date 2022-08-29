import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStorage } from '../../../hooks/useStorage';
import { LoadableImage } from '../../loadableImage/LoadableImage';
import { VideoCardProps } from './models';
import { convertTitleVideoCard } from '../utils';
import s from './VideoCard.module.css';
import { useAppSelector } from '../../../store/model';
import { selectProfile } from '../../../store/selectors';
import { buildRedirectPath } from './helpers';

const VideoCard: FC<VideoCardProps> = ({ title, id, videoCategory }) => {
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
  const { pathname } = useLocation();

  const redirectPath = buildRedirectPath(pathname, videoCategory as string, id);

  return (
    <Link className={s.wrapper} to={redirectPath}>
      {isFavorite && <span className={s.favorite}>In Favorite</span>}
      <h3 className={s.title}>{convertTitleVideoCard(title)}</h3>
      <div className={s.image}>
        <LoadableImage src={videoPreviewUrl} alt="preview" />
      </div>
    </Link>
  );
};

export { VideoCard };
