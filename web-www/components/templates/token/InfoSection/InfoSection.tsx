import { CardContent } from '@mui/material';
import Image from 'next/image';

import { BlockContent } from 'web-components/src/components/block-content';
import Card from 'web-components/src/components/cards/Card';
import Section from 'web-components/src/components/section';
import {
  Body,
  Subtitle,
  Title,
} from 'web-components/src/components/typography';

import { useInfoSectionStyles } from './InfoSection.styles';

import { TokenInfoSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  tokenInfoData?: TokenInfoSectionFieldsFragment['infoSection'];
};
const TokenInfoSection = ({ tokenInfoData }: Props): JSX.Element => {
  const { classes: styles } = useInfoSectionStyles();

  return (
    <Section>
      <Card className={styles.card}>
        <figure className={styles.image}>
          <Image
            src={tokenInfoData?.image?.image?.asset?.url ?? ''}
            title={tokenInfoData?.image?.imageAlt ?? ''}
            alt={tokenInfoData?.image?.imageAlt ?? ''}
            fill
          />
        </figure>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 10,
            px: [4.5, 10],
          }}
        >
          <Title variant="h3">{tokenInfoData?.title}</Title>
          <Subtitle size="lg" color="info.main" my={4}>
            {tokenInfoData?.subtitle}
          </Subtitle>
          <Body as="div" size="xl" sx={{ mb: { xs: 0, lg: 10 } }}>
            <BlockContent content={tokenInfoData?.bodyRaw} />
          </Body>
        </CardContent>
      </Card>
    </Section>
  );
};

export default TokenInfoSection;
