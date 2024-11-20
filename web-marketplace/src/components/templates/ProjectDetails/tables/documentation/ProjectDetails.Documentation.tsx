import { useMemo } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, Link } from '@mui/material';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import CertifiedDocumentIcon from 'web-components/src/components/icons/CertifiedDocumentIcon';
import {
  ActionsTable,
  SortCallbacksType,
  TablePaginationParams,
} from 'web-components/src/components/table/ActionsTable';

import { Document } from 'generated/graphql';
import { UseStateSetter } from 'types/react/use-state';
import {
  ACTIONS_TABLE_ACTIONS_TEXT,
  getLabelDisplayedRows,
} from 'lib/constants/shared.constants';
import { IS_REGEN } from 'lib/env';

import { DOCUMENTATION_ROW } from './ProjectDetails.Documentation.config';
import { DOCUMENT, VIEW } from './ProjectDetails.Documentation.constants';
import getDocumentationTableRow from './ProjectDetails.Documentation.Row';

type Props = {
  documents: Document[];
  sortCallbacks?: SortCallbacksType;
  onTableChange?: UseStateSetter<TablePaginationParams>;
};

export const ProjectDetailsDocumentationTable = ({
  documents,
  sortCallbacks = [],
  onTableChange,
}: Props): JSX.Element => {
  const { _ } = useLingui();
  const labelDisplayedRows = useMemo(
    () =>
      getLabelDisplayedRows({
        _,
        rowsLength: documents?.length ?? 0,
      }),
    [_, documents?.length],
  );

  return (
    <ActionsTable
      actionButtonsText={_(ACTIONS_TABLE_ACTIONS_TEXT)}
      tableLabel={_(msg`Project documentation`)}
      labelDisplayedRows={labelDisplayedRows}
      headerRows={DOCUMENTATION_ROW}
      rows={documents.map(document => getDocumentationTableRow({ document }))}
      sortCallbacks={sortCallbacks}
      dark={IS_REGEN}
      renderActionButtons={(i: number) => (
        <OutlinedButton
          LinkComponent={Link}
          href={documents[i]?.url}
          target="_blank"
          startIcon={
            <CertifiedDocumentIcon className="text-sc-icon-credibility-100-blue-green-gradient-500" />
          }
          size="small"
        >
          <div className="text-sc-icon-credibility-100-blue-green-gradient-500 flex items-center">
            <Box>{VIEW}</Box>
            <Box
              sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}
            >{`${DOCUMENT}`}</Box>
          </div>
        </OutlinedButton>
      )}
      onTableChange={onTableChange}
      sx={{ root: { borderRadius: '0 0 8px 8px' } }}
    />
  );
};
