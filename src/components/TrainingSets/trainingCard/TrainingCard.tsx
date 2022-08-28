import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './TrainingCard.module.css';
import { TrainingCardProps } from './models';
import { useStorage } from '../../../hooks/useStorage';
import { LoadableImage } from '../../loadableImage/LoadableImage';
import { useAppSelector } from '../../../store/model';
import { selectProfile } from '../../../store/selectors';
import { buildRedirectPath } from './helpers';

const TrainingCard: FC<TrainingCardProps> = ({ training: { id, level, title } }) => {
  const { pathname } = useLocation();
  const { trainingImageUrl, getTrainingPreviewUrl } = useStorage();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const {
    currentUser: { favorite }
  } = useAppSelector(selectProfile);

  const redirectPath = buildRedirectPath(pathname, id);

  useEffect(() => {
    getTrainingPreviewUrl(title).catch((error: Error) => error);
  }, [getTrainingPreviewUrl, title]);

  useEffect(
    function setFavoriteMark(): void {
      if (favorite) {
        const { trainings } = favorite;
        if (trainings && trainings.includes(id)) {
          setIsFavorite(true);
        }
      }
    },
    [favorite, id]
  );

  return (
    <Link className={s.wrapper} to={redirectPath}>
      <div className={s.info}>
        <h2>{title}</h2>
        <p>{level}</p>
        {isFavorite && <span className={s.favorite}>In Favorite</span>}
      </div>
      <div className={s.image}>
        <LoadableImage src={trainingImageUrl} alt="training" />
      </div>
    </Link>
  );
};

export { TrainingCard };
