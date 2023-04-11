import { Box, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import clsx from 'clsx';
import Card from 'web-components/lib/components/cards/Card';
import { Body, Label, Title } from 'web-components/lib/components/typography';

import { ClimateSectionQuery } from '@/generated/sanity-graphql';
import { ApolloQueryResult } from '@apollo/client';
import { homeStyles } from '../common/Home.styles';
import { useClimateStyles } from './Home.Climate.styles';
import Image from 'next/image';

const GREEN_WORDS_DESC = 2;

type Props = {
  climateData?: ApolloQueryResult<ClimateSectionQuery>;
};

const ClimateSection = ({ climateData }: Props): JSX.Element => {
  const { classes: styles } = useClimateStyles();
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const content = climateData?.data.allHomePageWeb[0].climateSection;

  const descriptionGradient = content?.description
    ?.split(' ')
    .slice(0, GREEN_WORDS_DESC)
    .join(' ');
  const descriptionNormal = content?.description
    ?.split(' ')
    .slice(GREEN_WORDS_DESC)
    .join(' ');

  return (
    <Box
      sx={[
        {
          backgroundImage: {
            xs: 'url(images/home/climate-bg-mobile.jpg)',
            sm: 'url(images/home/climate-bg.jpg)',
          },
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'grey.50',
          backgroundPosition: { xs: 'left 70%', sm: 'center' },
          backgroundSize: 'cover',
        },
      ]}
    >
      <Box
        className={styles.root}
        sx={{
          position: 'relative',
          pt: { xs: 20.75, md: 9 },
          color: 'info.dark',
        }}
      >
        <hr className={clsx(styles.line, styles.problemLine)} />
        <Card
          className={clsx(styles.card, styles.problemCard)}
          borderColor="grey.100"
          borderRadius="10px"
        >
          <Label size="sm">{content?.problem?.title}</Label>
          <Body size="lg" sx={{ pt: 2 }}>
            {content?.problem?.body}
          </Body>
        </Card>
        <Image
          src={String(content?.image?.asset?.url)}
          width={Number(content?.image?.asset?.metadata?.dimensions?.width)}
          height={Number(content?.image?.asset?.metadata?.dimensions?.height)}
          alt="Map"
          className={styles.image}
        />
        {!downMd && <hr className={clsx(styles.line, styles.solutionLine)} />}
        <Card
          className={clsx(styles.card, styles.solutionCard)}
          borderColor="grey.100"
          borderRadius="10px"
        >
          <Label size="sm" color="info.dark">
            {content?.solution?.title}
          </Label>
          <Body size="lg" pt={2}>
            {content?.solution?.body}
          </Body>
          {downMd && <hr className={clsx(styles.line, styles.solutionLine)} />}
        </Card>
        <div className={styles.titleContainer}>
          <Title
            variant="h1"
            mobileVariant="h4"
            sx={{ color: 'black', pb: { xs: 3, md: 4 }, maxWidth: 747 }}
          >
            {content?.header}
          </Title>
          <Title
            variant="h3"
            mobileVariant="h5"
            sx={{ color: 'info.main', maxWidth: 727 }}
          >
            <Box
              href="https://regennetwork.notion.site/Welcome-to-Regen-Registry-0d55aab2a2d64f27aee2a468df172990"
              target="_blank"
              component="a"
              sx={homeStyles.greenGradient}
            >
              {`${descriptionGradient} `}
            </Box>
            {descriptionNormal}
          </Title>
        </div>
      </Box>
    </Box>
  );
};

export default ClimateSection;
