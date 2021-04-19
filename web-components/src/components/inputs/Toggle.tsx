import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Collapse,
  Zoom,
  Checkbox,
} from '@material-ui/core';
import clsx from 'clsx';

import CheckedIcon from '../icons/CheckedIcon';
import UncheckedIcon from '../icons/UncheckedIcon';
import FormLabel from '../form/ControlledFormLabel';

interface ToggleProps {
  label: string;
  name: string;
  isActive: boolean;
  checkBox?: boolean;
  onChange: (e: any) => void;
  activeContent: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: `1px solid ${theme.palette.grey[100]}`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    margin: `${theme.spacing(4)} 0 0`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  formControl: {
    // alignItems: 'flex-start',
  },
  radioActive: {
    backgroundColor: theme.palette.grey[50],
    // transform: 'scale(1.01)',
    boxShadow: theme.shadows[1],
    border: `1px solid ${theme.palette.secondary.light}`,
    '& .MuiTypography-body1': {
      fontWeight: 'bold',
    },
  },
  radioBtn: {
    padding: `0 ${theme.spacing(2)} ${theme.spacing(2)} 0`,
  },
}));

const Toggle: React.FC<ToggleProps> = ({ label, isActive, onChange, checkBox, name, activeContent }) => {
  const classes = useStyles();
  console.log('isActive', isActive);

  return (
    <div className={clsx(classes.root, isActive && classes.radioActive)}>
      <FormControlLabel
        control={
          checkBox ? (
            <Checkbox
              color="secondary"
              icon={<UncheckedIcon />}
              checkedIcon={<CheckedIcon />}
              onChange={onChange}
              name={name}
            />
          ) : (
            <Radio className={classes.radioBtn} name={name} />
          )
        }
        label={label}
      />
      <Collapse in={isActive}>{activeContent}</Collapse>
    </div>
  );
};

export default Toggle;
