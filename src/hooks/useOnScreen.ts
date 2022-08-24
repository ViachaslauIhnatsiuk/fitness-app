import { useState, useEffect, MutableRefObject } from 'react';

const useOnScreen = (ref: MutableRefObject<HTMLElement | null>, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false);
  const { current } = ref;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin
      }
    );
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
