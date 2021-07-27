import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import SoilSampleIcon from 'web-components/lib/components/icons/SoilSampleIcon';
import SatelliteIcon from 'web-components/lib/components/icons/SatelliteIcon';
import CountingIcon from 'web-components/lib/components/icons/CountingIcon';
import GrowIcon from 'web-components/lib/components/icons/GrowIcon';
import CoBenefitsIcon from 'web-components/lib/components/icons/CoBenefitsIcon';

import { ProcessStepCard } from '../atoms/ProcessStepCard';
import { Methodology } from '../../mocks/cms-duplicates';

type Props = {
  methodology: Methodology;
};

//TODO: the below icons and styles are related to Grasslands. We will need to make this dynamic when more methodologies are added.
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
  lastCard: {
    marginBottom: 0,
  },
}));

function MethodologySteps({ methodology }: Props): JSX.Element {
  const styles = useStyles();

  return (
    <OnBoardingSection
      title="Methodology Process"
      classes={{
        root: styles.stepSection,
        title: styles.sectionTitle,
        titleWrap: styles.sectionTitleWrap,
      }}
    >
      <div className={styles.steps}>
        <ProcessStepCard
          step={methodology.steps[0]}
          icon={<SoilSampleIcon className={styles.soilSampleIcon} />}
        />
        <ProcessStepCard
          step={methodology.steps[1]}
          icon={<SatelliteIcon className={styles.satelliteIcon} />}
        />
        <ProcessStepCard
          step={methodology.steps[2]}
          icon={<CountingIcon className={styles.countingIcon} />}
        />
        <ProcessStepCard step={methodology.steps[3]} icon={<GrowIcon className={styles.growIcon} />} />
        <ProcessStepCard
          className={styles.lastCard}
          step={methodology.steps[4]}
          icon={<CoBenefitsIcon className={styles.coBenefitsIcon} />}
        />
      </div>
    </OnBoardingSection>
  );
}

export { MethodologySteps };
