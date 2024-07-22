import { PREFINANCE } from '../cards/ProjectCard/ProjectCard.constants';
import { PrefinanceIcon } from '../icons/PrefinanceIcon';
import { Label } from '../typography';

export const PrefinanceTag = ({
  wrapperClassName = 'bg-purple-gradient rounded-r-[5px] flex items-center justify-center px-10 sm:py-10 py-[3px] text-grey-0 absolute top-30 sm:top-50 left-0',
  labelClassname = 'sm:text-[11px] pl-10 font-extrabold uppercase',
}: {
  wrapperClassName?: string;
  labelClassname?: string;
}) => (
  <div className={wrapperClassName}>
    <PrefinanceIcon width="24" height="24" />
    <Label className={labelClassname} component="span" size="xxs">
      {PREFINANCE}
    </Label>
  </div>
);
