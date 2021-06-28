import * as React from 'react';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';
import clsx from 'clsx';

import FixedFooter from 'web-components/lib/components/fixed-footer';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';

import ContainedButton from '../buttons/ContainedButton';

import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { set } from 'js-cookie';

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

interface Props {
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
    alignItems: 'center',
  },
  label: {
    marginRight: 8,
  },
  toggleContainer: {
    display: 'flex',
    width: 329,
    height: 50,
    borderRadius: 50,
    background: theme.palette.info.light,
    alignItems: 'center',
    justifyContent: 'space-between',

    textTransform: 'uppercase',
    fontSize: theme.typography.pxToRem(14),
    fontFamily: theme.typography.h1.fontFamily,
  },
  option: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,

    minWidth: '35%',
    padding: '0 36px',
    borderRadius: 50,
    margin: '0 3px',
    cursor: 'pointer',
  },
  active: {
    background: theme.palette.secondary.dark,

    animation: `$activate 0.3s`,
  },
  inactive: {
    '&:hover': {
      background: theme.palette.grey[100],
    },
    animation: `$deactivate 0.3s`,
  },
  btn: {
    padding: theme.spacing(2, 4),
    height: 60,
    [theme.breakpoints.up('sm')]: {
      minWidth: 299,
      fontSize: theme.typography.pxToRem(21),
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 159,
      fontSize: theme.typography.pxToRem(12),
    },
  },

  '@keyframes activate': {
    '0%': {
      background: theme.palette.grey[100],
    },
    '100%': {
      background: theme.palette.secondary.dark,
    },
  },
  '@keyframes deactivate': {
    '0%': {
      background: theme.palette.secondary.dark,
    },
    '100%': {
      background: theme.palette.grey[100],
    },
  },
}));

const SwitchFooter: React.FC<Props> = ({
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
      buttonText={activeOption === 'Buyer' ? 'buy credits' : 'fill in intake form'}
      activeOption={activeOption}
      label="I am a:"
      leftOption="Land Steward"
      rightOption="Buyer"
      onCtaClick={onClick}
      onToggleClick={toggle}
    />
  );
};

export const switchFooter = (): JSX.Element => <SwitchFooterDemo />;
