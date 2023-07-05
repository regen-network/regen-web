import React from 'react';
import { Grid, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';

import { Body, Label } from 'web-components/lib/components/typography';
import { TextSize } from 'web-components/lib/components/typography/sizing';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';

import { LinkWithArrow } from 'components/atoms';

import { BaseValue, isCompactedNameUrlOrOptionalUrl } from './MetaDetail.types';

export type Props = {
  value?: BaseValue;
  rdfType?: string;
  bodySize?: TextSize;
};

const MetaDetailBaseValue: React.FC<Props> = ({ value, rdfType, bodySize }) => {
  if (!value) return null;
  return (
    <>
      {(typeof value === 'string' || typeof value === 'number') && (
        <Body size={bodySize}>
          {typeof value === 'number'
            ? formatNumber({ num: value })
            : rdfType === 'xsd:date'
            ? formatDate(value)
            : value}
        </Body>
      )}
      {isCompactedNameUrlOrOptionalUrl(value) && (
        <LinkWithArrow
          href={value['schema:url']}
          label={value['schema:name']}
        />
      )}
    </>
  );
};

export { MetaDetailBaseValue };
