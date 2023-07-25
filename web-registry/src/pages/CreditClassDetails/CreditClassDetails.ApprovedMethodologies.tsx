import { Flex } from 'web-components/lib/components/box';
import { Body, Label } from 'web-components/lib/components/typography';

import { ApprovedMethodologies } from 'lib/db/types/json-ld/methodology';

import { Link, LinkWithArrow } from 'components/atoms';
import { MetaDetail } from 'components/molecules';

import { MAX_METHODOLOGIE_LINKS } from './CreditClassDetails.constants';

const ApprovedMethodologiesList: React.FC<
  React.PropsWithChildren<{
    methodologyList?: ApprovedMethodologies;
  }>
> = ({ methodologyList }) => {
  if (!methodologyList) return null;

  const methodologies = methodologyList?.['schema:itemListElement'];
  const count = methodologies?.length;

  if (!count || count < 1) return null;

  return (
    <MetaDetail
      label="approved methodologies"
      customContent={
        <Flex flexDirection="column">
          {methodologies.slice(0, MAX_METHODOLOGIE_LINKS).map(methodologie => {
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
          {count > MAX_METHODOLOGIE_LINKS && methodologyList?.['schema:url'] && (
            <Link
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'secondary.main',
              }}
              href={methodologyList?.['schema:url']}
              target="_blank"
            >
              <Label sx={{ fontSize: [16], mt: 2 }}>{`+ ${
                count - MAX_METHODOLOGIE_LINKS
              } more`}</Label>
            </Link>
          )}
        </Flex>
      }
    />
  );
};

export { ApprovedMethodologiesList };
