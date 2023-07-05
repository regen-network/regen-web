import { ExpandedTermDefinition } from 'jsonld';

import { Body } from 'web-components/lib/components/typography';
import { TextSize } from 'web-components/lib/components/typography/sizing';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';

import { LinkWithArrow } from 'components/atoms';

import { BaseValue, isCompactedNameUrlOrOptionalUrl } from './MetaDetail.types';

export type Props = {
  value?: BaseValue;
  rdfType?: ExpandedTermDefinition['@type'];
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
