import {
  DATE_FORMAT_SECONDARY,
  formatDate,
} from 'web-components/src/utils/format';

export function formatCertificateDates(
  startDate: string,
  endDate: string | undefined,
): string {
  const formattedStartDate = formatDate(startDate, DATE_FORMAT_SECONDARY, true);
  const formattedEndDate = formatDate(endDate, DATE_FORMAT_SECONDARY, true);

  return `${formattedStartDate}-${formattedEndDate}`;
}
