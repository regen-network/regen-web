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
  classes?: {
    root?: string;
    description?: string;
  };
  label: string;
  type?: 'checkbox' | 'radio';
  checked: boolean;
  description?: any;
  content?: any;
  activeContent?: any;
  tooltip?: string;
  disabled?: boolean;
  value?: string;
  triggerOnChange?: (v: any) => Promise<void>;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: `1px solid ${theme.palette.info.light}`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    margin: theme.spacing(3.25, 0, 0),
    transition: '300ms ease-in-out;',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3.25),
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
    width: '100%',
    '& .MuiFormControlLabel-label': {
      marginLeft: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4.5),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(4),
      },
    },
  },
  formControlLabelWithDescription: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
}));

const Toggle: React.FC<ToggleProps> = ({
  classes,
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
  triggerOnChange,
}) => {
  const styles = useStyles();

  return (
    <div className={clsx(styles.root, checked && styles.active, classes && classes.root)}>
      <div className={styles.top}>
        <FormControlLabel
          control={
            type === 'checkbox' ? (
              <Checkbox
                className={styles.checkbox}
                field={field}
                form={form}
                meta={meta}
                triggerOnChange={triggerOnChange}
                type="checkbox"
              />
            ) : (
              <Radio className={styles.radio} />
            )
          }
          label={label}
          value={value}
          disabled={disabled}
          checked={checked}
          classes={{
            root: styles.formControlLabelRoot,
            label: description && styles.formControlLabelWithDescription,
          }}
        />
        {tooltip && (
          <Tooltip arrow placement="top" title={tooltip}>
            <div className={styles.info}>
              <InfoIconOutlined />
            </div>
          </Tooltip>
        )}
      </div>
      {description && (
        <div
          className={clsx(
            styles.description,
            type === 'checkbox' && styles.descriptionCheckbox,
            disabled && styles.disabled,
            disabled && type === 'checkbox' && styles.disabledDescriptionCheckbox,
            classes && classes.description,
          )}
        >
          {description}
        </div>
      )}
      {content && <div className={styles.content}>{content}</div>}
      {activeContent && (
        <Collapse in={checked} classes={{ wrapperInner: styles.content }}>
          {activeContent}
        </Collapse>
      )}
    </div>
  );
};

export default Toggle;
