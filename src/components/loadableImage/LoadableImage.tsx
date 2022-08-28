import React, { FC, useEffect, useRef, useState } from 'react';
import { useOnScreen } from '../../hooks/useOnScreen';
import s from './LoadableImage.module.css';
import { LoadableImageProps } from './models';

const LoadableImage: FC<LoadableImageProps> = ({ src, alt = '', onLoad = () => {} }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(containerRef);

  useEffect(() => {
    if (!isVisible || isLoaded) {
      return;
    }

    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsLoaded(true);
        onLoad();
      };
    }
  }, [isVisible, onLoad, isLoaded]);

  return (
    <div
      ref={containerRef}
      className={isLoaded ? [s.wrapper, s.wrapperLoaded].join(' ') : s.wrapper}
    >
      {(isVisible || isLoaded) && (
        <img
          ref={imageRef}
          className={isLoaded ? [s.image, s.imageLoaded].join(' ') : s.image}
          src={src}
          alt={alt}
        />
      )}
    </div>
  );
};

export { LoadableImage };
