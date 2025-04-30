import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';

export const getEcocreditsQueryKey = ({
  address,
  paginationParams,
  creditClassId,
}: {
  address?: string;
  paginationParams?: TablePaginationParams;
  creditClassId?: string;
}) => ['ecocredits', address, paginationParams, creditClassId] as const;
