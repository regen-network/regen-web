import { Grid, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { ExpandedTermDefinition } from 'jsonld';
import { sxToArray } from 'utils/mui/sxToArray';

import { Label } from 'web-components/src/components/typography';
import { TextSize } from 'web-components/src/components/typography/sizing';

import { MetaDetailBaseValue } from './MetaDetail.BaseValue';
import { Value } from './MetaDetail.types';

export type Props = {
  sx?: SxProps<Theme>;
  label: string;
  customContent?: JSX.Element;
  value?: Value;
  rdfType?: ExpandedTermDefinition['@type'];
  labelColor?: string;
  bodySize?: TextSize;
};

const MetaDetail: React.FC<Props> = ({
  sx,
  label,
  customContent,
  value,
  rdfType,
  labelColor = 'primary.contrastText',
  bodySize = 'xl',
}) => {
  const isArray = Array.isArray(value);
  if ((!value || (isArray && value.length === 0)) && !customContent)
    return null;

  return (
    <Grid item xs={12} sm={6}>
      <Box sx={sxToArray(sx)}>
        <Label color={labelColor} size="xs" mobileSize="xs" mb={3}>
          {label}
        </Label>
        {customContent ? (
          <>{customContent}</>
        ) : isArray ? (
          value.map((v, i) => {
            const isLast = i === value.length - 1;

            return (
              <MetaDetailBaseValue
                key={i}
                value={v}
                rdfType={rdfType}
                bodySize={bodySize}
                sx={{ pb: value.length > 1 && !isLast ? 3 : 0 }}
              />
            );
          })
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
