import React from 'react';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import BasketEcocreditsTable from './BasketEcocreditsTable';
import { BatchInfo } from '../../types/ledger/ecocredit';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(15, 5, 20),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(30, 5),
      maxWidth: theme.breakpoints.values.lg,
    },
  },
  title: {
    marginBottom: theme.spacing(8),
  },
}));

interface BasketEcocreditsProps {
  batches: BatchInfo[];
}

// This component will manage other components organized in tabs
const BasketEcocredits: React.FC<BasketEcocreditsProps> = ({ batches }) => {
  const styles = useStyles();

  return (
    <Section
      title="Ecocredits"
      titleVariant="h3"
      titleAlign="left"
      classes={styles}
    >
      <BasketEcocreditsTable batches={batches} />
    </Section>
  );
};

export { BasketEcocredits };
