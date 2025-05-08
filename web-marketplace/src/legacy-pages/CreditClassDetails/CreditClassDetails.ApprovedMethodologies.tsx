import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { Flex } from 'web-components/src/components/box';
import { Body, Label } from 'web-components/src/components/typography';

import { ApprovedMethodologies } from 'lib/db/types/json-ld/methodology';

import { Link, LinkWithArrow } from 'components/atoms';
import { MetaDetail } from 'components/molecules';

import { MAX_METHODOLOGIES_LINKS } from './CreditClassDetails.constants';

const ApprovedMethodologiesList: React.FC<
  React.PropsWithChildren<{
    methodologyList?: ApprovedMethodologies;
  }>
> = ({ methodologyList }) => {
  const { _ } = useLingui();
  if (!methodologyList) return null;

  const methodologies = methodologyList?.['schema:itemListElement'];
  const count = methodologies?.length;

  if (!count || count < 1) return null;

  return (
    <MetaDetail
      label={_(msg`approved methodologies`)}
      customContent={
        <Flex flexDirection="column">
          {methodologies.slice(0, MAX_METHODOLOGIES_LINKS).map(methodologie => {
            return (
              <Body
                key={methodologie?.['schema:name']}
                size="xl"
                styleLinks={false}
              >
                <LinkWithArrow
                  href={methodologie?.['schema:url']}
                  label={methodologie?.['schema:name']}
                />
              </Body>
            );
          })}
          {count > MAX_METHODOLOGIES_LINKS && methodologyList?.['schema:url'] && (
            <Link
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'secondary.main',
              }}
              href={methodologyList?.['schema:url']}
              target="_blank"
            >
              <Label sx={{ fontSize: [16], mt: 2 }}>
                <Trans>+ {count - MAX_METHODOLOGIES_LINKS} more</Trans>
              </Label>
            </Link>
          )}
        </Flex>
      }
    />
  );
};

export { ApprovedMethodologiesList };
