import React from 'react';
import { useTheme } from '@mui/material';

import ArticleCard from 'web-components/lib/components/cards/ArticleCard';
import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import { Title } from 'web-components/lib/components/typography';

import { useMediaSectionStyles } from './MediaSection.styles';

import { TokenMediaSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  tokenMediaData?: TokenMediaSectionFieldsFragment;
};

const MediaSection = ({ tokenMediaData }: Props) => {
  const { classes: styles } = useMediaSectionStyles();
  const theme = useTheme();

  const itemCards: JSX.Element[] = (tokenMediaData?.mediaCards || []).map(
    (item, i) => (
      <ArticleCard
        className={styles.card}
        key={i}
        url={item?.href || ''}
        name={item?.title || ''}
        author={item?.author || ''}
        type={item?.type || ''}
        imgSrc={item?.image?.image?.asset?.url || ''}
        date={item?.date}
        play={item?.type === 'videos'}
      />
    ),
  );
  const slidesToShow = itemCards && itemCards.length < 3 ? itemCards.length : 3;

  return itemCards && itemCards?.length > 0 ? (
    <Section className={styles.root}>
      <div className={styles.main}>
        <ResponsiveSlider
          arrows={itemCards.length > 3}
          classes={{
            root: styles.slider,
            headerWrap: styles.headerWrap,
          }}
          itemWidth="90%"
          padding={theme.spacing(2.5)}
          slidesToShow={slidesToShow}
          items={itemCards}
          renderTitle={() => (
            <Title variant="h2" mobileVariant="h3">
              Media
            </Title>
          )}
        />
      </div>
    </Section>
  ) : (
    <></>
  );
};

export default MediaSection;
