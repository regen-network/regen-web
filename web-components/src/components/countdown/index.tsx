import React from 'react';
import ReactCountdown from 'react-countdown';

type Props = {
  date: string;
};

const Countdown: React.FC<Props> = p => {
  const padN = (n: number): string => (n < 10 ? `0${n}` : n.toString());
  return (
    <ReactCountdown
      date={new Date(p.date)}
      renderer={({ days, hours, minutes, seconds }: any) => {
        return <>{`${padN(days)}:${padN(hours)}:${padN(minutes)}:${padN(seconds)}`}</>;
      }}
    />
  );
};

export default Countdown;
