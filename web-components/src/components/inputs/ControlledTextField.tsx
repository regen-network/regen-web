import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  Theme,
  FormControl,
  Input,
  FormHelperText,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { FieldProps, getIn } from 'formik';

interface StyleProps {
  errors: boolean;
  label: boolean;
  optional: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    marginTop: props.label ? theme.spacing(4) : 0,
    [theme.breakpoints.up('sm')]: {
      marginBottom: props.errors ? theme.spacing(5.25) : 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: props.errors ? theme.spacing(4.75) : 0,
    },
    '& input[type=number]': {
      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
  }),
  input: {
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '2px',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
      fontSize: theme.spacing(3),
    },
    '& .MuiInputAdornment-root p': {
      color: theme.palette.info.main,
    },
    '&.Mui-error': {
      '& input, & .MuiSelect-select': {
        borderColor: theme.palette.error.main,
      },
    },
  },
  label: props => ({
    lineHeight: '140%',
    transform: 'scale(1)',
    color: theme.palette.primary.contrastText,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
    '&::after': {
      content: props.optional ? '" (optional)"' : '',
      fontWeight: 'normal',
      color: theme.palette.info.main,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  }),
  txtGray: {
    color: theme.palette.info.main,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(4),
      fontSize: theme.spacing(3.3),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
      fontSize: theme.spacing(3),
    },
  },
  error: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    marginTop: theme.spacing(1),
    marginBottom: 0,
    fontSize: theme.spacing(3.5),
    fontFamily: '"Lato",-apple-system,sans-serif',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
}));

interface ControlledTextFieldProps extends FieldProps {
  adornment?: string;
  charLimit?: number;
  children?: any;
  className?: string;
  description?: string;
  label?: string;
  multiline?: boolean;
  optional?: boolean;
  rows?: number;
  transformValue?: (v: any) => any;
  triggerOnChange?: (v: any) => Promise<void>;
}

export default function ControlledTextField({
  adornment,
  charLimit,
  description,
  label,
  multiline,
  optional,
  rows = 1,
  transformValue,
  triggerOnChange,
  ...props
}: ControlledTextFieldProps): JSX.Element {
  const { form, field } = props; // passed from Formik <Field />
  const errorMessage = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);
  const charsLeft = (charLimit || Infinity) - (field.value?.length || 0);

  async function handleChange({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): Promise<void> {
    const text = charLimit && charsLeft > charLimit ? value.slice(0, charLimit) : value;
    if (triggerOnChange) {
      await triggerOnChange(text);
    }
    form.setFieldValue(field.name, transformValue ? transformValue(text) : text);
  }

  function handleBlur({ target: { value } }: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>): void {
    form.setFieldTouched(field.name);
    form.handleBlur(value);
  }

  const classes = useStyles({ errors: !!errorMessage, optional: !!optional, label: !!label });
  const formId = `formfield-${field.name}`;
  const helperId = `helpertxt-${field.name}`;

  return (
    <FormControl className={clsx(classes.root, props.className)} fullWidth>
      {label && (
        <label className={classes.label} htmlFor={formId}>
          {label}
        </label>
      )}

      {description && (
        <Typography variant="body1" className={classes.txtGray}>
          {description}
        </Typography>
      )}

      <Input
        id={formId}
        value={field.value}
        onChange={handleChange}
        multiline={multiline}
        onBlur={handleBlur}
        className={classes.input}
        rows={rows}
        startAdornment={adornment ? <InputAdornment position="start">{adornment}</InputAdornment> : null}
        disableUnderline
      />

      {charLimit && (
        <Typography variant="body1" className={classes.txtGray}>{`${charsLeft} character${
          charsLeft === 1 ? '' : 's'
        } remaining`}</Typography>
      )}

      {touched && errorMessage && (
        <FormHelperText id={helperId} className={classes.error}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}
