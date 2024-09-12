import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { makeStyles } from 'tss-react/mui';

import OnBoardingSection from 'web-components/src/components/section/OnBoardingSection';
import { Theme } from 'web-components/src/theme/muiTheme';

import {
  BasicStepCardSectionFieldsFragment,
  Maybe,
} from '../../generated/sanity-graphql';
import { WrappedStepCard } from '../atoms/WrappedStepCard';

type Props = {
  steps?: Maybe<BasicStepCardSectionFieldsFragment>;
};

const useStyles = makeStyles()((theme: Theme) => ({
  stepSection: {
    paddingTop: 0,
  },
  sectionTitleWrap: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(17.75, 0, 10.5),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(15, 0, 7.5),
    },
  },
  sectionTitle: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(38),
    },
    [theme.breakpoints.down('sm')]: {
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
}));

function MethodologySteps({ steps }: Props): JSX.Element {
  const { _ } = useLingui();
  const { classes: styles } = useStyles();

  return (
    <OnBoardingSection
      title={steps?.title || _(msg`Methodology Process`)}
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
            openModal={() => null}
          />
        ))}
      </div>
    </OnBoardingSection>
  );
}

export { MethodologySteps };
