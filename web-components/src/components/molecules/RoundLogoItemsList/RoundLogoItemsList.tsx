import { Box, SxProps } from '@mui/material';

import { RoundLogo } from '../../../components/atoms/RoundLogo/RoundLogo';
import { Label, Subtitle } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { RoundLogoItemsListType } from './RoundLogoItemsList.types';

export type Props = RoundLogoItemsListType & {
  sx?: SxProps<Theme>;
};

const RoundLogoItemsList = ({ title, items, sx = [] }: Props): JSX.Element => {
  return (
    <Box sx={[...sxToArray(sx)]}>
      <Label size="xs" sx={{ mb: 3.75, fontSize: 11 }}>
        {title}
      </Label>
      <Box component="ul" sx={{ listStyleType: 'none', paddingInlineStart: 0 }}>
        {items.map(item => (
          <Box
            component="li"
            key={item.name}
            sx={{ display: 'flex', alignItems: 'center', mb: 3.75 }}
          >
            <RoundLogo image={item.image} sx={{ mr: 2.5 }} />
            <Subtitle size="lg">{item.name}</Subtitle>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { RoundLogoItemsList };
