import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { Body, Label, Title } from 'web-components/lib/components/typography';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import { CarbonPlusSectionQuery } from '@/generated/sanity-graphql';
import { ApolloQueryResult } from '@apollo/client';
import { useCarbonPlusStyles } from './Home.CarbonPlus.styles';
import Image from 'next/image';

type Props = {
  carbonPlusData?: ApolloQueryResult<CarbonPlusSectionQuery>;
};

const CarbonplusSection: React.FC = ({
  carbonPlusData,
}: Props): JSX.Element => {
  const content = carbonPlusData?.data.allHomePageWeb[0].carbonPlusSection;
  const { classes: styles } = useCarbonPlusStyles();

  return (
    <div className={styles.root}>
      <Grid className={styles.grid} container wrap="nowrap">
        <Grid item xs={12} className={styles.text}>
          <Label sx={{ pb: [5, 7] }}>
            <Box component="span" sx={{ color: 'info.main' }}>
              {content?.smallHeaderFeatured}{' '}
            </Box>
            <Box component="span" sx={{ color: 'info.main' }}>
              {ReactHtmlParser(content?.smallHeaderCreditName || '')}
            </Box>
          </Label>
          <Title variant="h3">{ReactHtmlParser(content?.header || '')}</Title>
          <Body size="lg" sx={{ color: 'info.dark', py: [4, 6] }}>
            {ReactHtmlParser(content?.description || '')}
          </Body>
          <ContainedButton
            size="large"
            className={styles.button}
            href={content?.linkUrl || ''}
            sx={{ width: 'fit-content' }}
          >
            {content?.linkText}
          </ContainedButton>
        </Grid>
        <Grid className={styles.imageContainer} item xs={12}>
          <Image
            className={styles.image}
            src="/images/home/marketplace-preview.png"
            alt="Regen marketplace preview"
            width={650}
            height={646}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CarbonplusSection;
