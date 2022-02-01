import React from 'react';
import ReactCountdown from 'react-countdown';

type Props = {
  date: string;
};

const Countdown: React.FC<Props> = props => {
  const padN = (n: number): string => (n < 10 ? `0${n}` : n.toString());
  return (
    <ReactCountdown
      date={new Date(props.date)}
      renderer={({ days, hours, minutes, seconds }: any) => {
        return (
          <>{`${padN(days)}:${padN(hours)}:${padN(minutes)}:${padN(
            seconds,
          )}`}</>
        );
      }}
    />
  );
};

export default Countdown;
