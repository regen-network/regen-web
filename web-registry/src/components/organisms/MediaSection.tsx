import React from 'react';
import { makeStyles } from '@mui/styles';

import ArticleCard from 'web-components/lib/components/cards/ArticleCard';
import { SliderSection } from 'web-components/lib/components/section/SliderSection';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { getFormattedDate } from 'web-components/lib/utils/format';

import { Maybe, MediaFieldsFragment } from '../../generated/sanity-graphql';
import { getSanityImgSrc } from '../../lib/imgSrc';

interface MediaSectionProps {
  header?: string;
  items?: Maybe<Array<Maybe<MediaFieldsFragment>>>;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '10px',
  },
}));

const MediaSection: React.FC<MediaSectionProps> = ({ header, items }) => {
  const styles = useStyles();

  return (
    <div>
      <SliderSection
        title={header || 'Resources'}
        items={
          items?.map((item, i) => (
            <ArticleCard
              className={styles.card}
              key={i}
              url={item?.href || ''}
              name={item?.title || ''}
              author={item?.author || ''}
              type={item?.type || ''}
              imgSrc={getSanityImgSrc(item?.image)}
              date={getFormattedDate(item?.date)}
              play={item?.type === 'video'}
            />
          )) || []
        }
      />
    </div>
  );
};

export { MediaSection };
