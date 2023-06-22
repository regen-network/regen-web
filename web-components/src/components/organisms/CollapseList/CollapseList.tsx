import { useState } from 'react';
import { Collapse } from '@mui/material';

import { TextButton } from '../../buttons/TextButton';
import { LabelSize } from '../../typography/sizing';
import { SEE_LESS, SEE_MORE } from './CollapseList.constants';

type Props = {
  items: JSX.Element[];
  max?: number;
  buttonTextSize?: LabelSize;
};

export const CollapseList = ({
  items,
  max = 3,
  buttonTextSize = 'xs',
}: Props): JSX.Element | null => {
  const [expanded, setExpanded] = useState<boolean>(false);

  if (items.length === 0) {
    return null;
  }
  if (items.length <= max) {
    return <>{items.map(item => item)}</>;
  }

  const alwaysVisible = items.slice(0, max);
  const underCollapse = items.slice(max);

  return (
    <>
      {alwaysVisible.map(item => item)}
      <Collapse in={expanded}>{underCollapse.map(item => item)}</Collapse>
      <TextButton
        textSize={buttonTextSize}
        onClick={() => setExpanded(!expanded)}
        sx={{
          px: [0],
          ':hover': { bgcolor: 'transparent !important' },
        }}
      >
        {expanded ? SEE_LESS : SEE_MORE}
      </TextButton>
    </>
  );
};
