import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Dictionary } from 'lodash';
import Box from '@mui/material/Box';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { Label } from 'web-components/lib/components/label';
import Title from 'web-components/lib/components/title';
import { formatNumber } from 'web-components/lib/components/table';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';

interface StatisticProps {
  label: string;
  count: number;
  arrow?: 'upRight' | 'downLeft';
}

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.info.main,
    whiteSpace: 'nowrap',
  },
}));

const Statistic: React.FC<StatisticProps> = ({ label, count, arrow }) => {
  const styles = useStyles();
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
      <Label className={styles.label}>{label}</Label>
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
        <Title variant="h3">{formatNumber(count)}</Title>
      </Box>
    </Box>
  );
};

export { Statistic };
