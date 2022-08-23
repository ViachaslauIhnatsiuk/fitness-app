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

  return {
    videoUrl,
    getVideoUrl
  };
};

export { useStorage };
