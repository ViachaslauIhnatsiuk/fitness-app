import { useState } from 'react';
import { storage, ref, getDownloadURL } from '../firebase/firebase';

const useStorage = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');

  const getVideoUrl = async (category: string, name: string): Promise<void> => {
    const url = await getDownloadURL(
      ref(storage, `exercises_video/${category}/${name}.mp4`)
    ).catch();
    setVideoUrl(url);
  };

  const getTrainingPreviewUrl = async (name: string): Promise<string> => {
    const convertedName = name.toLowerCase().split(' ').join('_');
    const url = await getDownloadURL(
      ref(storage, `exercises_preview/${convertedName}.jpg`)
    ).catch();
    return url;
  };

  return {
    videoUrl,
    getVideoUrl,
    getTrainingPreviewUrl
  };
};

export { useStorage };
