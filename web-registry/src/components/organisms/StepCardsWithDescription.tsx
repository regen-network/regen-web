import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import { BlockContent } from 'web-components/lib/components/block-content';
import { WrappedStepCard } from '../atoms';
import {
  StepCardFieldsFragment,
  Maybe,
  Scalars,
} from '../../generated/sanity-graphql';

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
      lineHeight: theme.typography.pxToRem(33),
    },
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
  bottomTitle: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(24),
      fontSize: theme.typography.pxToRem(32),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(16),
      fontSize: theme.typography.pxToRem(24),
    },
  },
  stepCardsContainer: {
    maxWidth: theme.typography.pxToRem(752),
  },
}));

const StepCardsWithDescription: React.FC<{
  descriptionRaw?: Maybe<Scalars['JSON']>;
  bottomDescription?: {
    title: string;
    body?: Maybe<Scalars['JSON']>;
  };
  stepCards?: Maybe<Array<Maybe<StepCardFieldsFragment>>>;
  openModal: (link: string) => void;
  className?: string;
}> = ({
  stepCards,
  className,
  descriptionRaw,
  bottomDescription,
  openModal,
}) => {
  const styles = useStyles();

  return (
    <Grid container justifyContent="center" className={className}>
      {descriptionRaw && (
        <Description className={cx(styles.description, styles.topDescription)}>
          <BlockContent content={descriptionRaw} />
        </Description>
      )}
      <Grid
        container
        justifyContent="center"
        className={styles.stepCardsContainer}
      >
        {stepCards?.map((card, i) => (
          <WrappedStepCard
            stepNumber={i}
            stepCard={card}
            openModal={openModal}
          />
        ))}
      </Grid>
      {!!bottomDescription && (
        <>
          <Title align="center" className={styles.bottomTitle}>
            {bottomDescription.title}
          </Title>
          <Description
            className={cx(styles.description, styles.bottomDescription)}
          >
            <BlockContent content={bottomDescription.body} />
          </Description>
        </>
      )}
    </Grid>
  );
};

export { StepCardsWithDescription };
