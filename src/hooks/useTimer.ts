import { useState, useRef, useEffect, useCallback } from 'react';

const useTimer = (totalDuration: number) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(totalDuration);
  const [isPause, setIsPause] = useState<boolean>(false);
  const [resume, setResume] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timer>();

  const start = useCallback(() => {
    timerRef.current = setInterval(() => {
      setSeconds((state) => state - 0.01);
    }, 10);
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setSeconds(totalDuration);
  }, [setIsRunning, setSeconds, totalDuration]);

  const pause = () => {
    if (isPause) {
      setSeconds(resume);
      setIsPause(false);
      setResume(0);
      start();
    } else {
      setResume(seconds);
      setIsPause(true);
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (seconds <= 0) {
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
    pause,
    seconds,
    setSeconds
  };
};

export { useTimer };
