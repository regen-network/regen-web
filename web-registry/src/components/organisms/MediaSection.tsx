import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import ArticleCard from 'web-components/lib/components/cards/ArticleCard';
import { SliderSection } from 'web-components/lib/components/section/SliderSection';

import { Article } from '../../mocks/cms-duplicates';

interface MediaSectionProps {
  header?: string;
  items: Article[];
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
        items={items.map((item, i) => (
          <ArticleCard
            className={styles.card}
            key={i}
            url={item.url}
            name={item.title}
            author={item.author}
            buttonText={item.btnText}
            imgSrc={item.imgSrc}
            date={item.date}
            play={item.type === 'video'}
          />
        ))}
      />
    </div>
  );
};

export { MediaSection };
