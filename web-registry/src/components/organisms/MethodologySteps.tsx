import React from 'react';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';

import { WrappedStepCard } from '../atoms/WrappedStepCard';
import {
  Maybe,
  BasicStepCardSectionFieldsFragment,
} from '../../generated/sanity-graphql';

type Props = {
  steps?: Maybe<BasicStepCardSectionFieldsFragment>;
};

const useStyles = makeStyles((theme: Theme) => ({
  stepSection: {
    paddingTop: 0,
    background: theme.palette.primary.main,
  },
  sectionTitleWrap: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(17.75, 0, 10.5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(15, 0, 7.5),
    },
  },
  sectionTitle: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(38),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  steps: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(199.75),
    },
    '& :last-child': {
      marginBottom: 0,
    },
  },
  soilSampleIcon: {
    marginTop: -3,
    marginLeft: 7,
    width: theme.spacing(16.5),
    height: theme.spacing(27),
  },
  satelliteIcon: {
    marginTop: 11,
    marginRight: 9,
    width: theme.spacing(36.5),
    height: theme.spacing(36.5),
  },
  countingIcon: {
    width: theme.spacing(16.25),
    height: theme.spacing(17),
  },
  growIcon: {
    width: theme.spacing(26.5),
    height: theme.spacing(22.75),
    marginBottom: 4,
    marginRight: 8,
  },
  coBenefitsIcon: {
    width: theme.spacing(19.25),
    height: theme.spacing(24.75),
  },
}));

function MethodologySteps({ steps }: Props): JSX.Element {
  const styles = useStyles();

  return (
    <OnBoardingSection
      title={steps?.title || 'Methodology Process'}
      classes={{
        root: styles.stepSection,
        title: styles.sectionTitle,
        titleWrap: styles.sectionTitleWrap,
      }}
    >
      <div className={styles.steps}>
        {steps?.stepCards?.map((s, i) => (
          <WrappedStepCard
            key={i}
            stepNumber={i}
            stepCard={s}
            openModal={() => {}}
          />
        ))}
      </div>
    </OnBoardingSection>
  );
}

export { MethodologySteps };
