import React, { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import s from './Videos.module.css';
import { VideoCard } from '../videoCard/videoCard';
import { useAppDispatch } from '../../../store/store';
import { fetchTrainingVideos } from '../../../store/slices/videoTraining/videoTraining';
import { useAppSelector } from '../../../store/model';
import { selectVideos } from '../../../store/selectors';
import { WorkoutStatus } from '../../../models/Workout';
import Loader from '../../UI/loader/Loader';
import { useVideo } from '../../../hooks/useVideo';

const Videos: FC = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectVideos);
  const { videoCategory } = useParams();
  const { getVideosByCategory } = useVideo();

  useEffect(() => {
    dispatch(fetchTrainingVideos()).catch((error: Error) => error);
  }, [dispatch]);

  const filteredVideos = getVideosByCategory(videoCategory as string);

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Videos by {videoCategory} category</h2>
      {status === WorkoutStatus.loading && <Loader />}
      {status === WorkoutStatus.resolved && (
        <div className={s.cards}>
          {filteredVideos.map(({ title, id }) => {
            return <VideoCard key={uuidv4()} title={title} id={id} />;
          })}
        </div>
      )}
    </div>
  );
};

export { Videos };
