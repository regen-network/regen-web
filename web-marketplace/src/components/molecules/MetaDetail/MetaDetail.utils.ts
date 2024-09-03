import { msg } from '@lingui/macro';
import { formatDuration } from 'date-fns';

import { TranslatorType } from 'lib/i18n/i18n.types';

export function fromISO8601(iso8601Duration: string, _: TranslatorType) {
  const iso8601DurationRegex =
    /(-)?P(-)?(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/;
  var matches = iso8601Duration.match(iso8601DurationRegex);
  const duration = {
    years: matches?.[3] ? Number(matches?.[3]) : 0,
    months: matches?.[4] ? Number(matches?.[4]) : 0,
    weeks: matches?.[5] ? Number(matches?.[5]) : 0,
    days: matches?.[6] ? Number(matches?.[6]) : 0,
    hours: matches?.[7] ? Number(matches?.[7]) : 0,
    minutes: matches?.[8] ? Number(matches?.[8]) : 0,
    seconds: matches?.[9] ? Number(matches?.[9]) : 0,
  };
  if (Object.values(duration).findIndex(v => v !== 0) > -1)
    return `${
      matches?.[1] === '-' || matches?.[2] === '-' ? _(msg`Previous `) : ''
    }${formatDuration(duration)}`;
}
