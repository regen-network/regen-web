import Image from 'next/image';

import { Title } from 'web-components/lib/components/typography';

import { useTopSectionStyles } from './TopSection.styles';

import BackgroundSection from '@/components/organisms/BackgroundSection/BackgroundSection';
import { TokenTopSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  topSectionData?: TokenTopSectionFieldsFragment['topSection'];
};

const TopSection = ({ topSectionData }: Props): JSX.Element => {
  const { classes: styles } = useTopSectionStyles();
  const data = topSectionData;
  // background = aurora

  return (
    <BackgroundSection
      className={styles.section}
      linearGradient="linear-gradient(180deg, #000000 6.73%, rgba(0, 0, 0, 0) 30.65%), linear-gradient(209.83deg, rgba(250, 235, 209, 0.8) 11.05%, rgba(125, 201, 191, 0.8) 43.17%, rgba(81, 93, 137, 0.8) 75.29%)"
      header={
        <div className={styles.header}>
          <Image
            src="/images/token/regen-token.svg"
            className={styles.token}
            alt="Regen token"
            title="Regen Token"
            width={70}
            height={70}
          />
          <Title color="primary" variant="h1">
            {data?.title}
          </Title>
        </div>
      }
      body={data?.body}
      imageSrc={'/images/token/token-aurora.png'}
    />
  );
};

export default TopSection;
