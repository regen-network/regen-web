import { useMediaQuery, useTheme } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';

import Section from 'web-components/src/components/section';
import { Body, Title } from 'web-components/src/components/typography';

import { useTokenPoolStyles } from './TokenPool.styles';

import { BackgroundImage } from '@/components/organisms/BackgroundImage/BackgroundImage';
import { TokenPoolSectionFieldsFragment } from '@/generated/sanity-graphql';
import topoBgPortrait from '@/public/images/token/topo-bg-portrait.jpg';

type Props = {
  tokenPoolData?: TokenPoolSectionFieldsFragment['poolSection'];
};

const TokenPool = ({ tokenPoolData }: Props): JSX.Element => {
  const { classes: styles } = useTokenPoolStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <BackgroundImage src={topoBgPortrait} className={styles.root}>
      {isMobile ? (
        <div className={styles.container}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.image}
            src={String(tokenPoolData?.mobileImage?.asset?.url)}
            alt={String(tokenPoolData?.mobileImage?.asset?.altText)}
          />
        </div>
      ) : (
        <Section
          title={
            <Title variant="h2" mobileVariant="h3">
              {tokenPoolData?.title}
            </Title>
          }
          classes={{
            root: clsx(styles.container, styles.center),
            title: styles.title,
          }}
        >
          <Body
            sx={{
              width: ['100%', '80%'],
              maxWidth: 946,
              mt: 4,
              mb: 8,
              textAlign: 'center',
            }}
          >
            {tokenPoolData?.subtitle}
          </Body>
          <Image
            className={styles.image}
            src={String(tokenPoolData?.image?.asset?.url)}
            alt={String(tokenPoolData?.image?.asset?.altText)}
            width={Number(
              tokenPoolData?.image?.asset?.metadata?.dimensions?.width,
            )}
            height={Number(
              tokenPoolData?.image?.asset?.metadata?.dimensions?.height,
            )}
          />
        </Section>
      )}
    </BackgroundImage>
  );
};
export default TokenPool;
