import Image from 'next/image';

import { Title } from 'web-components/src/components/typography';

import {
  tokenTopSectionGradient,
  useTopSectionStyles,
} from './TopSection.styles';

import BackgroundSection from '@/components/organisms/BackgroundSection/BackgroundSection';
import { TokenTopSectionFieldsFragment } from '@/generated/sanity-graphql';
import tokenAuroraImage from '@/public/images/token/token-aurora.jpg';

type Props = {
  topSectionData?: TokenTopSectionFieldsFragment['topSection'];
};

const TopSection = ({ topSectionData }: Props): JSX.Element => {
  const { classes: styles } = useTopSectionStyles();
  const data = topSectionData;

  return (
    <BackgroundSection
      className={styles.section}
      linearGradient={tokenTopSectionGradient}
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
      imageSrc={tokenAuroraImage}
    />
  );
};

export default TopSection;
