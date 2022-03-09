import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { Statistic } from '../molecules';
import { getBatchesWithSupply } from '../../lib/ecocredit';
import type { BatchInfoWithSupply } from '../../types/ledger/ecocredit';

interface CreditTotalData {
  tradeable: number;
  retired: number;
  created: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(7, 0, 11),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 0, 11),
    },
  },
  item: {
    minWidth: 'fit-content',
  },
}));

const CreditTotals: React.FC = () => {
  const styles = useStyles();
  const [totals, setTotals] = useState<CreditTotalData>({
    tradeable: 0,
    retired: 0,
    created: 0,
  });

  const parseNumber = (value: any): number => {
    if (typeof value === 'string') {
      return parseFloat(value);
    }
    if (typeof value === 'number') {
      return value;
    }
    return 0;
  };

  const sumBatchTotals = useCallback(
    (batches: BatchInfoWithSupply[]): CreditTotalData => {
      let tradeable = 0;
      let retired = 0;
      let created = 0;

      batches.forEach(batch => {
        tradeable += parseNumber(batch.tradable_supply);
        retired += parseNumber(batch.retired_supply);
        created += parseNumber(batch.total_amount);
      });

      return {
        tradeable: Math.floor(tradeable),
        retired: Math.floor(retired),
        created: Math.floor(created),
      };
    },
    [],
  );

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const res = await getBatchesWithSupply();
      const data: BatchInfoWithSupply[] = res?.data;

      if (data) {
        const creditTotals = sumBatchTotals(data);
        setTotals(creditTotals);
      }
    };

    fetchData();
  }, [sumBatchTotals]);

  return (
    <Grid container spacing={6} className={styles.root}>
      <Grid item xs={12} sm={3} className={styles.item}>
        <Statistic label="ecocredits tradeable" count={totals.tradeable} />
      </Grid>
      <Grid item xs={12} sm={3} className={styles.item}>
        <Statistic
          label="ecocredits retired"
          count={totals.retired}
          arrow="downLeft"
        />
      </Grid>
      <Grid item xs={12} sm={3} className={styles.item}>
        <Statistic
          label="ecocredits created"
          count={totals.created}
          arrow="upRight"
        />
      </Grid>
    </Grid>
  );
};

export { CreditTotals };
