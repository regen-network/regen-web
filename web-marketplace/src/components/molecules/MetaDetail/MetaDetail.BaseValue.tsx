import { useLingui } from '@lingui/react';
import { SxProps, Theme } from '@mui/material';
import { ExpandedTermDefinition } from 'jsonld';
import { sxToArray } from 'utils/mui/sxToArray';

import { Body } from 'web-components/src/components/typography';
import { TextSize } from 'web-components/src/components/typography/sizing';
import { formatDate, formatNumber } from 'web-components/src/utils/format';

import { LinkWithArrow } from 'components/atoms';

import { RAW_NUMBER_RDF_TYPES } from './MetaDetail.constants';
import { BaseValue, isCompactedNameUrlOrOptionalUrl } from './MetaDetail.types';
import { fromISO8601 } from './MetaDetail.utils';

export type Props = {
  value?: BaseValue;
  rdfType?: ExpandedTermDefinition['@type'];
  bodySize?: TextSize;
  sx?: SxProps<Theme>;
};

const MetaDetailBaseValue: React.FC<Props> = ({
  value,
  rdfType,
  bodySize,
  sx,
}) => {
  const { _ } = useLingui();
  let formattedValue: string | undefined;
  const isNumber = typeof value === 'number';
  const isString = typeof value === 'string';
  const isBoolean = typeof value === 'boolean';

  if (isNumber) {
    if (!RAW_NUMBER_RDF_TYPES.includes(rdfType ?? '')) {
      formattedValue = formatNumber({ num: value });
    } else {
      formattedValue = String(value);
    }
  } else if (isString) {
    if (rdfType === 'xsd:date') {
      formattedValue = formatDate(value);
    } else if (rdfType?.includes('Duration')) {
      formattedValue = fromISO8601(value, _) || value;
    } else {
      formattedValue = value;
    }
  } else if (isBoolean) {
    const toString = (value as boolean).toString();
    formattedValue = toString.charAt(0).toUpperCase() + toString.slice(1);
  }

  return (
    <>
      {formattedValue && (
        <Body size={bodySize} sx={sxToArray(sx)} className="break-all">
          {formattedValue}
        </Body>
      )}
      {value && isCompactedNameUrlOrOptionalUrl(value) && (
        <Body
          size={bodySize}
          styleLinks={false}
          sx={sxToArray(sx)}
          className="break-all"
        >
          <LinkWithArrow
            href={value['schema:url']}
            label={value['schema:name']}
          />
        </Body>
      )}
    </>
  );
};

export { MetaDetailBaseValue };
