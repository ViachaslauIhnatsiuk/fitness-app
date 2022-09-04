import { useCallback, useState } from 'react';
import { storage, ref, getDownloadURL } from '../firebase/firebase';

const useStorage = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [trainingImageUrl, setTrainingImageUrl] = useState<string>('');
  const [exerciseGifUrl, setExerciseGifUrl] = useState<string>('');

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
    const customTrainingPreview = '/images/custom.jpg';
    const url = await getDownloadURL(ref(storage, `exercises_preview/${name}.jpg`)).catch(() => {
      setTrainingImageUrl(customTrainingPreview);
    });

    if (url) {
      setTrainingImageUrl(url);
    }
  }, []);

  const getExerciseGifUrl = useCallback(async (name: string): Promise<void> => {
    const url = await getDownloadURL(ref(storage, `exercises_gif/${name}.gif`)).catch();
    setExerciseGifUrl(url);
  }, []);

  return {
    videoUrl,
    trainingImageUrl,
    exerciseGifUrl,
    videoPreviewUrl,
    getVideoUrl,
    getTrainingPreviewUrl,
    getExerciseGifUrl,
    getVideoPreviewUrl,
    setExerciseGifUrl
  };
};

export { useStorage };
