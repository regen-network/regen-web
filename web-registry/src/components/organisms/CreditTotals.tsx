import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';

import { getBatchesWithSupply } from '../../lib/ecocredit/api';
import { BatchInfoWithSupply } from '../../types/ledger/ecocredit';
import { Statistic } from '../molecules';

interface CreditTotalData {
  tradeable?: number;
  retired?: number;
  created?: number;
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
    tradeable: undefined,
    retired: undefined,
    created: undefined,
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
        const batchTradable = parseNumber(batch.tradableSupply);
        const batchRetired = parseNumber(batch.retiredSupply);
        const batchCancelled = parseNumber(batch.cancelledAmount);
        tradeable += batchTradable;
        retired += batchRetired;
        created += batchTradable + batchRetired + batchCancelled;
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
      try {
        const res = await getBatchesWithSupply({ withAllData: false });
        const data: BatchInfoWithSupply[] = res?.data;

        if (data) {
          const creditTotals = sumBatchTotals(data);
          setTotals(creditTotals);
        }
      } catch (err) {
        // eslint-disable-next-line
        console.error(err);
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
