import { useState, useRef, useEffect, useCallback } from 'react';

const useTimer = (totalDuration: number) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(totalDuration);
  const [isPause, setIsPause] = useState<boolean>(false);
  const [resume, setResume] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timer>();

  const start = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCounter((state) => state - 0.01);
    }, 10);
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setCounter(totalDuration);
  }, [setIsRunning, setCounter, totalDuration]);

  const pause = () => {
    if (isPause) {
      setCounter(resume);
      setIsPause(false);
      setResume(0);
      start();
    } else {
      setResume(counter);
      setIsPause(true);
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (counter <= 0) {
      stop();
    }
  }, [counter, stop]);

  useEffect(() => {
    return () => timerRef && clearInterval(timerRef.current);
  }, []);

  return {
    isRunning,
    start,
    stop,
    pause,
    counter,
    setCounter
  };
};

export { useTimer };
