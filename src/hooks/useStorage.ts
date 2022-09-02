import { useCallback, useState } from 'react';
import { storage, ref, getDownloadURL } from '../firebase/firebase';
import { convertNameToFirebaseStyle } from '../helpers/convertNameToFirebaseStyle';

const useStorage = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [trainingImageUrl, setTrainingImageUrl] = useState<string>('');
  const [exerciseGifUrl, setExerciseGifUrl] = useState<string>('');
  const [categoryImageUrl, setCategoryImageUrl] = useState<string>('');

  const getVideoUrl = useCallback(async (category: string, name: string): Promise<void> => {
    const url = await getDownloadURL(
      ref(storage, `exercises_video/${category}/${name}.mp4`)
    ).catch();
    setVideoUrl(url);
  }, []);

  const getVideoPreviewUrl = useCallback(async (name: string): Promise<void> => {
    const url = await getDownloadURL(ref(storage, `videos_preview/${name}.jpg`)).catch();
    setVideoPreviewUrl(url);
  }, []);

  const getTrainingPreviewUrl = useCallback(async (name: string): Promise<void> => {
    const convertedName = convertNameToFirebaseStyle(name);

    const url = await getDownloadURL(
      ref(storage, `exercises_preview/${convertedName}.jpg`)
    ).catch();
    setTrainingImageUrl(url);
  }, []);

  const getExerciseGifUrl = useCallback(async (name: string): Promise<void> => {
    const url = await getDownloadURL(ref(storage, `exercises_gif/${name}.gif`)).catch();
    setExerciseGifUrl(url);
  }, []);

  const getCategoryImageUrl = useCallback(async (name: string): Promise<void> => {
    const url = await getDownloadURL(ref(storage, `categories_preview/${name}.jpg`)).catch();
    setCategoryImageUrl(url);
  }, []);

  return {
    videoUrl,
    trainingImageUrl,
    exerciseGifUrl,
    categoryImageUrl,
    videoPreviewUrl,
    getVideoUrl,
    getTrainingPreviewUrl,
    getExerciseGifUrl,
    getCategoryImageUrl,
    getVideoPreviewUrl,
    setExerciseGifUrl
  };
};

export { useStorage };
