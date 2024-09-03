import ArticleCard from 'web-components/src/components/cards/ArticleCard/ArticleCard';
import Section from 'web-components/src/components/section';
import ResponsiveSlider from 'web-components/src/components/sliders/ResponsiveSlider';

import { useFeaturedSectionStyles } from './FeaturedSection.styles';

import { PressKitFeaturedSectionFieldsFragment } from '@/generated/sanity-graphql';
import {
  ARTICLE_CARD_BTN_TEXT_MAPPING,
  DRAFT_TEXT,
} from '@/lib/constants/shared.constants';
import { ArticleType } from 'web-components/src/components/cards/ArticleCard/ArticleCard.types';

type Props = {
  featuredSectionData?: PressKitFeaturedSectionFieldsFragment['featuredSection'];
};

const FeaturedSection = ({ featuredSectionData }: Props): JSX.Element => {
  const { classes: styles } = useFeaturedSectionStyles();

  const items: JSX.Element[] = (featuredSectionData?.articles || []).map(
    item => (
      <ArticleCard
        name={item?.title || ''}
        type={(item?.type as ArticleType) || 'article'}
        imgSrc={item?.image?.image?.asset?.url || ''}
        author={item?.author || ''}
        date={item?.date || ''}
        url={item?.href || ''}
        key={item?.title}
        draftText={DRAFT_TEXT}
        btnTextMapping={ARTICLE_CARD_BTN_TEXT_MAPPING}
      />
    ),
  );

  return (
    <Section
      withSlider
      title={featuredSectionData?.header || ''}
      classes={{ title: styles.title }}
    >
      <ResponsiveSlider
        infinite={false}
        className={styles.slider}
        slidesToShow={3}
        items={items}
      />
    </Section>
  );
};

export default FeaturedSection;
