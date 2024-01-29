import { Box, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import clsx from 'clsx';
import Image from 'next/image';

import Card from 'web-components/src/components/cards/Card';
import { Body, Label, Title } from 'web-components/src/components/typography';

import { homeStyles } from '../common/Home.styles';
import { useClimateStyles } from './Home.Climate.styles';

import { ClimateSectionFieldsFragment } from '@/generated/sanity-graphql';

const GREEN_WORDS_DESC = 2;

type Props = {
  climateData?: ClimateSectionFieldsFragment['climateSection'];
};

const ClimateSection = ({ climateData }: Props): JSX.Element => {
  const { classes: styles } = useClimateStyles();
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));

  const descriptionGradient = climateData?.description
    ?.split(' ')
    .slice(0, GREEN_WORDS_DESC)
    .join(' ');
  const descriptionNormal = climateData?.description
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
          <Label size="sm">{climateData?.problem?.title}</Label>
          <Body size="lg" sx={{ pt: 2 }}>
            {climateData?.problem?.body}
          </Body>
        </Card>
        <Image
          src={String(climateData?.image?.asset?.url)}
          width={Number(climateData?.image?.asset?.metadata?.dimensions?.width)}
          height={Number(
            climateData?.image?.asset?.metadata?.dimensions?.height,
          )}
          sizes="(max-width: 1024px) 100vw, 60vw"
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
            {climateData?.solution?.title}
          </Label>
          <Body size="lg" pt={2}>
            {climateData?.solution?.body}
          </Body>
          {downMd && <hr className={clsx(styles.line, styles.solutionLine)} />}
        </Card>
        <div className={styles.titleContainer}>
          <Title
            variant="h1"
            mobileVariant="h4"
            sx={{ color: 'black', pb: { xs: 3, md: 4 }, maxWidth: 747 }}
          >
            {climateData?.header}
          </Title>
          <Title
            variant="h3"
            mobileVariant="h5"
            sx={{ color: 'info.main', maxWidth: 727 }}
          >
            <Box
              href="https://registry.regen.network/"
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
