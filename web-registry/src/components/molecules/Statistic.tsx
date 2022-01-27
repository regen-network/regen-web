import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Dictionary } from 'lodash';

import { Label } from 'web-components/lib/components/label';
import Title from 'web-components/lib/components/title';
import { formatNumber } from 'web-components/lib/components/table';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';

interface StatisticProps {
  label: string;
  count: number;
  arrow?: 'upRight' | 'downLeft';
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  label: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.info.main,
    whiteSpace: 'nowrap',
  },
  data: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
  },
  circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.typography.pxToRem(30),
    height: theme.typography.pxToRem(30),
    background: theme.palette.info.light,
    borderRadius: '50%',
    marginRight: theme.spacing(2),
    fontSize: theme.typography.pxToRem(24),
  },
}));

const Statistic: React.FC<StatisticProps> = ({ label, count, arrow }) => {
  const styles = useStyles();
  const theme = useTheme();

  const getColor = (arrowDirection: string): string => {
    const colors: Dictionary<string> = {
      downLeft: theme.palette.error.main,
      upRight: theme.palette.secondary.main,
    };
    return colors[arrowDirection] || '';
  };

  return (
    <div className={styles.root}>
      <Label className={styles.label}>{label}</Label>
      <div className={styles.data}>
        {arrow && (
          <div className={styles.circle}>
            <ArrowDownIcon
              fontSize="inherit"
              color={getColor(arrow)}
              direction={arrow}
            />
          </div>
        )}
        <Title variant="h3">{formatNumber(count)}</Title>
      </div>
    </div>
  );
};

export { Statistic };
