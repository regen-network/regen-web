import React from 'react';
import { makeStyles } from 'tss-react/mui';

import ContainedButton from '../buttons/ContainedButton';
import FixedFooter from './';

interface SwitchFooterProps {
  buttonText: string;
  activeOption: string;
  leftOption: string;
  rightOption: string;
  label?: string;
  onCtaClick: () => void;
  onToggleClick: () => void;
}

const useStyles = makeStyles()(theme => ({
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
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
  },
  label: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(16),
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12),
      marginBottom: theme.spacing(0.75),
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
    boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.25)',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(82.25),
      height: theme.spacing(12.5),
      fontSize: theme.typography.pxToRem(14),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(38),
      height: theme.spacing(8),
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
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(7),
      padding: theme.spacing(0, 1.4),
      borderRadius: theme.spacing(12.5),
      margin: theme.spacing(0, 0.75),
    },
  },
  active: {
    background: theme.palette.secondary.dark,
    boxShadow: '0px 1px 1px 1px rgba(0, 0, 0, 0.1)',
    animation: `$activate 0.2s`,
  },
  inactive: {
    color: theme.palette.secondary.main,
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
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 1),
      minWidth: theme.spacing(31),
      fontSize: theme.typography.pxToRem(12),
    },
  },
  '@keyframes activate': {
    '0%': {
      background: theme.palette.grey[100],
      color: theme.palette.secondary.main,
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
      color: theme.palette.secondary.main,
    },
  },
}));

const SwitchFooter: React.FC<React.PropsWithChildren<SwitchFooterProps>> = ({
  buttonText,
  activeOption,
  leftOption,
  rightOption,
  label,
  onCtaClick,
  onToggleClick,
}) => {
  const { classes: styles, cx } = useStyles();

  return (
    <FixedFooter>
      <div className={styles.root}>
        <div className={styles.switch}>
          {label && <span className={styles.label}>{label}</span>}
          <div className={styles.toggleContainer}>
            <div
              className={cx(
                styles.option,
                activeOption === leftOption ? styles.active : styles.inactive,
              )}
              onClick={onToggleClick}
            >
              {leftOption}
            </div>
            <div
              className={cx(
                styles.option,
                activeOption === rightOption ? styles.active : styles.inactive,
              )}
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

export { SwitchFooter };
