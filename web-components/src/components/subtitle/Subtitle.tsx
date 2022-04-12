import { styled, Typography, TypographyProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { TextSize } from '~/theme/sizing';

interface Props extends TypographyProps {
  size?: TextSize;
  mobileSize?: TextSize;
}

const Subtitle = styled(Typography)<Props>(
  ({ theme, variant, size = 'md' }) => {
    const { breakpoints, typography } = theme;
    const { down } = breakpoints;
    return {
      lineHeight: '150%',
      fontWeight: 700,
      ...(size === 'xl' && {
        [down('sm')]: {
          fontSize: typography.textLarge.fontSize,
        },
      }),
    };
  },
);

export { Subtitle };
