import { Document } from 'generated/graphql';
import {
  createAscSortHandler,
  createDescSortHandler,
} from 'lib/sort/createSortHandler';

export type DocumentsSortType =
  | 'default'
  | 'name-asc'
  | 'name-desc'
  | 'type-asc'
  | 'type-desc'
  | 'date-asc'
  | 'date-desc';

const asc = createAscSortHandler<Document>();
const desc = createDescSortHandler<Document>();

export const sortDocuments = (
  documents: Document[],
  sort: DocumentsSortType,
): Document[] => {
  switch (sort) {
    case 'name-asc':
      return documents.sort(asc('name'));
    case 'name-desc':
      return documents.sort(desc('name'));
    case 'type-asc':
      return documents.sort(asc('type'));
    case 'type-desc':
      return documents.sort(desc('type'));
    case 'date-asc':
      return documents.sort(asc('date'));
    case 'date-desc':
      return documents.sort(desc('date'));
    default:
      return documents;
  }
};
