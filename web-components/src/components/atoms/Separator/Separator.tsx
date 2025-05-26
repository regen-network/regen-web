import { cn } from '../../../utils/styles/cn';

type Props = { className?: string };

const Separator = ({ className }: Props) => (
  <hr
    className={cn(className, 'border-0 border-t border-solid border-grey-300')}
  />
);
export { Separator };
