type GetBatchesByProjectKey = {
  projectId: string;
  offset: string;
  limit: string;
};

export const getBatchesByProjectKey = ({
  projectId,
  offset,
  limit,
}: GetBatchesByProjectKey): string[] => [
  'batchesByProject',
  projectId,
  offset,
  limit,
];
