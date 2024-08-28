import React from 'react';
import { Trans } from '@lingui/macro';
import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';

import { BlockContent } from 'web-components/src/components/block-content';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import GreenCard from 'web-components/src/components/cards/GreenCard';
import { Image } from 'web-components/src/components/image';
import Section from 'web-components/src/components/section';
import { Body, Title } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

import { FeaturedSection as FeaturedSectionProps } from '../../generated/sanity-graphql';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(22.5),
  },
  button: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: '65%',
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(7),
      paddingLeft: theme.spacing(7),
    },
  },
  card: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(8),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(10),
    },
  },
}));

interface Props {
  content: FeaturedSectionProps;
}

const FeaturedSection: React.FC<React.PropsWithChildren<Props>> = ({
  content,
}) => {
  const { classes: styles } = useStyles();

  if (
    content?.header &&
    content.titleRaw &&
    content.descriptionRaw &&
    content.button &&
    content.image
  ) {
    return (
      <Section className={styles.root} title={content.header}>
        <div className={styles.card}>
          <GreenCard>
            <Grid
              container
              wrap="nowrap"
              sx={{
                flexDirection: {
                  xs: 'column-reverse',
                  tablet: 'row',
                },
              }}
            >
              <Grid item xs={12} sx={{ pr: { sm: 10 } }}>
                <Title
                  as="div"
                  variant="h3"
                  sx={{
                    mb: 4.5,
                    pt: {
                      xs: 5,
                      tablet: 0,
                    },
                  }}
                >
                  <BlockContent content={content.titleRaw} />
                </Title>
                <Body as="div" size="lg" mobileSize="sm" sx={{ pb: [4.5, 7] }}>
                  <BlockContent content={content.descriptionRaw} />
                </Body>
                <ContainedButton
                  size="large"
                  href={content?.button?.buttonLink?.buttonHref || ''}
                  className={styles.button}
                >
                  <Trans>more details</Trans>
                </ContainedButton>
              </Grid>
              <Grid item xs={12}>
                <Image
                  src={content.image?.image?.asset?.url || ''}
                  alt={content.image?.imageAlt || ''}
                />
              </Grid>
            </Grid>
          </GreenCard>
        </div>
      </Section>
    );
  } else {
    // eslint-disable-next-line no-console, lingui/no-unlocalized-strings
    console.error('Missing some fields. Please check Sanity');
    return <></>;
  }
};

export { FeaturedSection };
