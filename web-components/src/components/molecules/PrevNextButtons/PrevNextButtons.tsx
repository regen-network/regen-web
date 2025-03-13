import ContainedButton from '../../buttons/ContainedButton';
import OutlinedButton from '../../buttons/OutlinedButton';
import ArrowDownIcon from '../../icons/ArrowDownIcon';

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
  return (
    <div className={className}>
      {onPrev && (
        <OutlinedButton
          className="mr-10 sm:mr-20 h-50 sm:h-60 w-50 sm:w-60 text-xs sm:text-lg min-w-0"
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
        className="py-[13px] sm:py-[17px] px-[30px] sm:px-[43px] h-50 sm:h-60 text-xs sm:text-lg min-w-0"
        onClick={onSave}
        disabled={saveDisabled}
      >
        {saveText}
      </ContainedButton>
    </div>
  );
};
