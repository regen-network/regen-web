import * as React from 'react';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

import FixedFooter from 'web-components/lib/components/fixed-footer';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';

import ContainedButton from '../buttons/ContainedButton';

import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
  activeText: string;
  onCtaClick: () => void;
  onToggleClick: () => void;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  toggle: {
    width: 329,
    height: 50,
    borderRadius: 50,
    background: theme.palette.info.light,
  },
  active: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontSize: theme.typography.pxToRem(14),
    fontFamily: theme.typography.h1.fontFamily,

    position: 'relative',
    height: 44,
    width: 161,
    left: 164,
    top: 3,
    borderRadius: 50,
    background: theme.palette.secondary.dark,
  },
  btn: {
    padding: theme.spacing(2, 4),
    minWidth: 0,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
}));

const SwitchFooter: React.FC<Props> = ({ buttonText, activeText, onCtaClick }) => {
  const styles = useStyles();

  return (
    <FixedFooter>
      <div className={styles.root}>
        <div className={styles.toggle}>
          <div className={styles.active}>{activeText}</div>
        </div>
        <ContainedButton className={styles.btn} onClick={onCtaClick}>
          {buttonText}
        </ContainedButton>
      </div>
    </FixedFooter>
  );
};

export const switchFooter = (): JSX.Element => (
  <SwitchFooter
    buttonText="Buy Credits"
    activeText={'Buyer'}
    onCtaClick={() => {}}
    onToggleClick={() => {}}
  />
);
