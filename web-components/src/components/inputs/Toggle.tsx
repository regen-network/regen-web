import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FormControlLabel, Collapse } from '@material-ui/core';
import clsx from 'clsx';
import { FieldProps } from 'formik';

import InfoIconOutlined from '../icons/InfoIconOutlined';
import Tooltip from '../tooltip/InfoTooltip';
import Radio from '../inputs/Radio';
import Checkbox from '../inputs/Checkbox';

interface ToggleProps extends FieldProps {
  label: string;
  type?: 'checkbox' | 'radio';
  checked: boolean;
  description?: any;
  content?: any;
  activeContent?: any;
  tooltip?: string;
  disabled?: boolean;
  value?: string;
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
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },
  descriptionCheckbox: {
    paddingLeft: theme.spacing(6.9),
  },
  disabled: {
    color: theme.palette.grey[600],
  },
  disabledDescriptionCheckbox: {
    paddingLeft: theme.spacing(8),
  },
  content: {
    paddingTop: theme.spacing(4),
  },
  info: {
    cursor: 'pointer',
  },
  checkbox: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  radio: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  formControlLabelRoot: {
    alignItems: 'flex-start',
  },
  formControlLabelWithDescription: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
}));

const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  description,
  content,
  activeContent,
  tooltip,
  disabled,
  type,
  value,
  field,
  form,
  meta,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, checked && classes.active)}>
      <div className={classes.top}>
        <FormControlLabel
          control={
            type === 'checkbox' ? (
              <Checkbox className={classes.checkbox} field={field} form={form} meta={meta} />
            ) : (
              <Radio className={classes.radio} />
            )
          }
          label={label}
          value={value}
          disabled={disabled}
          checked={checked}
          classes={{
            root: classes.formControlLabelRoot,
            label: description && classes.formControlLabelWithDescription,
          }}
        />
        {tooltip && (
          <Tooltip arrow placement="top" title={tooltip}>
            <div className={classes.info}>
              <InfoIconOutlined />
            </div>
          </Tooltip>
        )}
      </div>
      {description && (
        <div
          className={clsx(
            classes.description,
            type === 'checkbox' && classes.descriptionCheckbox,
            disabled && classes.disabled,
            disabled && type === 'checkbox' && classes.disabledDescriptionCheckbox,
          )}
        >
          {description}
        </div>
      )}
      {content && <div className={classes.content}>{content}</div>}
      {activeContent && (
        <Collapse in={checked} classes={{ wrapperInner: classes.content }}>
          {activeContent}
        </Collapse>
      )}
    </div>
  );
};

export default Toggle;
