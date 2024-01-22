import { Box, Link } from '@mui/material';

import { Body, Title } from 'web-components/src/components/typography';

import { IconLabelProps } from './ConnectSection.types';

export const IconLabel = ({
  icon,
  label,
  subLabel,
  href,
  isCompact = false,
  smallSvg = false,
}: IconLabelProps): JSX.Element => {
  const mobileSize = isCompact ? 20 : 30;
  return (
    <div>
      <Link
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Box
          sx={theme => ({
            bgcolor: 'secondary.main',
            background:
              'linear-gradient(201.8deg, #4FB573 14.67%, #B9E1C7 97.14%);',
            borderRadius: '50%',
            transition: 'all 200ms ease-in-out',
            width: {
              xs: theme.spacing(15),
              tablet: theme.spacing(mobileSize),
            },
            height: {
              xs: theme.spacing(15),
              tablet: theme.spacing(mobileSize),
            },
            ':hover': {
              color: 'secondary.light',
              background: theme.palette.secondary.light,
              bgcolor: 'secondary.light',
            },
            '& svg': {
              boxSizing: 'border-box',
              color: 'transparent',
              width: '100%',
              height: '100%',
              p: {
                xs: smallSvg ? 3 : 0,
                tablet: smallSvg ? 6 : 0,
              },
            },
          })}
        >
          {icon}
        </Box>
      </Link>
      {!isCompact && (
        <>
          <Title
            color="primary"
            align="center"
            variant="h5"
            sx={{ pt: [1.5, 5.25] }}
          >
            {label}
          </Title>

          {subLabel && (
            <Body
              size="lg"
              mobileSize="sm"
              color="primary.main"
              sx={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                pt: [1.5, 5.25],
              }}
            >
              {subLabel}
            </Body>
          )}
        </>
      )}
    </div>
  );
};
