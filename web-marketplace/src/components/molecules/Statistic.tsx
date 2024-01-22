import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Dictionary } from 'lodash';

import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import { Label, Title } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

import WithLoader from 'components/atoms/WithLoader';

interface StatisticProps {
  label: string;
  count?: string;
  arrow?: 'upRight' | 'downLeft';
}

const Statistic: React.FC<React.PropsWithChildren<StatisticProps>> = ({
  label,
  count,
  arrow,
}) => {
  const theme = useTheme<Theme>();

  const getColor = (arrowDirection: string): string => {
    const colors: Dictionary<string> = {
      downLeft: theme.palette.error.main,
      upRight: theme.palette.secondary.main,
    };
    return colors[arrowDirection] || '';
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Label
        size="sm"
        mobileSize="sm"
        sx={{ color: 'info.main', whiteSpace: 'nowrap' }}
      >
        {label}
      </Label>
      <Box sx={{ display: 'flex', alignItems: 'center', pt: 2 }}>
        {arrow && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 30,
              height: 30,
              bgcolor: 'info.light',
              borderRadius: '50%',
              mr: 2,
              fontSize: 24,
            }}
          >
            <ArrowDownIcon
              fontSize="inherit"
              color={getColor(arrow)}
              direction={arrow}
            />
          </Box>
        )}
        <WithLoader
          isLoading={count === undefined}
          variant="skeleton"
          sx={{ width: '100%' }}
        >
          <Title variant="h3">{count}</Title>
        </WithLoader>
      </Box>
    </Box>
  );
};

export { Statistic };
