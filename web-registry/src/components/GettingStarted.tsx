import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import InterfaceIcon from 'web-components/lib/components/icons/InterfaceIcon';
import ReviewIcon from 'web-components/lib/components/icons/ReviewIcon';
import TrustDocumentIcon from 'web-components/lib/components/icons/TrustDocumentIcon';
import StepCard from 'web-components/lib/components/cards/StepCard';
import Title from 'web-components/lib/components/title';

type Props = {};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(8),
  },
  interfaceIcon: {
    width: 100,
    height: 100,
  },
  reviewIcon: {
    width: 93.14, //TODO
    height: 94.7,
    marginTop: 14,
    marginLeft: 14,
    // position: 'absolute',
    // left: '39.44%',
    // right: '34.68%',
    // top: '13.82%',
    // bottom: '83.84%',
  },
  trustDocumentIcon: {
    width: 59.42,
    height: 75,
  },
}));

const GettingStarted: React.FC<Props> = ({}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Title variant="h3" className={classes.title}>
        Getting Started
      </Title>
      <StepCard
        icon={<InterfaceIcon className={classes.interfaceIcon} />}
        tagName="immediate"
        stepText="STEP 1"
        title="Fill out a project plan"
        description="This project plan includes all the details about your monitoring, management practices, and more."
      />
      <StepCard
        icon={<ReviewIcon className={classes.reviewIcon} />}
        tagName="immediate"
        stepText="STEP 2"
        title="Review and Submit"
        description="Review your project plan to make sure all entries are correct."
      />
      <StepCard
        icon={<TrustDocumentIcon className={classes.trustDocumentIcon} />}
        tagName="immediate"
        stepText="STEP 3"
        title="Fill out a project plan"
        description={
          <span>
            This project plan includes all the details about your monitoring, management practices,
            <a href="#"> and more.</a>
          </span>
        }
      />
    </div>
  );
};

export default GettingStarted;
