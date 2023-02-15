import { Box, SxProps } from '@mui/material';

import { Flex } from '../../../components/box';
import { Body, Label } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { EcologicalCreditCardItemListType } from './EcologicalCreditCard.types';

export interface Props extends EcologicalCreditCardItemListType {
  sx?: SxProps<Theme>;
}

const EcologicalCreditCardItemList = ({
  label,
  items,
  sx = [],
}: Props): JSX.Element => {
  return (
    <Flex sx={[...(Array.isArray(sx) ? sx : [sx])]} flexDirection="column">
      <Label size="xs" sx={{ mb: { xs: 2.5, sm: 3 } }}>
        {label}
      </Label>
      <Box component="ul" sx={{ pl: 0, my: 0 }}>
        {items.map(({ name, icon }) => (
          <Flex component="li" key={name} alignItems="center">
            {icon && (
              <Box
                component="img"
                src={icon?.src}
                alt={icon?.alt}
                sx={{ mr: 2.5, width: 24, height: 24 }}
              />
            )}
            <Body>{name}</Body>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};

export { EcologicalCreditCardItemList };
