import { Box } from '@mui/material';

import { BlockContent } from '../../block-content';
import OutlinedCheckIcon from '../../icons/OutlinedCheckIcon';
import { Body, Title } from '../../typography';
import Card from '../Card';
import { CredibilityCardProps } from './CredibilityCard.types';
import { getBackground } from './CredibilityCard.utils';

export const CredibilityCard: React.FC<CredibilityCardProps> = ({
  index = 0,
  title,
  descriptionRaw,
  icon,
  claims,
}) => (
  <Card
    borderColor="grey.100"
    sx={{
      pt: [7.25, 10],
      px: [4.75, 3.75],
      pb: [1.25, 3],
      background: {
        xs: getBackground(index, 8),
        lg: getBackground(index, 12),
      },
    }}
  >
    {icon && (
      <Box
        component="img"
        alt={title}
        src={icon}
        height={[100, 126]}
        sx={{ float: 'right', mr: [1.75, 4.5] }}
      />
    )}
    <Title variant="h4" pt={[7.75, 8.23]} sx={{ clear: 'right' }}>
      {title}
    </Title>
    <Body size="lg" sx={{ pt: [2.5], pb: [7.5, 12.5] }}>
      <BlockContent content={descriptionRaw} />
    </Body>
    <Box>
      {claims.map((claim, index) => (
        <Body
          key={index}
          size="md"
          mobileSize="xs"
          color="primary.light"
          fontWeight={[700]}
          pb={4}
          display="flex"
          alignItems="flex-start"
        >
          <OutlinedCheckIcon sx={{ pr: 1.25 }} />
          {claim.description}
        </Body>
      ))}
    </Box>
  </Card>
);
