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
  return (
    <ActionsTable
      tableLabel="Project documentation"
      headerRows={DOCUMENTATION_ROW}
      rows={documents.map(document => getDocumentationTableRow({ document }))}
      sortCallbacks={sortCallbacks}
      renderActionButtons={(i: number) => (
        <OutlinedButton
          LinkComponent={Link}
          href={documents[i]?.url}
          target="_blank"
          startIcon={<CertifiedDocumentIcon />}
          size="small"
        >
          <Box>{VIEW}</Box>
          <Box
            sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}
          >{`${DOCUMENT}`}</Box>
        </OutlinedButton>
      )}
      onTableChange={onTableChange}
      sx={{ root: { borderRadius: '0 0 8px 8px' } }}
    />
  );
};
