import React, { useMemo } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { makeStyles } from 'tss-react/mui';

import ArticleCard from 'web-components/src/components/cards/ArticleCard/ArticleCard';
import { ArticleType } from 'web-components/src/components/cards/ArticleCard/ArticleCard.types';
import { SliderSection } from 'web-components/src/components/section/SliderSection';
import { Theme } from 'web-components/src/theme/muiTheme';
import { getFormattedDate } from 'web-components/src/utils/format';

import { Maybe, MediaFieldsFragment } from '../../generated/sanity-graphql';
import { getSanityImgSrc } from '../../lib/imgSrc';

interface MediaSectionProps {
  header?: string;
  items?: Maybe<Array<Maybe<MediaFieldsFragment>>>;
}

const useStyles = makeStyles()((theme: Theme) => ({
  card: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '10px',
  },
}));

const MediaSection: React.FC<React.PropsWithChildren<MediaSectionProps>> = ({
  header,
  items,
}) => {
  const { _ } = useLingui();
  const { classes: styles } = useStyles();

  const btnTextMapping: Record<ArticleType, string> = useMemo(
    () => ({
      video: _(msg`watch video`),
      article: _(msg`read article`),
      podcast: _(msg`listen to podcast`),
    }),
    [_],
  );

  return (
    <div>
      <SliderSection
        title={header || _(msg`Resources`)}
        items={
          items?.map((item, i) => (
            <ArticleCard
              draftText={_(msg`Draft`)}
              className={styles.card}
              key={i}
              url={item?.href || ''}
              name={item?.title || ''}
              author={item?.author || ''}
              type={(item?.type as ArticleType) ?? 'article'}
              imgSrc={getSanityImgSrc(item?.image)}
              date={getFormattedDate(item?.date)}
              play={item?.type === 'video'}
              btnTextMapping={btnTextMapping}
            />
          )) || []
        }
      />
    </div>
  );
};

export { MediaSection };
