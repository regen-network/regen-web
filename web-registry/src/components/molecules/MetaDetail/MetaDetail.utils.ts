import { formatDuration } from 'date-fns';

export function fromISO8601(iso8601Duration: string) {
  const iso8601DurationRegex =
    /(-)?P(-)?(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/;
  var matches = iso8601Duration.match(iso8601DurationRegex);
  const duration = {
    years: Number(matches?.[3]) ?? 0,
    months: Number(matches?.[4]) ?? 0,
    weeks: Number(matches?.[5]) ?? 0,
    days: Number(matches?.[6]) ?? 0,
    hours: Number(matches?.[7]) ?? 0,
    minutes: Number(matches?.[8]) ?? 0,
    seconds: Number(matches?.[9]) ?? 0,
  };

  return `${
    matches?.[1] === '-' || matches?.[2] === '-' ? 'Previous ' : ''
  }${formatDuration(duration)}`;
}
