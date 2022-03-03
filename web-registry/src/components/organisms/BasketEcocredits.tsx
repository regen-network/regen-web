import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';

import { ledgerRestUri } from '../../ledger';
import { getEcocreditsForAccount } from '../../lib/ecocredit';
import { EcocreditsTable } from '../../components/organisms';
import type { TableCredits } from '../../types/ledger/ecocredit';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(35),
  },
  title: {
    marginBottom: theme.spacing(8),
  },
}));

interface BasketEcocreditsProps {
  basketDenom: string;
}

const BasketEcocredits: React.FC<BasketEcocreditsProps> = ({ basketDenom }) => {
  const styles = useStyles();
  const [credits, setCredits] = useState<TableCredits[]>([]);

  useEffect(() => {
    if (!basketDenom || !ledgerRestUri) return;

    const fetchData = async (): Promise<void> => {
      // TODO: mocked fetch to get a list of credit batches
      const ADDRESS = 'regen1m5fecarvw0ltx2yvvru0kl4un03d3uca2kxggj';
      const _credits = await getEcocreditsForAccount(ADDRESS);
      // const _credits = await getEcocreditsForBasket(basketDenom);
      setCredits(_credits);
    };

    fetchData();
  }, [basketDenom]);

  return (
    <Section
      title="Ecocredits"
      titleVariant="h3"
      titleAlign="left"
      classes={styles}
    >
      <EcocreditsTable credits={credits} />
    </Section>
  );
};

export { BasketEcocredits };
