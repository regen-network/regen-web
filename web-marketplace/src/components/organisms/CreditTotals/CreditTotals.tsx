import React, { useMemo } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Grid from '@mui/material/Grid';

import { useFetchCreditBatches } from '../../../hooks/batches/useFetchCreditBatches';
import { Statistic } from '../../molecules';
import { useCreditTotalsStyles } from './CreditTotals.styles';
import { sumBatchTotals } from './CreditTotals.utils';

const CreditTotals: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();
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
        <Statistic
          label={_(msg`ecocredits tradable`)}
          count={creditTotals.tradeable}
        />
      </Grid>
      <Grid item xs={12} sm={3} className={styles.item}>
        <Statistic
          label={_(msg`ecocredits retired`)}
          count={creditTotals.retired}
          arrow="downLeft"
        />
      </Grid>
      <Grid item xs={12} sm={3} className={styles.item}>
        <Statistic
          label={_(msg`ecocredits created`)}
          count={creditTotals.created}
          arrow="upRight"
        />
      </Grid>
    </Grid>
  );
};

export { CreditTotals };
