import * as React from 'react';
<<<<<<< HEAD
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import PrevNextButton from 'web-components/lib/components/buttons/PrevNextButton';
import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ContainedButton, { ContainedColorVariant } from './ContainedButton';
import { Box } from '@mui/material';
=======
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box } from '@mui/material';

import { FlexCol } from '../box';
import ContainedButton, { ContainedColorVariant } from './ContainedButton';
import { EditButton } from './EditButton';
import { ExpandButton } from './ExpandButton';
import OutlinedButton from './OutlinedButton';
import PrevNextButton from './PrevNextButton';
import { TableActionButtons } from './TableActionButtons';
import { TextButton } from './TextButton';
>>>>>>> 92528156 (David/eslint simple import sort (#1075))

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
