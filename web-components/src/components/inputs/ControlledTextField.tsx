import React from 'react';
import { makeStyles, Theme, Input, InputAdornment, Typography } from '@material-ui/core';
import { FieldProps, getIn } from 'formik';
import FieldFormControl from './FieldFormControl';

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

interface StyleProps {
  errors: boolean;
  label: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
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
      fontSize: theme.spacing(3.5),
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
  charCount: {
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
}));

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

  const classes = useStyles({ errors: !!errorMessage, label: !!label });
  const formId = `formfield-${field.name}`;

  return (
    // <FormControl className={props.className} fullWidth>
    <FieldFormControl
      className={props.className}
      errorMessage={touched && errorMessage}
      label={label}
      description={description}
      disabled={form.isSubmitting}
      optional={optional}
    >
      <Input
        id={formId}
        value={field.value}
        onChange={handleChange}
        disabled={form.isSubmitting}
        multiline={multiline}
        onBlur={handleBlur}
        className={classes.input}
        rows={rows}
        startAdornment={adornment ? <InputAdornment position="start">{adornment}</InputAdornment> : null}
        disableUnderline
      />
      {charLimit && (
        <Typography variant="body1" className={classes.charCount}>{`${charsLeft} character${
          charsLeft === 1 ? '' : 's'
        } remaining`}</Typography>
      )}
    </FieldFormControl>
    // </FormControl>
  );
}
