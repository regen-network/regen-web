import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import Section from 'web-components/src/components/section';
import Tooltip from 'web-components/src/components/tooltip';
import { Body, Label, Title } from 'web-components/src/components/typography';

import { homeStyles } from '../common/Home.styles';
import { useMarketplaceStyles } from './Home.Marketplace.styles';

import { MarketplaceSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  marketplaceData?: MarketplaceSectionFieldsFragment['marketplaceSection'];
};

const MarketplaceSection = ({ marketplaceData }: Props) => {
  const { classes: styles } = useMarketplaceStyles();

  return (
    <Section classes={{ root: styles.root }}>
      <div className={styles.inner}>
        <Label size="lg" sx={{ color: 'info.main', mb: 5 }}>
          {marketplaceData?.header}
        </Label>
        <Title variant="h2" align="center">
          <Box
            href="https://app.regen.network/"
            target="_blank"
            component="a"
            sx={homeStyles.greenGradient}
          >
            {marketplaceData?.body?.green}{' '}
          </Box>
          {marketplaceData?.body?.middle}{' '}
          <Tooltip arrow placement="top" title={marketplaceData?.tooltip || ''}>
            <span className={styles.popover}>
              {marketplaceData?.body?.popover}
            </span>
          </Tooltip>{' '}
          {marketplaceData?.body?.end}
        </Title>
        <Grid container spacing={3}>
          {marketplaceData?.callToActions?.map((cta, i) => {
            return !cta ? null : (
              <Grid key={cta.header || i} className={styles.gridItem} item xs>
                <Image
                  src={String(cta.image?.asset?.url)}
                  alt={String(cta.caption)}
                  width={159}
                  height={159}
                />
                <Label size="md" sx={{ pt: 4 }}>
                  {cta.caption}
                </Label>
                <Title
                  variant="h3"
                  mobileVariant="h5"
                  sx={{ textAlign: 'center', my: 3 }}
                >
                  {cta.header}
                </Title>
                <Body size="xl" mobileSize="md">
                  {cta.description}
                </Body>
                <ContainedButton
                  size="large"
                  href={cta.linkUrl || ''}
                  sx={{ mt: [4, 7] }}
                >
                  {cta.linkText}
                </ContainedButton>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Section>
  );
};

export default MarketplaceSection;
