import { useMemo } from 'react';
import { Box, SxProps, useTheme } from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import { Body } from '../typography';
import { InfoLabelVariant } from './InfoLabel.types';
import { getInfoLabelColorMapping } from './InfoLabel.utils';

export interface Props {
  label: string;
  variant?: InfoLabelVariant;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
  labelClassName?: string;
  wrapperClassName?: string;
}

const InfoLabel = ({
  label,
  variant = 'default',
  icon,
  sx = [],
  labelClassName,
  wrapperClassName,
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
      className={wrapperClassName}
    >
      {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
      <Body
        sx={{
          color: 'primary.light',
        }}
        className={labelClassName}
      >
        {label}
      </Body>
    </Box>
  );
};

export { InfoLabel };
