import ReactHtmlParser from 'react-html-parser';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { Body, Label, Title } from 'web-components/src/components/typography';

import { useCarbonPlusStyles } from './Home.CarbonPlus.styles';

import { CarbonPlusSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  carbonPlusData?: CarbonPlusSectionFieldsFragment['carbonPlusSection'];
};

const CarbonplusSection = ({ carbonPlusData }: Props): JSX.Element => {
  const { classes: styles } = useCarbonPlusStyles();

  return (
    <div className={styles.root}>
      <Grid className={styles.grid} container wrap="nowrap">
        <Grid item xs={12} className={styles.text}>
          <Label sx={{ pb: [5, 7] }}>
            <Box component="span" sx={{ color: 'info.main' }}>
              {carbonPlusData?.smallHeaderFeatured}{' '}
            </Box>
            <Box component="span" sx={{ color: 'info.main' }}>
              {ReactHtmlParser(carbonPlusData?.smallHeaderCreditName || '')}
            </Box>
          </Label>
          <Title variant="h3">
            {ReactHtmlParser(carbonPlusData?.header || '')}
          </Title>
          <Body size="lg" sx={{ color: 'info.dark', py: [4, 6] }}>
            {ReactHtmlParser(carbonPlusData?.description || '')}
          </Body>
          <ContainedButton
            size="large"
            className={styles.button}
            href={carbonPlusData?.linkUrl || ''}
            sx={{ width: 'fit-carbonPlusData' }}
          >
            {carbonPlusData?.linkText}
          </ContainedButton>
        </Grid>
        <Grid className={styles.imageContainer} item xs={12}>
          <Image
            className={styles.image}
            src={String(carbonPlusData?.image?.image?.asset?.url)}
            alt={carbonPlusData?.image?.image?.asset?.altText ?? ''}
            width={862}
            height={742}
            priority
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CarbonplusSection;
