import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box } from '@mui/material';

import * as React from 'react';
import OutlinedButton from './OutlinedButton';
import PrevNextButton from './PrevNextButton';
import ContainedButton, { ContainedColorVariant } from './ContainedButton';
import { TableActionButtons } from './TableActionButtons';
import { ExpandButton } from './ExpandButton';

export default {
  title: 'Buttons',
  component: OutlinedButton,
};

export const outlinedButton = (): JSX.Element => (
  <OutlinedButton startIcon={<ArrowDownwardIcon />}>read more</OutlinedButton>
);

export const containedButton = (): JSX.Element => {
  const colorVariants: ContainedColorVariant[] = [
    'secondary',
    'gradientBlueGreen',
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {colorVariants.map(colorVariant => (
        <Box
          key={colorVariant}
          sx={{ mr: '8px', display: 'flex', flexDirection: 'column' }}
        >
          <ContainedButton colorVariant={colorVariant} sx={{ mb: '8px' }}>
            Contained
          </ContainedButton>
          <ContainedButton colorVariant={colorVariant} disabled>
            Disabled
          </ContainedButton>
        </Box>
      ))}
    </Box>
  );
};

export const nextButton = (): JSX.Element => (
  <PrevNextButton direction="next" />
);

export const prevButton = (): JSX.Element => (
  <PrevNextButton direction="prev" />
);

export const tableActionButtons = (): JSX.Element => (
  <>
    <h3>(Adjust size to see responsive styles)</h3>
    <TableActionButtons
      buttons={[
        { label: 'one', onClick: () => alert('clicked one') },
        { label: 'two', onClick: () => alert('clicked two') },
        { label: 'three', onClick: () => alert('clicked three') },
      ]}
    />
  </>
);

export const expandButton = (): JSX.Element => (
  <>
    <ExpandButton onClick={() => {}} expanded={false} />
    <ExpandButton onClick={() => {}} expanded={true} />
  </>
);
