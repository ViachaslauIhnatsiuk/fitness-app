import { useCallback, useState } from 'react';
import { storage, ref, getDownloadURL } from '../firebase/firebase';

const useStorage = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [trainingImageUrl, setTrainingImageUrl] = useState<string>('');
  const [exerciseGifUrl, setExerciseGifUrl] = useState<string>('');
  const [categoryImageUrl, setCategoryImageUrl] = useState<string>('');

  const getVideoUrl = async (category: string, name: string): Promise<void> => {
    const url = await getDownloadURL(
      ref(storage, `exercises_video/${category}/${name}.mp4`)
    ).catch();
    setVideoUrl(url);
  };

  const getTrainingPreviewUrl = async (name: string): Promise<void> => {
    const convertedName = name.toLowerCase().split(' ').join('_');
    const url = await getDownloadURL(
      ref(storage, `exercises_preview/${convertedName}.jpg`)
    ).catch();
    setTrainingImageUrl(url);
  };

  const getExerciseGifUrl = useCallback(async (name: string): Promise<void> => {
    const url = await getDownloadURL(ref(storage, `exercises_gif/${name}.gif`)).catch();
    setExerciseGifUrl(url);
  }, []);

  const getCategoryImageUrl = async (name: string): Promise<void> => {
    const url = await getDownloadURL(ref(storage, `categories_preview/${name}.jpg`)).catch();
    setCategoryImageUrl(url);
  };

  return {
    videoUrl,
    trainingImageUrl,
    exerciseGifUrl,
    categoryImageUrl,
    getVideoUrl,
    getTrainingPreviewUrl,
    getExerciseGifUrl,
    getCategoryImageUrl
  };
};

export { useStorage };
