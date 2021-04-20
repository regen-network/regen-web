import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FormControlLabel, Radio, Collapse, Checkbox } from '@material-ui/core';
import clsx from 'clsx';

import CheckedIcon from '../icons/CheckedIcon';
import UncheckedIcon from '../icons/UncheckedIcon';
import InfoIconOutlined from '../icons/InfoIconOutlined';
import Tooltip from '../tooltip';

interface ToggleProps {
  label: string;
  name: string;
  isActive: boolean;
  checkBox?: boolean;
  onChange: (e: any) => void;
  description?: any;
  content?: any;
  activeContent?: any;
  tooltip?: string;
  disabled?: boolean;
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
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)', // TODO
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
      background: 'rgba(206,217,224,.5)', //TODO
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
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  description: {
    paddingLeft: theme.spacing(6),
  },
  descriptionCheckbox: {
    paddingLeft: theme.spacing(8),
  },
  disabled: {
    color: theme.palette.grey[600],
  },
  content: {
    paddingTop: theme.spacing(4),
  },
  info: {
    cursor: 'pointer',
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
  tooltip,
  disabled,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, isActive && classes.active)}>
      <div className={classes.top}>
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
          disabled={disabled}
        />
        {tooltip && (
          <Tooltip arrow placement="top" title={tooltip}>
            <div className={classes.info}>
              <InfoIconOutlined />
            </div>
          </Tooltip>
        )}
      </div>
      <div
        className={clsx(
          classes.description,
          checkBox && classes.descriptionCheckbox,
          disabled && classes.disabled,
        )}
      >
        {description}
      </div>
      {content && <div className={classes.content}>{content}</div>}
      <Collapse in={isActive} classes={{ wrapperInner: classes.content }}>
        {activeContent}
      </Collapse>
    </div>
  );
};

export default Toggle;
