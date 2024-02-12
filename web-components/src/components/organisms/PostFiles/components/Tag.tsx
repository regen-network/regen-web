import { cn } from '../../../../utils/styles/cn';
import { Body } from '../../../typography';

type Props = {
  label: string;
  icon: JSX.Element;
  className?: string;
};

const Tag = ({ label, icon, className }: Props) => (
  <div
    className={cn(
      className,
      'flex items-center justify-center z-10 p-[4px] top-20 left-20 absolute rounded-[3px] bg-warning-400',
    )}
  >
    {icon}
    <Body className="ml-[3px] text-grey-700 font-bold" size="sm">
      {label}
    </Body>
  </div>
);

export { Tag };
