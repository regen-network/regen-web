import { CLASS_KEY } from './getClassQuery.constants';

type GetBalanceQueryKeyParams = {
  classId?: string;
};

export const getClassQueryKey = ({
  classId,
}: GetBalanceQueryKeyParams): string[] => [CLASS_KEY, classId ?? ''];
