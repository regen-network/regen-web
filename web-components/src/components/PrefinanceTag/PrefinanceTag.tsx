import { cn } from 'web-components/src/utils/styles/cn';

import { ColorScheme } from '../../theme/theme.types';
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
  colorScheme = 'regen',
}: {
  bodyTexts: Pick<ProjectCardBodyTextsMapping, 'prefinance'>;
  classNames?: { root?: string; label?: string };
  iconSize?: {
    width: string;
    height: string;
  };
  colorScheme?: ColorScheme;
}) => (
  <div
    className={cn(
      'rounded-r-[5px] flex items-center justify-center px-10 py-[3px] text-grey-0 absolute top-30 left-0',
      colorScheme === 'regen' && 'bg-purple-gradient',
      colorScheme === 'terrasos' && 'bg-warning-400 text-bc-neutral-700',
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
