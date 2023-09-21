import React, { useMemo } from 'react';
import Grid from '@mui/material/Grid';

import { Statistic } from '../../molecules';
import { useFetchCreditBatches } from '../CreditBatches/hooks/useFetchCreditBatches';
import { useCreditTotalsStyles } from './CreditTotals.styles';
import { sumBatchTotals } from './CreditTotals.utils';

const CreditTotals: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { classes: styles } = useCreditTotalsStyles();
  const { batchesWithSupply } = useFetchCreditBatches({ withAllData: false });

  const creditTotals = useMemo(
    () =>
      batchesWithSupply
        ? sumBatchTotals(batchesWithSupply ?? [])
        : {
            tradeable: undefined,
            retired: undefined,
            created: undefined,
          },
    [batchesWithSupply],
  );

  return (
    <Grid container spacing={6} className={styles.root}>
      <Grid item xs={12} sm={3} className={styles.item}>
        <Statistic label="ecocredits tradable" count={creditTotals.tradeable} />
      </Grid>
      <Grid item xs={12} sm={3} className={styles.item}>
        <Statistic
          label="ecocredits retired"
          count={creditTotals.retired}
          arrow="downLeft"
        />
      </Grid>
      <Grid item xs={12} sm={3} className={styles.item}>
        <Statistic
          label="ecocredits created"
          count={creditTotals.created}
          arrow="upRight"
        />
      </Grid>
    </Grid>
  );
};

export { CreditTotals };
