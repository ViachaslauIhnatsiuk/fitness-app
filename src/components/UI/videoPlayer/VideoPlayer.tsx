import React, { FC } from 'react';
import { VideoPlayerProps } from './models';
import s from './VideoPlayer.module.css';

const VideoPlayer: FC<VideoPlayerProps> = ({ previewUrl, videoUrl }) => {
  return (
    <div className={s.wrapper}>
      <video className={s.video} controls poster={previewUrl} preload="none">
        <track kind="captions" />
        {videoUrl && <source src={videoUrl} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />}
        Тег video не поддерживается вашим браузером.
        {videoUrl && <a href={videoUrl}>Скачайте видео</a>}
      </video>
    </div>
  );
};

export { VideoPlayer };
