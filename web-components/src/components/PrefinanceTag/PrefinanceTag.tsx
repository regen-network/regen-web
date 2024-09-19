import { cn } from 'web-components/src/utils/styles/cn';

import { ProjectCardBodyTextsMapping } from '../cards/ProjectCard/ProjectCard.types';
import { PrefinanceIcon } from '../icons/PrefinanceIcon';
import { Label } from '../typography';

export const PrefinanceTag = ({
  bodyTexts,
  classNames = {
    root: '',
    label: '',
  },
  iconSize = {
    width: '18',
    height: '19',
  },
}: {
  bodyTexts: ProjectCardBodyTextsMapping;
  classNames?: { root?: string; label?: string };
  iconSize?: {
    width: string;
    height: string;
  };
}) => (
  <div
    className={cn(
      'bg-purple-gradient rounded-r-[5px] flex items-center justify-center px-10 py-[3px] text-grey-0 absolute top-30 left-0',
      classNames.root,
    )}
  >
    <PrefinanceIcon width={iconSize.width} height={iconSize.height} />
    <Label
      className={cn('pl-10 font-extrabold uppercase', classNames.label)}
      component="span"
      size="xxs"
    >
      {bodyTexts.prefinance}
    </Label>
  </div>
);
