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
};
export const PrevNextButtons = ({
  onPrev,
  onSave,
  saveDisabled,
  saveText,
}: Props) => {
  const { classes } = useStyles();
  return (
    <>
      {onPrev && (
        <OutlinedButton
          className={cn(classes.btn, 'mr-10 sm:mr-20')}
          onClick={onPrev}
        >
          <ArrowDownIcon
            fontSize="small"
            direction="prev"
            // color={theme.palette.secondary.main}
          />
        </OutlinedButton>
      )}
      <ContainedButton
        type="submit"
        className={classes.btn}
        onClick={onSave}
        disabled={saveDisabled}
      >
        {saveText}
      </ContainedButton>
    </>
  );
};
