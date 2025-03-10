import { isValidElement } from 'react';
import { Box, SxProps } from '@mui/material';

import { BlockContent } from '../../../components/block-content';
import { Body, Subtitle } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { ImageType } from '../../../types/shared/imageType';
import { parseText } from '../../../utils/textParser';

export interface Props {
  title: string;
  image?: ImageType;
  description: string | JSX.Element;
  sx?: SxProps<Theme>;
  className?: string;
}

const InfoCard = ({
  title,
  image,
  description,
  sx = [],
  className,
}: Props): JSX.Element => {
  return (
    <Box
      className={className}
      sx={[
        {
          borderRadius: '5px',
          background: image
            ? `url(${image.src}), linear-gradient(204.4deg, #EEF1F3 5.94%, #F1F9F6 51.92%, #F9FBF8 97.89%);`
            : 'none',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom 0 right 0',
          boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.15)',
          border: theme => `1px solid ${theme.palette.grey[100]}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ p: 5, paddingBottom: 3.75 }}>
        <Box sx={{ maxWidth: 300 }}>
          <Subtitle size="lg" sx={{ mb: 2 }}>
            {parseText(title)}
          </Subtitle>
          <Body as="div" sx={{ mt: 1.75 }}>
            {isValidElement(description) ? (
              description
            ) : (
              <BlockContent content={description} />
            )}
          </Body>
        </Box>
      </Box>
    </Box>
  );
};

export { InfoCard };
