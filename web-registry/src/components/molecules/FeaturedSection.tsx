import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import GreenCard from 'web-components/lib/components/cards/GreenCard';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Title from 'web-components/lib/components/title';
import Section from 'web-components/lib/components/section';
import { BlockContent } from 'web-components/lib/components/block-content';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingBottom: theme.spacing(22.5),
    },
  },
  title: {
    lineHeight: '140%',
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(5),
    },
    '& p': {
      margin: 0,
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
      width: '60%',
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
  content: any; //TODO
}

const FeaturedSection: React.FC<Props> = ({ content }) => {
  const styles = useStyles();

  return (
    <Section className={styles.root} title={content?.header} titleVariant="subtitle2">
      <div className={styles.card}>
        <GreenCard>
          <Grid className={styles.grid} container wrap="nowrap">
            <Grid item xs={12} className={styles.text}>
              <Title className={styles.title} variant="h3">
                <BlockContent content={content?.title} />
              </Title>
              <Typography component="div" className={styles.description}>
                <BlockContent content={content?.descriptionRaw} />
              </Typography>
              <ContainedButton href={content?.link} className={styles.button}>
                more details
              </ContainedButton>
            </Grid>
            <Grid item xs={12}>
              <img src={''} />
            </Grid>
          </Grid>
        </GreenCard>
      </div>
    </Section>
  );
};

export { FeaturedSection };
