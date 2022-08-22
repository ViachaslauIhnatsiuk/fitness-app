import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IVideo } from './models';

const VideoTrainings: FC = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/data/videos.json');
      const data = (await response.json()) as IVideo[];
      setVideos(data);
    })().catch(() => {});
  }, []);

  return (
    <>
      {videos.map(({ poster, title, video }) => {
        return (
          <div key={uuidv4()}>
            <h2>{title}</h2>
            <video width="100%" height="300" controls poster={poster} preload="metadata">
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

export { VideoTrainings };
