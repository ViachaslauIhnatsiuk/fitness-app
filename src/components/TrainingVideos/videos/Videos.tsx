import React, { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { VideoCard } from '../videoCard/VideoCard';
import { useAppDispatch } from '../../../store/store';
import { fetchTrainingVideos } from '../../../store/slices/videoTraining/videoTraining';
import { useAppSelector } from '../../../store/model';
import { selectVideos } from '../../../store/selectors';
import { WorkoutStatus } from '../../../models/Workout';
import Loader from '../../UI/loader/Loader';
import { useVideo } from '../../../hooks/useVideo';
import s from './Videos.module.css';

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
      <div className={s.main}>
        <Link className={s.return} to="/workout/videos">
          <BsArrowLeft className={s.icon} />
        </Link>
        <h2 className={s.title}>{videoCategory}</h2>
        {status === WorkoutStatus.loading && <Loader />}
        {status === WorkoutStatus.resolved && videoCategory && (
          <div className={s.cards}>
            {filteredVideos.map(({ title, id }) => {
              return <VideoCard key={uuidv4()} title={title} id={id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export { Videos };
