import { formatDate } from 'web-components/lib/utils/format';

export const getDateCriteria = (
  minStartDate?: string,
  startDateWindow?: string,
): string => {
  if (minStartDate) return formatDate(minStartDate);
  if (startDateWindow) return `${startDateWindow} rolling acceptance window`;
  return '-';
};
