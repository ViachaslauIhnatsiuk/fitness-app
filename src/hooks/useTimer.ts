import { useState, useRef, useEffect, useCallback } from 'react';

const useTimer = (totalDuration: number) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(totalDuration);
  const timerRef = useRef<NodeJS.Timer>();

  const start = useCallback(() => {
    timerRef.current = setInterval(() => {
      setSeconds((state) => state - 1);
    }, 1000);
    setIsRunning(true);
  }, [setSeconds, setIsRunning]);

  const stop = useCallback(() => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setSeconds(totalDuration);
  }, [setIsRunning, setSeconds, totalDuration]);

  useEffect(() => {
    if (seconds < 1) {
      stop();
    }
  }, [seconds, stop]);

  useEffect(() => {
    return () => timerRef && clearInterval(timerRef.current);
  }, []);

  return {
    isRunning,
    start,
    stop,
    seconds,
    setSeconds
  };
};

export default useTimer;
