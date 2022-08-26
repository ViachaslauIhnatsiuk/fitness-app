import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { db } from '../firebase/firebase';
import { IVideo, IVideos } from '../models/Workout';
import { useAppSelector } from '../store/model';
import { selectVideos } from '../store/selectors';

const useVideo = () => {
  const { videos } = useAppSelector(selectVideos);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [video, setVideo] = useState<IVideo>();

  const getVideoById = useCallback(async (videoId: string): Promise<void> => {
    setIsLoading(true);
    const docRef = doc(db, 'videoTrainings', 'Videos');
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("You can't get this video!");

    const allVideos = docSnap.data() as IVideos;
    const videoById = allVideos[Number(videoId)];
    setVideo(videoById);
    setIsLoading(false);
  }, []);

  const getVideosByCategory = useCallback(
    (filterCategory: string): IVideo[] => {
      return [...videos].filter(({ category }) => category === filterCategory);
    },
    [videos]
  );

  return { isLoading, video, getVideoById, getVideosByCategory };
};

export { useVideo };
