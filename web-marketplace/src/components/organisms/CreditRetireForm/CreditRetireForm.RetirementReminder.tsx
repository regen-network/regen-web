import { SxProps } from '@mui/material';

import { Body } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

export const RetirementReminder = ({
  sx,
}: {
  sx?: SxProps<Theme>;
}): JSX.Element => {
  return (
    <Body size="lg" color="black" sx={sx}>
      Retirement is permanent and non-reversible.
    </Body>
  );
};
