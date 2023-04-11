import { ImageItemProps } from 'web-components/lib/components/image-item';
import Section from 'web-components/lib/components/section';
import ImageItems from 'web-components/lib/components/sliders/ImageItems';

import { ValuesSectionQuery } from '@/generated/sanity-graphql';
import { ApolloQueryResult } from '@apollo/client';
import { useValuesStyles } from './Home.Values.styles';
import Image from 'next/image';

type Props = {
  valuesData?: ApolloQueryResult<ValuesSectionQuery>;
};

const HomeValues = ({ valuesData }: Props) => {
  const { classes: styles } = useValuesStyles();
  const content = valuesData?.data.allHomePageWeb[0].valuesSection;

  const imageItems: ImageItemProps[] = (content?.imageItems || []).map(item => {
    return {
      title: item?.title || '',
      description: item?.description || '',
      img: (
        <Image
          src={String(item?.image?.asset?.url)}
          alt={item?.title || ''}
          width={Number(item?.image?.asset?.metadata?.dimensions?.width)}
          height={Number(item?.image?.asset?.metadata?.dimensions?.height)}
        />
      ),
    };
  }) as ImageItemProps[];

  return (
    <Section
      withSlider
      className={styles.root}
      titleVariant="h1"
      titleLineHeight="130%"
      title={content?.header || ''}
    >
      <div className={styles.sliderContainer}>
        <ImageItems
          imageClassName={styles.image}
          titleVariant="h3"
          items={imageItems}
        />
      </div>
    </Section>
  );
};

export default HomeValues;
