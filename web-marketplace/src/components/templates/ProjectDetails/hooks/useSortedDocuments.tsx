import { useState } from 'react';

import { Order } from 'web-components/src/components/table/Table.utils';

import { Document, Maybe } from 'generated/graphql';

import { DOCUMENTATION_MAPPING } from '../tables/documentation/ProjectDetails.Documentation.constants';
import {
  DocumentsSortType,
  sortDocuments,
} from '../tables/documentation/ProjectDetails.documentation.sort';

type Params = {
  projectDocs?: Maybe<Document>[];
};

export const useSortedDocuments = ({ projectDocs = [] }: Params) => {
  const [sort, setSort] = useState<DocumentsSortType>('date-desc');
  const documents = projectDocs?.map(doc => doc as Document);
  const sortCallbacksDocuments = Object.values(DOCUMENTATION_MAPPING).map(
    header =>
      header.sortEnabled
        ? (order: Order) =>
            setSort(`${header.sortKey}-${order}` as DocumentsSortType)
        : undefined,
  );
  const sortedDocuments = sortDocuments(documents, sort);

  return {
    sortedDocuments,
    sortCallbacksDocuments,
  };
};
