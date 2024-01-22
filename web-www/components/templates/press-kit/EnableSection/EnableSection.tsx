import Grid from '@mui/material/Grid';
import Image from 'next/image';

import { Body, Title } from 'web-components/src/components/typography';

import { useEnableStyles } from './EnableSection.styles';

import { BlockContent } from 'web-components/src/components/block-content';
import { PressKitEnableSectionFieldsFragment } from '@/generated/sanity-graphql';
import pressKitTopoBg from '@/public/images/press-kit/image-topo-bg.jpg';

type Props = {
  enableSectionData?: PressKitEnableSectionFieldsFragment['enableSection'];
};

const EnableSection = ({ enableSectionData }: Props): JSX.Element => {
  const { classes: styles } = useEnableStyles();

  return (
    <div className={styles.root}>
      <Grid container alignItems="center">
        <Grid xs={12} item className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={String(enableSectionData?.image?.image?.asset?.url)}
            alt={enableSectionData?.image?.image?.asset?.altText ?? ''}
            width={Number(
              enableSectionData?.image?.image?.asset?.metadata?.dimensions
                ?.width,
            )}
            height={Number(
              enableSectionData?.image?.image?.asset?.metadata?.dimensions
                ?.height,
            )}
            sizes="(max-width: 834px) 100vw, 50vw"
          />
          <div className={styles.imageBackground}>
            <Image
              src={pressKitTopoBg}
              placeholder="blur"
              sizes="100vw"
              alt=""
              fill
            />
          </div>
        </Grid>
        <Grid xs={12} item className={styles.text}>
          <Title variant="h2">{enableSectionData?.title}</Title>
          <Body as="div" size="lg" sx={{ pt: [4, 7] }}>
            <BlockContent content={enableSectionData?.bodyRaw} />
          </Body>
        </Grid>
      </Grid>
    </div>
  );
};

export default EnableSection;
