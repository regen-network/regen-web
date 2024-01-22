import Image from 'next/image';

import { ImageItemProps } from 'web-components/src/components/image-item';
import Section from 'web-components/src/components/section';
import ImageItems from 'web-components/src/components/sliders/ImageItems';

import { useValuesStyles } from './Home.Values.styles';

import { ValuesSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  valuesData?: ValuesSectionFieldsFragment['valuesSection'];
};

const HomeValues = ({ valuesData }: Props) => {
  const { classes: styles } = useValuesStyles();

  const imageItems: ImageItemProps[] = (valuesData?.imageItems || []).map(
    item => {
      return {
        title: item?.title || '',
        description: item?.description || '',
        img: (
          <Image
            src={String(item?.image?.asset?.url)}
            alt={item?.title || ''}
            width={200}
            height={200}
          />
        ),
      };
    },
  ) as ImageItemProps[];

  return (
    <Section
      withSlider
      className={styles.root}
      titleVariant="h1"
      titleLineHeight="130%"
      title={valuesData?.header || ''}
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
