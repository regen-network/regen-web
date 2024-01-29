import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { Body, Title } from 'web-components/src/components/typography';

import { homeStyles } from '../common/Home.styles';
import { useLedgerStyles } from './Home.Ledger.styles';

import { LedgerSectionFieldsFragment } from '@/generated/sanity-graphql';
import homeLedger from '@/public/images/home/ledger.png';

type Props = {
  ledgerDescription?: LedgerSectionFieldsFragment['ledgerDescription'];
};

const HomeLedger = ({ ledgerDescription }: Props) => {
  const { classes: styles } = useLedgerStyles();

  return (
    <Box
      component="section"
      sx={{
        backgroundImage: 'url(/images/home/farm-background.jpg)',
        backgroundSize: 'cover',
      }}
    >
      <Grid className={styles.grid} container alignItems="center" wrap="nowrap">
        <Grid className={styles.imgContainer} item xs={12}>
          <Image
            className={styles.img}
            src={homeLedger}
            placeholder="blur"
            width={539}
            height={206}
            alt="3 blocks connected"
          />
        </Grid>
        <Grid item xs={12} className={styles.text}>
          <Title align="left" variant="h1" className={styles.title}>
            <Box
              href="https://docs.regen.network/"
              target="_blank"
              component="a"
              sx={homeStyles.greenGradient}
            >
              Regen Ledger
            </Box>{' '}
            powers{' '}
            <Box
              href="https://app.regen.network/"
              target="_blank"
              component="a"
              sx={homeStyles.greenGradient}
            >
              Regen Marketplace
            </Box>
          </Title>
          <Body size="xl" mobileSize="md" sx={{ pb: [6, 8.5], pt: [3, 5] }}>
            {ledgerDescription}
          </Body>
          <ContainedButton size="large" href="https://docs.regen.network/">
            Learn More
          </ContainedButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeLedger;
