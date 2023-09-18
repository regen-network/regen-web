type GetBatchesByClassKey = {
  classId: string;
  offset: string;
  limit: string;
};

export const getBatchesByClassKey = ({
  classId,
  offset,
  limit,
}: GetBatchesByClassKey): string[] => [
  'batchesByClass',
  classId,
  offset,
  limit,
];
