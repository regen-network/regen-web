import { cn } from 'web-components/src/utils/styles/cn';

import { PREFINANCE } from '../cards/ProjectCard/ProjectCard.constants';
import { PrefinanceIcon } from '../icons/PrefinanceIcon';
import { Label } from '../typography';

export const PrefinanceTag = ({
  classNames = {
    root: '',
    label: '',
  },
}: {
  classNames?: { root?: string; label?: string };
}) => (
  <div
    className={cn(
      'bg-purple-gradient rounded-r-[5px] flex items-center justify-center px-10 py-[3px] text-grey-0 absolute left-0 top-30 sm:top-50',
      classNames.root,
    )}
  >
    <PrefinanceIcon width="24" height="24" />
    <Label
      className={cn(
        'sm:text-[11px] pl-10 font-extrabold uppercase',
        classNames.label,
      )}
      component="span"
      size="xxs"
    >
      {PREFINANCE}
    </Label>
  </div>
);
