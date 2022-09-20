import { useMemo } from 'react';
import { Box, SxProps } from '@mui/material';
import { useTheme } from '@mui/styles';

import { Theme } from '../../theme/muiTheme';
import { Body } from '../typography';
import { InfoLabelVariant } from './InfoLabel.types';
import { getInfoLabelColorMapping } from './InfoLabel.utils';

export interface Props {
  label: string;
  variant?: InfoLabelVariant;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const InfoLabel = ({
  label,
  variant = 'default',
  icon,
  sx = [],
}: Props): JSX.Element => {
  const theme = useTheme();
  const infoLabelColorMapping = useMemo(
    () => getInfoLabelColorMapping({ theme }),
    [theme],
  );

  return (
    <Box
      sx={[
        {
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: '5px',
          backgroundColor: infoLabelColorMapping[variant],
          py: 2,
          px: 2.5,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
      <Body
        sx={{
          color: 'primary.light',
        }}
      >
        {label}
      </Body>
    </Box>
  );
};

export { InfoLabel };
