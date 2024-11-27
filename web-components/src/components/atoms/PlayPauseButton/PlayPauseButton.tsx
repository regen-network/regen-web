import { cn } from '../../../utils/styles/cn';
import { PauseIcon } from '../../icons/PauseIcon';
import PlayIcon from '../../icons/PlayIcon';
import { usePlayPauseButtonStyles } from './PlayPauseButton.styles';

type Props = {
  className?: string;
  playing?: boolean;
  handlePlayPause?: () => void;
};

export const PlayPauseButton = ({
  className,
  playing = false,
  handlePlayPause,
}: Props) => {
  const { classes: styles } = usePlayPauseButtonStyles();
  return (
    <button
      onClick={handlePlayPause ? handlePlayPause : undefined}
      className="outline-none cursor-pointer bg-transparent border-none"
    >
      <div className={cn(styles.button, className)}>
        {playing ? (
          <PauseIcon
            width="100%"
            height="100%"
            className="text-ac-primary-500"
          />
        ) : (
          <PlayIcon width="50%" height="50%" className="text-ac-primary-500" />
        )}
      </div>
    </button>
  );
};
