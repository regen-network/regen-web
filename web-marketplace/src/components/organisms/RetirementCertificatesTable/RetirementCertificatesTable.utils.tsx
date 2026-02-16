import { formatDate } from 'web-components/src/utils/format';

import { getCreditBatchPath } from 'lib/bridge';

import { GreyText, Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';

export const getBatchIds = (batchIds: string[]) => {
  return batchIds.map((batchId: string, index: number) => (
    <WithLoader isLoading={!batchId} variant="skeleton" key={index}>
      <Link href={getCreditBatchPath(batchId)}>{batchId}</Link>
    </WithLoader>
  ));
};

export const getBatchDate = (dates: string[]) => {
  return dates.map((date, index) => (
    <GreyText key={`date-${index}`} className="whitespace-nowrap">
      {formatDate(date)}
    </GreyText>
  ));
};
