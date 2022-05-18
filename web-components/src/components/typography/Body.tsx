import { styled, Typography, TypographyProps } from '@mui/material';
import { getSizeVariants, TextSize } from './sizing';

interface Props extends TypographyProps {
  size?: TextSize;
  mobileSize?: TextSize;
  styleLinks?: boolean;
  styleLists?: boolean;
}

export const Body = styled(Typography, {
  name: 'RegenBodyText',
  shouldForwardProp: prop =>
    prop !== 'size' &&
    prop !== 'mobileSize' &&
    prop !== 'styleLinks' &&
    prop !== 'styleLists',
})<Props>(
  ({
    theme,
    mobileSize,
    size = 'md',
    styleLinks = true,
    styleLists = true,
  }) => {
    const { breakpoints, typography } = theme;
    const { variant, mobileVariant } = getSizeVariants(size, mobileSize);
    return {
      lineHeight: '150%',
      fontWeight: 400,
      whiteSpace: 'pre-wrap',
      [breakpoints.up('sm')]: {
        fontSize: typography[variant].fontSize,
      },
      [breakpoints.down('sm')]: {
        fontSize: typography[mobileVariant].fontSize,
      },
      ...(styleLinks && {
        '& a, .MuiLink-root': {
          fontWeight: 'bold',
          color: theme.palette.secondary.main,
          cursor: 'pointer',
        },
      }),
      ...(styleLists && {
        '& ul, ol': {
          listStyle: 'none',
          margin: theme.spacing(2, 0),
          padding: 0,
          listStylePosition: 'inside',
        },
        '& li': {
          listStyle: 'none',
          marginLeft: '1.5rem',
          '::before': {
            content: "'\\2022'",
            color: theme.palette.secondary.main,
            display: 'inline-flex',
            alignContent: 'flex-start',
            width: '1.25rem',
            marginLeft: '-1.25rem',
            fontSize: '75%',
          },
        },
      }),
    };
  },
);

Body.defaultProps = {
  size: 'md',
  color: 'info.dark',
  styleLists: true,
  styleLinks: true,
};
