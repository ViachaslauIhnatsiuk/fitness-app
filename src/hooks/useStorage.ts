import { useCallback, useState } from 'react';
import { storage, ref, getDownloadURL } from '../firebase/firebase';

const useStorage = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [trainingPreviewUrl, setTrainingPreviewUrl] = useState<string>('');
  const [exerciseGifUrl, setExerciseGifUrl] = useState<string>('');

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
    setTrainingPreviewUrl(url);
  };

  const getExerciseGifUrl = useCallback(async (name: string): Promise<void> => {
    const url = await getDownloadURL(ref(storage, `exercises_gif/${name}.gif`)).catch();
    setExerciseGifUrl(url);
  }, []);

  return {
    videoUrl,
    trainingPreviewUrl,
    exerciseGifUrl,
    getVideoUrl,
    getTrainingPreviewUrl,
    getExerciseGifUrl
  };
};

export { useStorage };
