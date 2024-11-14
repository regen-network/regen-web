import { cloneElement } from 'react';
import { SxProps } from '@mui/system';

import { Theme } from '../../../theme/muiTheme';
import { ProjectTag } from '../../molecules/ProjectTag/ProjectTag';

interface TagFilterProps {
  icon: JSX.Element;
  name: string;
  isSelected: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const tagSx = {
  cursor: 'pointer',
  boxShadow:
    '0px 2px 2px 0px var(--tag-filter-outer-shadow, rgba(0, 0, 0, 0.20))',
  '&:hover': {
    filter: 'brightness(0.9)',
  },
};

export default function TagFilter({
  icon,
  name,
  isSelected,
  onClick,
  sx = {},
}: TagFilterProps) {
  // add isSelected prop to icon
  const iconWithProps = cloneElement(icon, { isSelected });
  return (
    <ProjectTag
      sx={{
        ...tagSx,
        border: isSelected
          ? '1px solid rgba(var(--sc-tag-filter-stroke-selected))'
          : '1px solid rgba(var(--sc-tag-filter-stroke-unselected))',
        boxShadow: `0 1px 1px 1px rgba(0, 0, 0, 0.20) ${
          isSelected ? 'inset' : ''
        }`,
        ...sx,
      }}
      fontSize={12}
      tag={{
        name,
        icon: iconWithProps,
      }}
      onClick={onClick}
    />
  );
}
