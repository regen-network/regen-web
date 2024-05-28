import { cn } from '../../../utils/styles/cn';
import PlayIcon from '../../icons/PlayIcon';
import { usePlayButtonStyles } from './PlayButton.styles';

type Props = { className?: string };

const PlayButton = ({ className }: Props) => {
  const { classes: styles } = usePlayButtonStyles();
  return (
    <div className={cn(styles.play, className)}>
      <PlayIcon width="50%" height="50%" />
    </div>
  );
};

export { PlayButton };
