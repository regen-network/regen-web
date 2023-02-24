import { ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';
import ReactHtmlParser from 'html-react-parser';

import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { BlockContent } from '../../block-content';
import { Body, Title } from '../../typography';

export interface SectionProps {
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  backgroundImage?: string;
  children?: ReactNode;
  sx?: {
    container?: SxProps<Theme>;
    section?: SxProps<Theme>;
  };
}

const Section = ({
  title,
  description,
  backgroundImage,
  children,
  sx,
}: SectionProps) => {
  return (
    <Box
      sx={[
        {
          background: theme =>
            backgroundImage
              ? `url(${backgroundImage}), ${theme.palette.grey['50']}`
              : 'none',
        },
        ...sxToArray(sx?.container),
      ]}
    >
      <Box
        sx={[
          {
            maxWidth: theme => theme.breakpoints.values.lg,
            margin: '0 auto',
            py: { xs: 20, lg: 25 },
            px: { xs: 3.75, lg: 0 },
          },
          ...sxToArray(sx?.section),
        ]}
      >
        <Box>
          <Title variant="h2" sx={{ textAlign: 'center' }}>
            {title}
          </Title>
          {description && (
            <Body
              size="xl"
              mobileSize="lg"
              as="div"
              textAlign="center"
              sx={{
                pt: [3.25, 7.75],
                fontSize: { xs: 16, sm: 22 },
                maxWidth: { xs: '100%', sm: 790 },
                marginX: 'auto',
              }}
            >
              {typeof description === 'string' ? (
                ReactHtmlParser(description)
              ) : (
                <BlockContent content={description} />
              )}
            </Body>
          )}
        </Box>
        <Box sx={{ mt: { xs: 10, sm: 14 } }}>{children}</Box>
      </Box>
    </Box>
  );
};

export { Section };
