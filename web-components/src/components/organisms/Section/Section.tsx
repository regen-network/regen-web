import { ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';
import ReactHtmlParser from 'html-react-parser';

import { containerStyles } from '../../../styles/container';
import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { BlockContent } from '../../block-content';
import { Body, Label, Title } from '../../typography';

export interface SectionProps {
  label?: string;
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  backgroundImage?: string;
  children?: ReactNode;
  sx?: {
    container?: SxProps<Theme>;
    section?: SxProps<Theme>;
    title?: SxProps<Theme>;
    children?: SxProps<Theme>;
  };
}

const Section = ({
  label,
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
          containerStyles,
          { py: { xs: 20, lg: 25 }, px: { xs: 3.75, lg: 0 } },
          ...sxToArray(sx?.section),
        ]}
      >
        <Box>
          {label && (
            <Label size="md" sx={{ mb: 2.5, color: 'info.main' }}>
              {label}
            </Label>
          )}
          <Title
            variant="h2"
            sx={[{ textAlign: 'center' }, ...sxToArray(sx?.title)]}
          >
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
        <Box sx={[{ mt: { xs: 10, sm: 14 } }, ...sxToArray(sx?.children)]}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export { Section };
