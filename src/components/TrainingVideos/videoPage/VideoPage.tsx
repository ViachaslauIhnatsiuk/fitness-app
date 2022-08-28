import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import s from './VideoPage.module.css';
import { useStorage } from '../../../hooks/useStorage';
import { VideoPlayer } from '../../UI/videoPlayer/VideoPlayer';
import { calculateCalories, convertTitleVideoCard } from '../utils';
import { VideoTable } from '../videoTable/VideoTable';
import { Button } from '../../UI/button/Button';
import Loader from '../../UI/loader/Loader';
import { useVideo } from '../../../hooks/useVideo';
import { WorkoutPath } from '../../../models/Workout';
import { convertToArrayByValue } from './utils';
import { useAppDispatch } from '../../../store/store';
import {
  setCalorieExpenditure,
  setVideoTrainingToFavorites
} from '../../../store/slices/profileSlice';
import { Radio } from '../../UI/radio/Radio';

const VideoPage: FC = () => {
  const { videoId } = useParams();
  const dispatch = useAppDispatch();
  const { getVideoPreviewUrl, getVideoUrl, videoPreviewUrl, videoUrl } = useStorage();
  const { getVideoById, isLoading, video } = useVideo();
  const [sets, setSets] = useState<number>(3);

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

  const addToFavoriteHandler = () => {
    if (video) dispatch(setVideoTrainingToFavorites(video.id));
  };

  const setCaloriesHandler = () => {
    if (video) {
      const {
        details: { cal }
      } = video;

      const calorieTotal = calculateCalories(sets, cal);
      dispatch(setCalorieExpenditure(calorieTotal));
    }
  };

  const changeNumberOfSetsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSets(Number(value));
  };

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
              <div className={s.header}>
                <h2 className={s.title}>{convertTitleVideoCard(video.title)}</h2>
                <Button onClick={addToFavoriteHandler} isStyled text="Add To Favorites" />
              </div>
              <VideoPlayer previewUrl={videoPreviewUrl} videoUrl={videoUrl} />
              <VideoTable videoDetails={video.details} />
              <p className={s.subtitle}>Instruction</p>
              <ul className={s.description}>
                {convertToArrayByValue(video.details.description, 'Step:').map((step) => {
                  return <li key={uuidv4()}>{step}</li>;
                })}
              </ul>
              <div className={s.form}>
                <p>Sets</p>
                {video.details.levels.map((level) => (
                  <Radio
                    key={level}
                    name="numberOfSets"
                    value={String(level)}
                    onChange={changeNumberOfSetsHandler}
                    state={String(sets)}
                  />
                ))}
                <Button onClick={setCaloriesHandler} isStyled text="Sumbit" />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export { VideoPage };
