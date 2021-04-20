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
  description?: any;
  content?: any;
  activeContent?: any;
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
  active: {
    backgroundColor: theme.palette.grey[50],
    boxShadow: theme.shadows[1],
    border: `1px solid ${theme.palette.secondary.light}`,
    '& .MuiTypography-body1': {
      fontWeight: 'bold',
    },
  },
  radioBtn: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.primary.main,
    '$root.Mui-focusVisible &': {
      outline: `2px auto ${theme.palette.secondary.main}`,
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.primary.main,
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedRadioBtn: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: 'none',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: `radial-gradient(${theme.palette.primary.main},${theme.palette.primary.main} 33%,transparent 40%)`,
      // backgroundImage: `radial-gradient(${theme.palette.primary.main},${theme.palette.primary.main} 28%,transparent 32%)`,
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  description: {
    paddingLeft: theme.spacing(8),
  },
  content: {
    paddingTop: theme.spacing(4),
  },
}));

const Toggle: React.FC<ToggleProps> = ({
  label,
  isActive,
  onChange,
  checkBox,
  name,
  description,
  content,
  activeContent,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, isActive && classes.active)}>
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
            <Radio
              name={name}
              onChange={onChange}
              checked={isActive}
              checkedIcon={<span className={clsx(classes.radioBtn, classes.checkedRadioBtn)} />} //TODO: extract
              icon={<span className={classes.radioBtn} />}
            />
          )
        }
        label={label}
      />
      <div className={classes.description}>{description}</div>
      {content && <div className={classes.content}>{content}</div>}
      <Collapse in={isActive} classes={{ wrapperInner: classes.content }}>
        {activeContent}
      </Collapse>
    </div>
  );
};

export default Toggle;
