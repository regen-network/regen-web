import React from 'react';
import { Grid, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';

import { Body, Label } from 'web-components/lib/components/typography';
import { TextSize } from 'web-components/lib/components/typography/sizing';
import { formatDate } from 'web-components/lib/utils/format';

import { MetaDetailBaseValue } from './MetaDetail.BaseValue';
import { Value } from './MetaDetail.types';

export type Props = {
  sx?: SxProps<Theme>;
  label: string;
  data?: string | JSX.Element | number;
  value?: Value;
  rdfType?: string;
  labelColor?: string;
  bodySize?: TextSize;
};

const MetaDetail: React.FC<Props> = ({
  sx,
  label,
  data,
  value,
  rdfType,
  labelColor = 'primary.contrastText',
  bodySize = 'xl',
}) => {
  const isArray = Array.isArray(value);
  if (!value || (isArray && value.length === 0)) return null;
  return (
    <Grid item xs={12} tablet={4} sm={6}>
      <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
        <Label
          size="xs"
          sx={{
            fontSize: { xs: '12px' },
            color: labelColor,
            mb: 3,
          }}
        >
          {label}
        </Label>
        {isArray ? (
          value.map((v, i) => (
            <MetaDetailBaseValue
              key={i}
              value={v}
              rdfType={rdfType}
              bodySize={bodySize}
            />
          ))
        ) : (
          <MetaDetailBaseValue
            value={value}
            rdfType={rdfType}
            bodySize={bodySize}
          />
        )}
      </Box>
    </Grid>
  );
};

export { MetaDetail };
