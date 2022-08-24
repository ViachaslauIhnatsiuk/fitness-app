import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IVideoTrainings, IVideo } from './models';

const TrainingVideos: FC = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/data/videos.json');
      const { videos: videosData } = (await response.json()) as IVideoTrainings;
      setVideos(videosData);
    })().catch(() => {});
  }, []);

  return (
    <>
      {videos.map(({ title }) => {
        return (
          <div key={uuidv4()}>
            <h2>{title}</h2>
            <video width="100%" height="300" controls poster={preview} preload="metadata">
              <track kind="captions" />
              <source src={video} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
              Тег video не поддерживается вашим браузером.
              <a href={video}>Скачайте видео</a>.
            </video>
          </div>
        );
      })}
    </>
  );
};

export { TrainingVideos };
