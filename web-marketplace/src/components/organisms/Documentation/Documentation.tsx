import { useMemo } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { makeStyles } from 'tss-react/mui';

import Section from 'web-components/src/components/section';
import {
  Document,
  DocumentationTable,
} from 'web-components/src/components/table/DocumentationTable/DocumentationTable';
import { Theme } from 'web-components/src/theme/muiTheme';

import {
  DOCUMENTATION_TABLE_ARIA_LABEL,
  DOCUMENTATION_TABLE_VIEW_DOCUMENT_TEXT,
  DOCUMENTATION_TABLE_VIEW_LEDGER_TEXT,
  getDocumentationHeadCells,
} from './Documentation.constants';

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
  const { _ } = useLingui();
  const { classes: styles } = useStyles();

  const headCells = useMemo(() => getDocumentationHeadCells(_), [_]);

  return (
    <Section
      classes={{ root: styles.section, title: styles.title }}
      title={_(msg`Documentation`)}
      titleVariant="h2"
      titleAlign="left"
    >
      <DocumentationTable
        className={styles.tableBorder}
        txClient={txClient}
        onViewOnLedger={onViewOnLedger}
        rows={documents}
        headCells={headCells}
        viewLedgerText={_(DOCUMENTATION_TABLE_VIEW_LEDGER_TEXT)}
        viewDocumentText={_(DOCUMENTATION_TABLE_VIEW_DOCUMENT_TEXT)}
        tableAriaLabel={_(DOCUMENTATION_TABLE_ARIA_LABEL)}
      />
    </Section>
  );
}

export { Documentation };
