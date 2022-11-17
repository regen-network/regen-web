import React from 'react';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { makeStyles } from 'tss-react/mui';

import Section from 'web-components/lib/components/section';
import {
  Document,
  DocumentationTable,
} from 'web-components/lib/components/table/DocumentationTable';
import { Theme } from 'web-components/lib/theme/muiTheme';

export interface DocumentationProps {
  txClient?: ServiceClientImpl;
  onViewOnLedger: (ledgerData: any) => void;
  documents: Document[];
}

const useStyles = makeStyles()((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('sm')]: {
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

function Documentation({
  txClient,
  onViewOnLedger,
  documents,
}: DocumentationProps): JSX.Element {
  const { classes: styles } = useStyles();

  return (
    <Section
      classes={{ root: styles.section, title: styles.title }}
      title="Documentation"
      titleVariant="h2"
      titleAlign="left"
    >
      <DocumentationTable
        className={styles.tableBorder}
        txClient={txClient}
        onViewOnLedger={onViewOnLedger}
        rows={documents}
      />
    </Section>
  );
}

export { Documentation };
