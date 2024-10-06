import { cloneElement } from 'react';

import { ProjectTag } from '../../molecules/ProjectTag/ProjectTag';

interface TagFilterProps {
  icon: JSX.Element;
  name: string;
  isSelected: boolean;
  onClick?: () => void;
}

const tagSx = {
  cursor: 'pointer',
  boxShadow:
    // eslint-disable-next-line lingui/no-unlocalized-strings
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
}: TagFilterProps) {
  // add isSelected prop to icon
  const iconWithProps = cloneElement(icon, { isSelected });
  return (
    <ProjectTag
      sx={tagSx}
      tag={{
        name,
        icon: iconWithProps,
      }}
      onClick={onClick}
    />
  );
}
