import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FormControlLabel, Collapse } from '@material-ui/core';
import clsx from 'clsx';
import { FieldProps } from 'formik';

import InfoIconOutlined from '../icons/InfoIconOutlined';
import Tooltip from '../tooltip';
import Radio from '../inputs/Radio';
import Checkbox from '../inputs/Checkbox';

interface ToggleProps extends FieldProps {
  label: string;
  isActive: boolean;
  checkBox?: boolean;
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
    margin: theme.spacing(4, 0, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
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
  checkBox,
  description,
  content,
  activeContent,
  tooltip,
  disabled,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, isActive && classes.active)}>
      <div className={classes.top}>
        <FormControlLabel
          control={checkBox ? <Checkbox {...props} /> : <Radio {...props.field} />}
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
      {activeContent && (
        <Collapse in={isActive} classes={{ wrapperInner: classes.content }}>
          {activeContent}
        </Collapse>
      )}
    </div>
  );
};

export default Toggle;
