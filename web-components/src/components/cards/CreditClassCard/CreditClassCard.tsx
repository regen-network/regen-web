import { Box, Card, CardContent, CardMedia, SxProps } from '@mui/material';

import { CardRibbon } from '../../../components/atoms/CardRibbon/CardRibbon';
import { Theme } from '../../../theme/muiTheme';
import { LinkType } from '../../../types/shared/linkType';
import { parseText } from '../../../utils/textParser';
import { OptimizeImageProps } from '../../image';
import { Body, Subtitle, Title } from '../../typography';
import { useCreditClassCardStyles } from './CreditClassCard.styles';
import { CreditClassCardItemType } from './CreditClassCard.types';

export interface Props extends OptimizeImageProps {
  type: CreditClassCardItemType;
  title: string | JSX.Element;
  description: string | JSX.Element;
  imgSrc: string;
  generationMethod: CreditClassCardItemType;
  methodology: LinkType;
  sx?: SxProps<Theme>;
}

const CreditClassCard = ({
  title,
  description,
  imgSrc,
  type,
  sx = [],
}: Props): JSX.Element => {
  const { classes } = useCreditClassCardStyles();

  return (
    <Box
      sx={[
        { display: 'block', width: '100%', maxWidth: 658 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Card
        elevation={1}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          border: '1px solid',
          borderColor: 'grey.100',
          borderRadius: '10px',
        }}
      >
        <CardRibbon
          icon={type.icon}
          label={type.name}
          sx={{ position: 'absolute', left: 0, top: 48 }}
        />
        <CardMedia image={imgSrc || ''} className={classes.image} />
        <CardContent>
          <Subtitle
            size="xs"
            color="info.main"
            sx={{ fontWeight: 800, mb: 3, letterSpacing: '1px', mt: [0, 2.5] }}
          >
            {'CREDIT CLASS'}
          </Subtitle>
          <Title variant="h5" mobileVariant="h6" as="div" sx={{ mb: 2 }}>
            {parseText(title)}
          </Title>
          <Body size="sm" mobileSize="xs">
            {parseText(description)}
          </Body>
        </CardContent>
      </Card>
    </Box>
  );
};

export { CreditClassCard };
