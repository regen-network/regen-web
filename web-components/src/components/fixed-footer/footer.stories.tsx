import * as React from 'react';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

import FixedFooter from 'web-components/lib/components/fixed-footer';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
// import { SwitchFooter } from 'web-components/lib/components/fixed-footer/SwitchFooter';
import clsx from 'clsx';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import ContainedButton from '../buttons/ContainedButton';

export default {
  title: 'Components|Footers',
  component: FixedFooter,
  decorators: [withKnobs],
};

const submit = async (): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
};

export const fixedFooter = (): JSX.Element => (
  <FixedFooter>
    <div>Fixed footer content</div>
  </FixedFooter>
);

export const onboardingFooter = (): JSX.Element => (
  <OnboardingFooter
    onSave={submit}
    saveText={text('Save text', 'Save and Next')}
    onPrev={boolean('Prev', true) ? () => null : null}
    onNext={boolean('Next', true) ? () => null : null}
    hideProgress={boolean('hideProgress', false)}
    saveDisabled={boolean('Disable save', false)}
    percentComplete={number('Percent Complete', 33, { min: 0, max: 100 })}
  />
);

interface SwitchFooterProps {
  buttonText: string;
  activeOption: string;
  leftOption: string;
  rightOption: string;
  label?: string;
  onCtaClick: () => void;
  onToggleClick: () => void;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switch: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
  },
  label: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(16),
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(12),
      marginBottom: 3,
    },
  },
  toggleContainer: {
    display: 'flex',

    borderRadius: theme.spacing(12.5),
    background: theme.palette.info.light,
    alignItems: 'center',
    justifyContent: 'space-between',
    textTransform: 'uppercase',
    fontFamily: theme.typography.h1.fontFamily,
    boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.25)', //TODO
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(82.25),
      height: theme.spacing(12.5),
      fontSize: theme.typography.pxToRem(14),
    },
    [theme.breakpoints.down('xs')]: {
      width: 160,
      height: 32,
      fontSize: theme.typography.pxToRem(9),
    },
  },
  option: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '35%',
    borderRadius: theme.spacing(12.5),
    margin: theme.spacing(0, 0.75),
    cursor: 'pointer',

    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(11),
      padding: theme.spacing(0, 9),
      borderRadius: theme.spacing(12.5),
      margin: theme.spacing(0, 0.75),
    },
    [theme.breakpoints.down('xs')]: {
      height: 28,
      padding: theme.spacing(0, 2),
      borderRadius: theme.spacing(12.5),
      margin: theme.spacing(0, 0.75),
    },
  },
  active: {
    background: theme.palette.secondary.dark,
    boxShadow: '0px 1px 1px 1px rgba(0, 0, 0, 0.1)', //TODO
    animation: `$activate 0.2s`,
  },
  inactive: {
    color: '#3D7ACF',
    animation: `$deactivate 0.2s`,
    '&:hover': {
      background: theme.palette.grey[100],
    },
  },
  btn: {
    height: theme.spacing(15),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 4),
      minWidth: theme.spacing(74.75),
      fontSize: theme.typography.pxToRem(21),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),

      // minWidth: theme.spacing(39.75),
      fontSize: theme.typography.pxToRem(12),
    },
  },
  '@keyframes activate': {
    '0%': {
      background: theme.palette.grey[100],
      color: '#3D7ACF',
    },
    '100%': {
      background: theme.palette.secondary.dark,
      color: theme.palette.primary.contrastText,
    },
  },
  '@keyframes deactivate': {
    '0%': {
      background: theme.palette.secondary.dark,
      color: theme.palette.primary.contrastText,
    },
    '100%': {
      background: theme.palette.info.light,
      color: '#3D7ACF',
    },
  },
}));

const SwitchFooter: React.FC<SwitchFooterProps> = ({
  buttonText,
  activeOption,
  leftOption,
  rightOption,
  label,
  onCtaClick,
  onToggleClick,
}) => {
  const styles = useStyles();

  return (
    <FixedFooter>
      <div className={styles.root}>
        <div className={styles.switch}>
          {label && <span className={styles.label}>{label}</span>}
          <div className={styles.toggleContainer}>
            <div
              className={clsx(styles.option, activeOption === leftOption ? styles.active : styles.inactive)}
              onClick={onToggleClick}
            >
              {leftOption}
            </div>
            <div
              className={clsx(styles.option, activeOption === rightOption ? styles.active : styles.inactive)}
              onClick={onToggleClick}
            >
              {rightOption}
            </div>
          </div>
        </div>
        <ContainedButton className={styles.btn} onClick={onCtaClick}>
          {buttonText}
        </ContainedButton>
      </div>
    </FixedFooter>
  );
};

const SwitchFooterDemo = (): JSX.Element => {
  const [activeOption, setActiveOption] = React.useState<'Buyer' | 'Land Steward'>('Buyer');

  const toggle = (): void => {
    if (activeOption === 'Buyer') {
      setActiveOption('Land Steward');
    } else {
      setActiveOption('Buyer');
    }
  };

  const onClick = (): void => {
    if (activeOption === 'Buyer') {
      alert('go to purchase page');
    } else {
      alert('go to intake form');
    }
  };

  return (
    <SwitchFooter
      activeOption={activeOption}
      buttonText={activeOption === 'Buyer' ? 'buy credits' : 'fill in intake form'}
      label="I am a:"
      leftOption="Land Steward"
      rightOption="Buyer"
      onCtaClick={onClick}
      onToggleClick={toggle}
    />
  );
};

export const switchFooter = (): JSX.Element => <SwitchFooterDemo />;
