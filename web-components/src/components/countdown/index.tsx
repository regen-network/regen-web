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
      renderer={({ days, hours, minutes, seconds }) => {
        const count = [days, hours, minutes, seconds].map(padN).join(':');
        return <>{count}</>;
      }}
    />
  );
};

export default Countdown;
