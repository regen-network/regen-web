import { Box, SxProps } from '@mui/material';

import { containerStyles } from '../../../styles/container';
import { headerFontFamily, Theme } from '../../../theme/muiTheme';
import { ImageType } from '../../../types/shared/imageType';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { Title } from '../../typography';
import { quoteHighlightStyle, quotemarkStyle } from './QuoteSection.styles';
import { Person } from './QuoteSection.types';

export interface Props {
  backgroundImage: ImageType;
  quoteFirstPart: string;
  quoteMiddlePart: string;
  quoteLastPart: string;
  person: Person;
  logo: ImageType;
  sx?: SxProps<Theme>;
}

const QuoteSection = ({
  backgroundImage,
  logo,
  person,
  quoteFirstPart,
  quoteMiddlePart,
  quoteLastPart,
  sx = [],
}: Props): JSX.Element => {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          paddingTop: { xs: 36.5, md: 49.5 },
          paddingX: { xs: 3.75, md: 37.75 },
          paddingBottom: { xs: 17.75, md: 26.5 },
        },
        ...sxToArray(sx),
      ]}
    >
      <Box sx={[containerStyles, { width: '100%' }]}>
        <Box>
          <Title
            variant="h2"
            mobileVariant="h4"
            sx={{
              maxWidth: 781,
              mb: 11.5,
              color: 'primary.main',
              position: 'relative',
            }}
          >
            <Box
              component="span"
              sx={[
                quotemarkStyle,
                {
                  position: 'absolute',
                  top: { xs: -30, md: -50 },
                  left: { xs: 0, md: -30 },
                },
              ]}
            >
              {'“'}
            </Box>
            <Box
              component="span"
              sx={[
                quoteHighlightStyle,
                { mr: 2, zIndex: 1, position: 'relative' },
              ]}
            >
              {quoteFirstPart}
            </Box>
            <Box component="span" sx={{ mr: 2 }}>
              {quoteMiddlePart}
            </Box>
            <Box component="span" sx={[quoteHighlightStyle, { mr: 2 }]}>
              {quoteLastPart}
            </Box>
            <Box
              component="span"
              sx={[
                quotemarkStyle,
                { position: 'absolute', bottom: { xs: -40, md: -65 } },
              ]}
            >
              {'”'}
            </Box>
          </Title>
        </Box>
        <Box sx={{ mb: 11.5, color: 'primary.main' }}>
          <Box
            sx={{
              fontFamily: headerFontFamily,
              fontWeight: 800,
              fontSize: 21,
              lineHeight: '26px',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            {person.name}
          </Box>
          <Box sx={{ fontWeight: 400, fontSize: 18, lineHeight: '150%' }}>
            {person.role}
          </Box>
        </Box>
        {logo.src && (
          <Box
            component="img"
            src={logo.src}
            alt={logo.alt}
            sx={{ maxWidth: 236 }}
          />
        )}
      </Box>
    </Box>
  );
};

export { QuoteSection };
