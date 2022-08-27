import { useState, useEffect, MutableRefObject } from 'react';

const useOnScreen = (ref: MutableRefObject<HTMLElement | null>, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const { current } = ref;

  useEffect(() => {
    const callback = ([entry]: IntersectionObserverEntry[]) => {
      setIntersecting(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(callback, { rootMargin });

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [current, ref, rootMargin]);

  return isIntersecting;
};

export { useOnScreen };
