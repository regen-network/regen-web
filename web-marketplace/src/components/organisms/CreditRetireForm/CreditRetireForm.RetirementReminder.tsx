import { SxProps } from '@mui/material';

import { Body } from 'web-components/lib/components/typography';
import { Theme } from 'web-components/lib/theme/muiTheme';

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
