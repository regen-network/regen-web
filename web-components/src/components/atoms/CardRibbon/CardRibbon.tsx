import { Box, SxProps } from '@mui/material';

import { LabelSize } from '../../../components/typography/sizing';
import { Theme } from '../../../theme/muiTheme';
import { ImageType } from '../../../types/shared/imageType';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { Flex } from '../../box';
import { Label } from '../../typography';

export interface Props {
  icon: ImageType;
  label: string;
  labelSize?: LabelSize;
  labelMobileSize?: LabelSize;
  sx?: SxProps<Theme>;
  sxIcon?: SxProps<Theme>;
}
const CardRibbon = ({
  icon,
  label,
  labelSize = 'sm',
  labelMobileSize = 'xs',
  sx = [],
  sxIcon = [],
}: Props): JSX.Element => {
  return (
    <Flex
      sx={[
        {
          background:
            'linear-gradient(201.8deg, rgba(var(--sc-tag-credit-category-500) / 1) 14.67%, rgba(var(--sc-tag-credit-category-300) / 1) 97.14%)',
          py: { xs: 1.25, sm: 2.5 },
          px: { xs: 5 },
          width: 'fit-content',
          borderRadius: '0 2px 2px 0',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      alignItems="center"
    >
      {icon?.src && (
        <Box
          component="img"
          src={icon?.src}
          alt={icon?.alt}
          sx={[{ mr: 2.5, width: 24, height: 24 }, ...sxToArray(sxIcon)]}
        />
      )}
      <Label
        size={labelSize}
        mobileSize={labelMobileSize}
        sx={{ color: 'primary.main' }}
      >
        {label}
      </Label>
    </Flex>
  );
};

export { CardRibbon };
