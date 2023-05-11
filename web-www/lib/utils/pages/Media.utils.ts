import { uppercase } from '../string/uppercase';

import { Maybe, Media, MediaPageQuery } from '@/generated/sanity-graphql';

/* getMediaCategories */

export const getMediaCategories = (types: (Maybe<string> | undefined)[]) => [
  {
    value: 'all',
    label: 'All',
  },
  ...types.map(c => ({
    value: c,
    label: uppercase(c as string),
  })),
];

type ItemMap = {
  [type: string]: Media[];
};

/* getMediaGrouped */

export const getMediaGrouped = (items: MediaPageQuery['allMedia']): ItemMap =>
  [...items]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce((acc: ItemMap, item) => {
      const type = item.type || 'all';
      if (acc[type]) {
        acc[type].push(item as Media);
      } else {
        acc[type] = [item as Media];
      }
      return acc;
    }, {});
