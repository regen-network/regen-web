import { Box, SxProps } from '@mui/system';

import { Flex } from '../../../components/box';
import { pxToRem, Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { EcologicalCreditInfoType } from './EcologicalCreditCard.types';

type Props = {
  infos: EcologicalCreditInfoType;
  sx?: SxProps<Theme>;
};

export const EcologicalCreditCardInfo = ({
  infos: { country, price, count },
  sx,
}: Props) => (
  <Flex
    alignItems="center"
    sx={[
      {
        color: 'primary.contrastText',
        fontSize: { xs: pxToRem(12), sm: pxToRem(16) },
      },
      ...sxToArray(sx),
    ]}
  >
    <Box
      sx={{
        pr: 1.5,
        borderRight: '1px solid',
        borderColor: 'grey.500',
      }}
    >
      {country}
    </Box>
    <Box
      sx={{
        px: 1.5,
        borderRight: '1px solid',
        borderColor: 'grey.500',
      }}
    >
      {price}
    </Box>
    <Box
      sx={{
        pl: 1.5,
      }}
    >
      {count}
    </Box>
  </Flex>
);
