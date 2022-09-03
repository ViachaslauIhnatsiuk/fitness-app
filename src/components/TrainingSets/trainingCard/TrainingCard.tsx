import React, { FC, useEffect, useState } from 'react';
import { BsBookmarkDashFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { TrainingCardProps } from './models';
import { useStorage } from '../../../hooks/useStorage';
import { LoadableImage } from '../../loadableImage/LoadableImage';
import { useAppSelector } from '../../../store/model';
import { selectProfile } from '../../../store/selectors';
import { buildRedirectPath } from './helpers';
import s from './TrainingCard.module.css';

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
      {isFavorite && <BsBookmarkDashFill className={s.favorite} />}
      <div className={s.info}>
        <h2 className={s.title}>{title}</h2>
        <p className={s.level}>{level}</p>
      </div>
      <div className={s.image}>
        <LoadableImage src={trainingImageUrl} alt="training" />
      </div>
    </Link>
  );
};

export { TrainingCard };
