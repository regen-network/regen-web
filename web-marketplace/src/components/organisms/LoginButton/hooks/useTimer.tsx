import { useCallback, useEffect, useState } from 'react';

type Props = {
  duration: number;
};

export const useTimer = ({ duration }: Props) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerId !== null) return;

    const id = setInterval(() => {
      setTimeLeft(time => time - 1);
    }, 1000);

    setTimerId(id);
  };

  const stopTimer = useCallback(() => {
    if (timerId !== null) {
      clearInterval(timerId);
      setTimerId(null);
    }
  }, [timerId]);

  const resetTimer = useCallback(() => {
    stopTimer();
    setTimeLeft(duration);
  }, [duration, stopTimer]);

  useEffect(() => {
    return () => {
      if (timerId !== null) {
        clearInterval(timerId);
      }
    };
  }, [timerId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      resetTimer();
    }
  }, [resetTimer, timeLeft]);

  return {
    timeLeft: timerId !== null ? timeLeft : null,
    resetTimer,
    startTimer,
    stopTimer,
  };
};
