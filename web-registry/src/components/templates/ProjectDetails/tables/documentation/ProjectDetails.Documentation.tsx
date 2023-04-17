import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import EmptyState from 'web-components/lib/components/empty-state';
import DocumentIcon from 'web-components/lib/components/icons/DocumentIcon';
import EmptyCartIcon from 'web-components/lib/components/icons/EmptyCartIcon';
import {
  ActionsTable,
  SortCallbacksType,
  TablePaginationParams,
} from 'web-components/lib/components/table/ActionsTable';

import { Document, Maybe } from 'generated/graphql';
import { UseStateSetter } from 'types/react/use-state';

import { DOCUMENTATION_ROW } from './ProjectDetails.Documentation.config';
import { VIEW_DOCUMENT } from './ProjectDetails.Documentation.constants';
import getDocumentationTableRow from './ProjectDetails.Documentation.Row';

type Props = {
  documents: Maybe<Document>[];
  sortCallbacks?: SortCallbacksType;
  onTableChange?: UseStateSetter<TablePaginationParams>;
};

export const ProjectDetailsDocumentationTable = ({
  documents,
  sortCallbacks = [],
  onTableChange,
}: Props): JSX.Element => {
  const hasSellOrders = documents.length > 0;
  return (
    <>
      {hasSellOrders && (
        <ActionsTable
          tableLabel="Project documentation"
          headerRows={DOCUMENTATION_ROW}
          rows={documents.map(document =>
            getDocumentationTableRow({ document }),
          )}
          sortCallbacks={sortCallbacks}
          renderActionButtons={(i: number) => (
            <OutlinedButton startIcon={<DocumentIcon />}>
              {VIEW_DOCUMENT}
            </OutlinedButton>
          )}
          onTableChange={onTableChange}
        />
      )}
      {!hasSellOrders && (
        <EmptyState
          message={'No documentation found'}
          icon={<EmptyCartIcon sx={{ fontSize: 84, fill: 'none' }} />}
        />
      )}
    </>
  );
};
