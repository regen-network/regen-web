import { cn } from '../../../utils/styles/cn';
import ContainedButton from '../../buttons/ContainedButton';
import OutlinedButton from '../../buttons/OutlinedButton';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import { useStyles } from './PrevNextButtons.styles';

type Props = {
  onPrev?: () => void;
  onSave?: () => void;
  saveDisabled: boolean;
  saveText: string;
  className?: string;
};
export const PrevNextButtons = ({
  onPrev,
  onSave,
  saveDisabled,
  saveText,
  className,
}: Props) => {
  const { classes } = useStyles();
  return (
    <div className={className}>
      {onPrev && (
        <OutlinedButton
          className={cn(
            classes.btn,
            'mr-10 sm:mr-20 h-50 sm:h-60 w-50 sm:w-60',
          )}
          onClick={onPrev}
        >
          <ArrowDownIcon
            fontSize="small"
            direction="prev"
            className="w-[24px] h-[24px]"
          />
        </OutlinedButton>
      )}
      <ContainedButton
        type="submit"
        className={cn(
          classes.btn,
          '!py-[13px] sm:!py-[17px] !px-[30px] sm:!px-[43px] h-50 sm:h-60',
        )}
        onClick={onSave}
        disabled={saveDisabled}
      >
        {saveText}
      </ContainedButton>
    </div>
  );
};
