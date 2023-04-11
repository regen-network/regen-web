import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Section from 'web-components/lib/components/section';
import Tooltip from 'web-components/lib/components/tooltip';
import { Body, Label, Title } from 'web-components/lib/components/typography';

import { MarketplaceSectionQuery } from '@/generated/sanity-graphql';
import { ApolloQueryResult } from '@apollo/client';
import { homeStyles } from '../common/Home.styles';
import { useMarketplaceStyles } from './Home.Marketplace.styles';
import Image from 'next/image';

type Props = {
  marketplaceData?: ApolloQueryResult<MarketplaceSectionQuery>;
};

const MarketplaceSection = ({ marketplaceData }: Props) => {
  const { classes: styles } = useMarketplaceStyles();
  const data = marketplaceData?.data.allHomePageWeb[0].marketplaceSection;

  return (
    <Section classes={{ root: styles.root }}>
      <div className={styles.inner}>
        <Label size="lg" sx={{ color: 'info.main', mb: 5 }}>
          {data?.header}
        </Label>
        <Title variant="h2" align="center">
          <Box
            href="https://app.regen.network/"
            target="_blank"
            component="a"
            sx={homeStyles.greenGradient}
          >
            {data?.body?.green}{' '}
          </Box>
          {data?.body?.middle}{' '}
          <Tooltip arrow placement="top" title={data?.tooltip || ''}>
            <span className={styles.popover}>{data?.body?.popover}</span>
          </Tooltip>{' '}
          {data?.body?.end}
        </Title>
        <Grid container spacing={3}>
          {data?.callToActions?.map((cta, i) => {
            return !cta ? null : (
              <Grid key={cta.header || i} className={styles.gridItem} item xs>
                <Image
                  src={String(cta.image?.asset?.url)}
                  alt={String(cta.caption)}
                  width={Number(cta.image?.asset?.metadata?.dimensions?.width)}
                  height={Number(
                    cta.image?.asset?.metadata?.dimensions?.height,
                  )}
                  style={{ width: '159px', height: 'auto' }}
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
