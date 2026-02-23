import { cn } from '../../../../utils/styles/cn';
import { Body } from '../../../typography';

type Props = {
  label: string;
  icon: JSX.Element;
  className?: string;
  labelClassName?: string;
};

const Tag = ({ label, icon, className, labelClassName }: Props) => (
  <div
    className={cn(
      'inline-flex items-center justify-center z-10 p-[4px] rounded-[3px] bg-warning-400',
      className,
    )}
  >
    {icon}
    <Body
      className={cn('ml-[3px] text-grey-700 font-bold', labelClassName)}
      size="sm"
    >
      {label}
    </Body>
  </div>
);

export { Tag };
