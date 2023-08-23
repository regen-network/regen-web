import { Box, SxProps } from '@mui/material';

import { RoundLogo } from '../../../components/atoms/RoundLogo/RoundLogo';
import { Label, Subtitle } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { LinkWrapper } from './RoundLogoItemsList.LinkWrapper';
import { RoundLogoItemsListType } from './RoundLogoItemsList.types';

export type Props = RoundLogoItemsListType & {
  sx?: SxProps<Theme>;
};

const RoundLogoItemsList = ({ title, items, sx = [] }: Props): JSX.Element => {
  const hasItems = items?.length > 0;
  return (
    <>
      {hasItems && (
        <Box sx={[...sxToArray(sx)]}>
          <Label size="xs" sx={{ mb: 3.75, fontSize: 11 }}>
            {title}
          </Label>
          <Box
            component="ul"
            sx={{ listStyleType: 'none', paddingInlineStart: 0 }}
          >
            {items.map(({ image, link }) => (
              <Box
                component="li"
                key={link.text}
                sx={{
                  mb: 3.75,
                  display: 'flex',
                  alignItems: 'center',
                  ':last-child': {
                    mb: 0,
                  },
                }}
              >
                <LinkWrapper link={link}>
                  <RoundLogo image={image} sx={{ mr: 2.5 }} />
                  <Subtitle size="lg">{link.text}</Subtitle>
                </LinkWrapper>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export { RoundLogoItemsList };
