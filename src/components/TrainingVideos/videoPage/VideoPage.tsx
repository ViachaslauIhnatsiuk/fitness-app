import React, { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import s from './VideoPage.module.css';
import { useStorage } from '../../../hooks/useStorage';
import { VideoPlayer } from '../../UI/videoPlayer/VideoPlayer';
import { convertTitleVideoCard } from '../utils';
import { VideoTable } from '../videoTable/VideoTable';
import { Button } from '../../UI/button/Button';
import Loader from '../../UI/loader/Loader';
import { useVideo } from '../../../hooks/useVideo';
import { WorkoutPath } from '../../../models/Workout';
import { convertToArrayByValue } from './utils';

const VideoPage: FC = () => {
  const { videoId } = useParams();
  const { getVideoPreviewUrl, getVideoUrl, videoPreviewUrl, videoUrl } = useStorage();
  const { getVideoById, isLoading, video } = useVideo();

  useEffect(() => {
    if (videoId) getVideoById(videoId).catch((err: Error) => err);
  }, [getVideoById, videoId]);

  useEffect(
    function setVideoAssets(): void {
      (async () => {
        if (video) {
          const { category, title } = video;
          await getVideoPreviewUrl(title);
          await getVideoUrl(category, title);
        }
      })().catch((err: Error) => err);
    },
    [getVideoPreviewUrl, getVideoUrl, video]
  );

  return (
    <div className={s.wrapper}>
      <Button
        path={`${WorkoutPath.videoTrainings}/${video?.category as string}`}
        icon={<IoChevronBackCircleOutline />}
      />
      <div className={s.info}>
        {isLoading ? (
          <Loader />
        ) : (
          video && (
            <>
              <h2 className={s.title}>{convertTitleVideoCard(video.title)}</h2>
              <VideoPlayer previewUrl={videoPreviewUrl} videoUrl={videoUrl} />
              <VideoTable videoDetails={video.details} />
              <p className={s.subtitle}>Instruction</p>
              <ul className={s.description}>
                {convertToArrayByValue(video.details.description, 'Step:').map((step) => {
                  return <li key={uuidv4()}>{step}</li>;
                })}
              </ul>
            </>
          )
        )}
      </div>
    </div>
  );
};

export { VideoPage };
