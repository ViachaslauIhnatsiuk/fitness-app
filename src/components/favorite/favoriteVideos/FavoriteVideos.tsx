import React, { FC, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { WorkoutStatus } from '../../../models/Workout';
import { useAppSelector } from '../../../store/model';
import { selectProfile, selectVideos } from '../../../store/selectors';
import { fetchFavoriteVideos } from '../../../store/slices/videoTraining/videoTraining';
import { useAppDispatch } from '../../../store/store';
import { VideoCard } from '../../TrainingVideos/videoCard/VideoCard';
import Loader from '../../UI/loader/Loader';
import s from './FavoriteVideos.module.css';

const FavoriteVideos: FC = () => {
  const dispatch = useAppDispatch();
  const { status, favorite: favoriteVideos } = useAppSelector(selectVideos);
  const {
    currentUser: { favorite }
  } = useAppSelector(selectProfile);

  useEffect(() => {
    const videoIds = favorite.videoTrainings;
    dispatch(fetchFavoriteVideos(videoIds)).catch((error: Error) => error);
  }, [dispatch, favorite.videoTrainings]);

  return (
    <div className={s.wrapper}>
      <Link className={s.return} to="/">
        <BsArrowLeft className={s.icon} />
      </Link>
      <h2 className={s.title}>Favorite Videos</h2>
      {status === WorkoutStatus.loading && <Loader />}
      {status === WorkoutStatus.resolved && (
        <div className={favoriteVideos.length ? s.videos : s.flex_videos}>
          {favoriteVideos.length === 0 && <h4>There is nothing here yet</h4>}
          {favoriteVideos.map(({ title, id, category }) => {
            return <VideoCard key={uuidv4()} title={title} id={id} videoCategory={category} />;
          })}
        </div>
      )}
    </div>
  );
};

export { FavoriteVideos };
