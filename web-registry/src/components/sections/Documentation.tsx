import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';

import Table, { Document } from 'web-components/lib/components/table';
import Section from 'web-components/lib/components/section';

export interface DocumentationProps {
  txClient?: ServiceClientImpl;
  onViewOnLedger: (ledgerData: any) => void;
  documents: Document[];
}

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(17.5),
      paddingBottom: theme.spacing(17.5),
    },
  },
  title: {
    paddingBottom: theme.spacing(7.5),
  },
  tableBorder: {
    border: `2px solid ${theme.palette.secondary.dark}`,
    borderRadius: 5,
  },
}));

export default function Documentation({
  txClient,
  onViewOnLedger,
  documents,
}: DocumentationProps): JSX.Element {
  const classes = useStyles();

  return (
    <Section
      classes={{ root: classes.section, title: classes.title }}
      title="Documentation"
      titleVariant="h2"
      titleAlign="left"
    >
      <Table
        className={classes.tableBorder}
        txClient={txClient}
        onViewOnLedger={onViewOnLedger}
        rows={documents}
      />
    </Section>
  );
}
