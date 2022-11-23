import { Flex } from 'web-components/lib/components/box';
import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { Body, Label } from 'web-components/lib/components/typography';

import { ApprovedMethodologies } from 'generated/json-ld';

import { Link } from 'components/atoms';
import { LineItemLabelAbove } from 'components/molecules';

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
    <LineItemLabelAbove
      label="approved methodologies"
      data={
        <Flex flexDirection="column">
          {methodologies.slice(0, MAX_METHODOLOGIE_LINKS).map(methodologie => {
            return (
              <Link
                sx={{
                  display: 'flex',
                  color: 'secondary.main',
                }}
                href={methodologie?.['schema:url']?.['@value']}
                target="_blank"
              >
                <Body size="xl" key={methodologie?.['schema:name']}>
                  {methodologie?.['schema:name']}
                  <SmallArrowIcon
                    sx={{
                      mb: 0.3,
                      height: 9,
                      width: 13,
                      ml: 2,
                      display: 'inline',
                    }}
                  />
                </Body>
              </Link>
            );
          })}
          {count > MAX_METHODOLOGIE_LINKS && (
            <Link
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'secondary.main',
              }}
              href={methodologyList?.['schema:url']?.['@value']}
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
