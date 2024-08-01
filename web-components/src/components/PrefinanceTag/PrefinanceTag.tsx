import { PREFINANCE } from '../cards/ProjectCard/ProjectCard.constants';
import { PrefinanceIcon } from '../icons/PrefinanceIcon';
import { Label } from '../typography';

export const PrefinanceTag = ({
  classNames = {
    root: 'bg-purple-gradient rounded-r-[5px] flex items-center justify-center px-10 sm:py-10 py-[3px] text-grey-0 absolute top-30 sm:top-50 left-0',
    label: 'sm:text-[11px] pl-10 font-extrabold uppercase',
  },
}: {
  classNames?: { root?: string; label?: string };
}) => (
  <div className={classNames.root}>
    <PrefinanceIcon width="24" height="24" />
    <Label className={classNames.label} component="span" size="xxs">
      {PREFINANCE}
    </Label>
  </div>
);
