import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BsArrowLeft, BsBookmarkDash, BsBookmarkDashFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { useStorage } from '../../../hooks/useStorage';
import { VideoPlayer } from '../../UI/videoPlayer/VideoPlayer';
import { calculateCalories, calculateTime, convertTitleVideoCard } from '../utils';
import { VideoTable } from '../videoTable/VideoTable';
import Loader from '../../UI/loader/Loader';
import { useVideo } from '../../../hooks/useVideo';
import { WorkoutPath } from '../../../models/Workout';
import { convertToArrayByValue } from './utils';
import { useAppDispatch } from '../../../store/store';
import {
  setCalorieExpenditure,
  setDailyTimeTrainings,
  setTotalTimeTrainings,
  setTotalTrainings,
  setVideoTrainingToFavorites
} from '../../../store/slices/profileSlice';
import { Radio } from '../../UI/radio/Radio';
import s from './VideoPage.module.css';
import { useAppSelector } from '../../../store/model';
import { selectProfile } from '../../../store/selectors';

const VideoPage: FC = () => {
  const { videoId } = useParams();
  const dispatch = useAppDispatch();
  const { getVideoPreviewUrl, getVideoUrl, videoPreviewUrl, videoUrl } = useStorage();
  const { getVideoById, isLoading, video } = useVideo();
  const {
    currentUser: {
      favorite: { videoTrainings }
    }
  } = useAppSelector(selectProfile);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [sets, setSets] = useState<number>(3);
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (videoId) getVideoById(videoId).catch((err: Error) => err);
  }, [getVideoById, videoId]);

  useEffect(
    function setVideoAssets() {
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

  useEffect(
    function changeStateIsFavorite() {
      const state = videoTrainings.includes(Number(videoId));
      setIsFavorite(state);
    },
    [videoId, videoTrainings]
  );

  const addToFavoriteHandler = () => {
    if (video) dispatch(setVideoTrainingToFavorites(video.id));
  };

  const setCaloriesHandler = () => {
    if (video) {
      const {
        details: { cal, reps }
      } = video;

      const totalCalories = calculateCalories(sets, cal);
      const resultTime = calculateTime(sets, reps);

      dispatch(setCalorieExpenditure(totalCalories));
      dispatch(setTotalTimeTrainings(resultTime));
      dispatch(setDailyTimeTrainings(resultTime));
      dispatch(setTotalTrainings(1));
    }
    setButtonSubmit(true);
    setTimeout(() => setButtonSubmit(false), 4000);
  };

  const changeNumberOfSetsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSets(Number(value));
  };

  return (
    <div className={s.wrapper}>
      <div className={s.main}>
        <Link
          className={s.return}
          to={`${WorkoutPath.videoTrainings}/${video?.category as string}`}
        >
          <BsArrowLeft className={s.icon} />
        </Link>
        {isFavorite ? (
          <BsBookmarkDashFill onClick={addToFavoriteHandler} className={s.bookmark} />
        ) : (
          <BsBookmarkDash onClick={addToFavoriteHandler} className={s.bookmark} />
        )}
        <div className={s.info}>
          {isLoading ? (
            <Loader />
          ) : (
            video && (
              <>
                <h2 className={s.title}>{convertTitleVideoCard(video.title)}</h2>
                <div className={s.main_top}>
                  <VideoPlayer previewUrl={videoPreviewUrl} videoUrl={videoUrl} />
                  <div className={s.instructions}>
                    <p className={s.subtitle}>Instruction</p>
                    <ul className={s.description}>
                      {convertToArrayByValue(video.details.description, 'Step:').map((step) => {
                        return (
                          <li key={uuidv4()} className={s.paragraph}>
                            {step}
                          </li>
                        );
                      })}
                    </ul>
                    <div className={s.form}>
                      <p className={s.sets}>Sets done</p>
                      {video.details.levels.map((level) => (
                        <Radio
                          key={level}
                          name="numberOfSets"
                          value={String(level)}
                          onChange={changeNumberOfSetsHandler}
                          state={String(sets)}
                        />
                      ))}
                      <button
                        type="button"
                        onClick={setCaloriesHandler}
                        disabled={buttonSubmit}
                        className={s.button}
                        style={
                          buttonSubmit
                            ? { backgroundColor: '#35383f', boxShadow: 'none', cursor: 'default' }
                            : { backgroundColor: '#7755ff' }
                        }
                      >
                        {buttonSubmit ? 'Done' : 'Submit'}
                      </button>
                    </div>
                  </div>
                </div>
                <VideoTable videoDetails={video.details} />
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export { VideoPage };
