import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import GreenCard from 'web-components/lib/components/cards/GreenCard';
import { Theme } from 'web-components/lib/theme/muiTheme';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Title from 'web-components/lib/components/title';
import Section from 'web-components/lib/components/section';
import { BlockContent } from 'web-components/lib/components/block-content';
import { Image } from 'web-components/lib/components/image';

import { FeaturedSection as FeaturedSectionProps } from '../../generated/sanity-graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(22.5),
  },
  title: {
    lineHeight: '140%',
    marginBottom: theme.spacing(4.5),
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(5),
    },
  },
  description: {
    color: theme.palette.info.dark,
    lineHeight: '150%',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
      paddingBottom: theme.spacing(4.5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      paddingBottom: theme.spacing(7),
    },
    '& a': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
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
  text: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(10),
    },
  },
  grid: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      flexDirection: 'column-reverse',
    },
  },
}));

interface Props {
  content: FeaturedSectionProps;
}

const FeaturedSection: React.FC<Props> = ({ content }) => {
  const styles = useStyles();

  if (
    content?.header &&
    content.titleRaw &&
    content.descriptionRaw &&
    content.button &&
    content.image
  ) {
    return (
      <Section
        className={styles.root}
        title={content.header}
        titleVariant="subtitle2"
      >
        <div className={styles.card}>
          <GreenCard>
            <Grid className={styles.grid} container wrap="nowrap">
              <Grid item xs={12} className={styles.text}>
                <Title className={styles.title} variant="h3">
                  <BlockContent content={content.titleRaw} />
                </Title>
                <Typography component="div" className={styles.description}>
                  <BlockContent content={content.descriptionRaw} />
                </Typography>
                <ContainedButton
                  href={content?.button?.buttonLink?.buttonHref || ''}
                  className={styles.button}
                >
                  more details
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
    console.error('Missing some fields. Please check Sanity');
    return <></>;
  }
};

export { FeaturedSection };
