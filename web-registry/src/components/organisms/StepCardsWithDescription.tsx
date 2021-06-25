import React from 'react';
import cx from 'clsx';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import StepCard, { ProjectPlanStep } from 'web-components/lib/components/cards/StepCard';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
      lineHeight: theme.typography.pxToRem(33),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(18),
      lineHeight: theme.typography.pxToRem(27),
    },
  },
  topDescription: {
    paddingBottom: theme.spacing(8),
  },
  bottomDescription: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(4),
    },
  },
  bottomTitle: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(24),
      fontSize: theme.typography.pxToRem(32),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(16),
      fontSize: theme.typography.pxToRem(24),
    },
  },
  stepCardsContainer: {
    maxWidth: theme.typography.pxToRem(752),
  },
}));

const StepCardsWithDescription: React.FC<{
  description?: string;
  bottomDescription?: {
    title: string;
    body: string;
  };
  stepCards: Array<{ icon: JSX.Element; step: ProjectPlanStep }>;
  className?: string;
}> = ({ stepCards, className, description, bottomDescription }) => {
  const styles = useStyles();

  return (
    <Grid container justify="center" className={className}>
      {!!description && (
        <Description className={cx(styles.description, styles.topDescription)}>
          {ReactHtmlParser(description)}
        </Description>
      )}
      <Grid container justify="center" className={styles.stepCardsContainer}>
        {stepCards.map((card, i) => (
          <StepCard icon={card.icon} step={card.step} key={i} />
        ))}
      </Grid>
      {!!bottomDescription && (
        <>
          <Title align="center" className={styles.bottomTitle}>
            {ReactHtmlParser(bottomDescription.title)}
          </Title>
          <Description className={cx(styles.description, styles.bottomDescription)}>
            {ReactHtmlParser(bottomDescription.body)}
          </Description>
        </>
      )}
    </Grid>
  );
};

export { StepCardsWithDescription };
