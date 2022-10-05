import { Flex } from 'web-components/lib/components/box';
import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { Body } from 'web-components/lib/components/typography';

import { ApprovedMethodologies } from 'generated/json-ld';

import { Link } from 'components/atoms';
import { LineItemLabelAbove } from 'components/molecules';

const ApprovedMethodologiesList: React.FC<{
  methodologyList?: ApprovedMethodologies;
}> = ({ methodologyList }) => {
  if (!methodologyList) return null;

  const methodologies = methodologyList?.['schema:itemListElement'];
  const count = methodologies?.length;

  if (!count || count < 1) return null;

  return (
    <LineItemLabelAbove
      label="approved methodologies"
      data={
        <Flex flexDirection="column">
          {methodologies.map(methodologie => {
            return (
              <Link
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  color: 'secondary.main',
                }}
                href={methodologie?.['schema:url']?.['@value']}
                target="_blank"
              >
                <Body size="xl" key={methodologie?.['schema:name']}>
                  {methodologie?.['schema:name']}
                </Body>
                <SmallArrowIcon sx={{ mb: 0.3, height: 9, width: 13, ml: 2 }} />
              </Link>
            );
          })}
        </Flex>
      }
    />
  );
};

export { ApprovedMethodologiesList };
