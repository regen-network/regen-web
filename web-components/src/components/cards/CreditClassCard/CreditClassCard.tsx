import ReactHtmlParser from 'react-html-parser';
import { Box, Card, CardContent, CardMedia, SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { Image, OptimizeImageProps } from '../../image';
import { Body, Subtitle, Title } from '../../typography';
import { useCreditClassCardStyles } from './CreditClassCard.styles';

export interface Props extends OptimizeImageProps {
  title: string;
  description: string;
  imgSrc: string;
  href?: string;
  sx?: SxProps<Theme>;
}

const CreditClassCard = ({
  title,
  description,
  imgSrc,
  apiServerUrl,
  imageStorageBaseUrl,
  href,
  sx = [],
}: Props): JSX.Element => {
  const classes = useCreditClassCardStyles({});

  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noreferrer"
      sx={[
        { display: 'block', width: '100%', maxWidth: 658 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Card
        elevation={1}
        sx={{
          display: 'flex',
          flexDirection: ['column', 'row'],
          border: '1px solid',
          borderColor: 'grey.100',
          borderRadius: '10px',
        }}
      >
        <CardMedia
          component={(): JSX.Element => (
            <Image
              backgroundImage
              src={imgSrc}
              imageStorageBaseUrl={imageStorageBaseUrl}
              apiServerUrl={apiServerUrl}
              className={classes.image}
            />
          )}
        />
        <CardContent>
          <Subtitle
            size="xs"
            color="info.main"
            sx={{ fontWeight: 800, mb: 3, letterSpacing: '1px', mt: [0, 2.5] }}
          >
            {'CREDIT CLASS'}
          </Subtitle>
          <Title variant="h5" mobileVariant="h6" as="div" sx={{ mb: 2 }}>
            {ReactHtmlParser(title)}
          </Title>
          <Body size="sm" mobileSize="xs">
            {description}
          </Body>
        </CardContent>
      </Card>
    </Box>
  );
};

export { CreditClassCard };
