import Image from 'next/image';

import Section from 'web-components/src/components/section';
import ResponsiveSlider from 'web-components/src/components/sliders/ResponsiveSlider';
import { Title } from 'web-components/src/components/typography';

import { useAwardsStyles } from './AwardsSection.styles';

import { PressKitAwardsSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  awardsSectionData?: PressKitAwardsSectionFieldsFragment['awardsSection'];
};

const AwardsSection = ({ awardsSectionData }: Props): JSX.Element => {
  const { classes: styles } = useAwardsStyles();
  const items: JSX.Element[] = (awardsSectionData?.items || []).map(item => (
    <a
      href={item?.link || ''}
      key={item?.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={String(item?.image?.asset?.url)}
          alt={String(item?.image?.asset?.altText)}
          width={479}
          height={319}
        />
      </div>
      <Title variant="h5" sx={{ pt: [4, 4.5] }} color="black">
        {item?.title}
      </Title>
    </a>
  ));

  return (
    <Section
      withSlider
      title={awardsSectionData?.header || ''}
      classes={{ title: styles.title }}
    >
      <ResponsiveSlider
        infinite={false}
        className={styles.slider}
        slidesToShow={4}
        items={items}
      />
    </Section>
  );
};

export default AwardsSection;
