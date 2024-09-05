import { useState } from 'react';
import ReactPlayer from 'react-player/es6';
import { PauseButton } from 'web-components/src/components/atoms/PauseButton/PauseButton';

import { PlayButton } from '../../../atoms/PlayButton/PlayButton';

export const VideoPreview = ({ url }: { url: string }) => {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="relative h-full">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        controls={false}
        onEnded={() => setPlaying(false)}
      />
      <div
        className={`z-50 absolute top-0 left-0 w-full h-full flex justify-center items-center ${
          playing ? 'transition-opacity duration-500 opacity-0' : ''
        } ${playing && hovered ? 'hover:opacity-100' : ''}`}
        onMouseEnter={playing ? handleMouseEnter : undefined}
        onMouseLeave={playing ? handleMouseLeave : undefined}
      >
        <button
          onClick={handlePlayPause}
          className="outline-none cursor-pointer bg-transparent border-none"
        >
          {playing ? (
            <PauseButton className="w-50 h-50" />
          ) : (
            <PlayButton className="w-50 h-50" />
          )}
        </button>
      </div>
    </div>
  );
};
