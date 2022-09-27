import { Box } from '@mui/material';

import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { Body, Label } from 'web-components/lib/components/typography';

import { ApprovedMethodologies } from 'generated/json-ld';

import { Link } from 'components/atoms';
import { LineItemLabelAbove } from 'components/molecules';

const ApprovedMethodologiesList: React.FC<{
  methodologyList?: ApprovedMethodologies;
}> = ({ methodologyList }) => {
  if (!methodologyList) return null;

  const methodologies = methodologyList?.['schema:itemListElement'];
  const count = methodologies?.length;
  const firstMethodology = methodologies?.[0];

  if (!count || count < 1) return null;
  return (
    <LineItemLabelAbove
      label="approved methodologies"
      data={
        <Box>
          <Body size="xl" key={firstMethodology?.['schema:name']}>
            {firstMethodology?.['schema:name']}
          </Body>
          {count > 1 && (
            <Link
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'secondary.main',
              }}
              href={methodologyList?.['schema:url']?.['@value']}
              target="_blank"
            >
              <Label sx={{ fontSize: [16], mr: 2 }}>{`+ ${
                count - 1
              } more`}</Label>{' '}
              <SmallArrowIcon sx={{ mb: 0.3, height: 9, width: 13 }} />
            </Link>
          )}
        </Box>
      }
    />
  );
};

export { ApprovedMethodologiesList };
