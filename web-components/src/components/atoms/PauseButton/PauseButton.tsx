import { cn } from '../../../utils/styles/cn';
import PauseIcon from '../../icons/PauseIcon';
import { usePauseButtonStyles } from './PauseButton.styles';

type Props = { className?: string };

const PauseButton = ({ className }: Props) => {
  const { classes: styles } = usePauseButtonStyles();
  return (
    <div className={cn(styles.pause, className)}>
      <PauseIcon />
    </div>
  );
};

export { PauseButton };
