import { useTheme } from '@mui/material';

import ArticleCard from 'web-components/src/components/cards/ArticleCard/ArticleCard';
import Section from 'web-components/src/components/section';
import ResponsiveSlider from 'web-components/src/components/sliders/ResponsiveSlider';
import { Title } from 'web-components/src/components/typography';

import { useMediaSectionStyles } from './MediaSection.styles';

import { TokenMediaSectionFieldsFragment } from '@/generated/sanity-graphql';
import {
  ARTICLE_CARD_BTN_TEXT_MAPPING,
  DRAFT_TEXT,
} from '@/lib/constants/shared.constants';
import { ArticleType } from 'web-components/src/components/cards/ArticleCard/ArticleCard.types';

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
        type={(item?.type as ArticleType) || 'article'}
        imgSrc={item?.image?.image?.asset?.url || ''}
        date={item?.date}
        play={item?.type === 'videos'}
        draftText={DRAFT_TEXT}
        btnTextMapping={ARTICLE_CARD_BTN_TEXT_MAPPING}
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
