import { SxProps } from '@mui/material';

import { LabelSize } from '../../../components/typography/sizing';
import { Theme } from '../../../theme/muiTheme';
import { Flex } from '../../box';
import { Label } from '../../typography';
export interface Props {
  icon?: JSX.Element;
  label: string;
  labelSize?: LabelSize;
  labelMobileSize?: LabelSize;
  sx?: SxProps<Theme>;
  className?: string;
}
const CardRibbon = ({
  icon,
  label,
  labelSize = 'sm',
  labelMobileSize = 'xs',
  sx = [],
  className,
}: Props): JSX.Element => {
  return (
    <Flex
      className={className}
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
      {icon && <div className="flex mr-10">{icon}</div>}
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
