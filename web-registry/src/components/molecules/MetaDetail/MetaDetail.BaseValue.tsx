import { ExpandedTermDefinition } from 'jsonld';

import { Body } from 'web-components/lib/components/typography';
import { TextSize } from 'web-components/lib/components/typography/sizing';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';

import { LinkWithArrow } from 'components/atoms';

import { BaseValue, isCompactedNameUrlOrOptionalUrl } from './MetaDetail.types';
import { fromISO8601 } from './MetaDetail.utils';

export type Props = {
  value?: BaseValue;
  rdfType?: ExpandedTermDefinition['@type'];
  bodySize?: TextSize;
};

const MetaDetailBaseValue: React.FC<Props> = ({ value, rdfType, bodySize }) => {
  let formattedValue: string | undefined;
  const isNumber = typeof value === 'number';
  const isString = typeof value === 'string';
  const isBoolean = typeof value === 'boolean';
  if (isString || isNumber) {
    if (isNumber) {
      formattedValue = formatNumber({ num: value });
    } else if (rdfType === 'xsd:date') {
      formattedValue = formatDate(value);
    } else {
      formattedValue = fromISO8601(value) || value;
    }
  } else if (isBoolean) {
    const toString = (value as boolean).toString();
    formattedValue = toString.charAt(0).toUpperCase() + toString.slice(1);
  }

  return (
    <>
      {formattedValue && <Body size={bodySize}>{formattedValue}</Body>}
      {value && isCompactedNameUrlOrOptionalUrl(value) && (
        <Body size={bodySize} styleLinks={false}>
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
