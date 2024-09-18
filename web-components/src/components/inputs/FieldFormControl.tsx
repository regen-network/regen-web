import React from 'react';
import { FormControl, FormHelperText, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FieldProps, getIn } from 'formik';
import { makeStyles } from 'tss-react/mui';

import FormLabel from './FormLabel';

interface RenderProps {
  handleChange: (value: any) => void;
  handleBlur: (value: any) => void;
}

export interface DefaultStyleProps {
  defaultStyle?: boolean;
  // forceDefaultStyle applies default style even if first-of-type,
  // this may be useful when the element is the only child of some wrapper element
  // e.g. in Grid's item
  forceDefaultStyle?: boolean;
}

interface Props extends FieldProps, DefaultStyleProps {
  children: (childProps: RenderProps) => React.ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
  description?: string;
  disabled?: boolean;
  optional?: boolean | string;
  label?: string;
  exampleText?: string;
  onExampleClick?: () => void;
}

interface StyleProps {
  disabled?: boolean;
  description?: string;
  error: boolean;
}

const useStyles = makeStyles<StyleProps>()((theme, { error }) => ({
  error: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    marginTop: theme.spacing(1),
    marginBottom: 0,
    fontFamily: '"Lato",-apple-system,sans-serif',
    fontWeight: 'bold',
    visibility: error ? 'visible' : 'hidden',
    whiteSpace: 'pre-wrap',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
  },
  label: {
    marginBottom: theme.spacing(2.25),
  },
  firstOfType: {
    '&:first-of-type': {
      marginTop: 0,
    },
  },
  default: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.typography.pxToRem(40),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.typography.pxToRem(33),
    },
  },
}));

/**
 *  This component uses MUI's `FormControl` component as a wrapper, and
 *  returns a render prop pattern with handlers for `onChange` and `onBlur` that will update the formik field
 */
export default function FieldFormControl({
  children,
  label,
  description,
  disabled,
  className,
  sx,
  optional,
  exampleText,
  onExampleClick,
  defaultStyle = true,
  forceDefaultStyle = false,
  ...fieldProps
}: Props): JSX.Element {
  const { form, field } = fieldProps;
  const errorMessage = getIn(form.errors, field.name);
  const fieldTouched = getIn(form.touched, field.name);

  async function handleChange(value: any): Promise<void> {
    form.setFieldValue(field.name, value);
    // see https://github.com/jaredpalmer/formik/issues/2083:
    setTimeout(() => form.setFieldTouched(field.name, true));
  }

  function handleBlur(value: string): void {
    form.setFieldTouched(field.name);
    form.handleBlur(value);
  }

  const hasError = fieldTouched && errorMessage;
  const { classes: styles, cx } = useStyles({
    disabled,
    description,
    error: hasError,
  });
  const defaultClasses = [styles.default, className];
  const rootClasses = defaultStyle
    ? forceDefaultStyle
      ? defaultClasses
      : [...defaultClasses, styles.firstOfType]
    : className;

  return (
    <FormControl sx={sx} className={cx(rootClasses)} fullWidth>
      {label && (
        <FormLabel
          className={styles.label}
          label={label}
          optional={optional}
          description={description}
          exampleText={exampleText}
          onExampleClick={onExampleClick}
          disabled={disabled}
        />
      )}
      {children({ handleChange, handleBlur })}

      {hasError && (
        <FormHelperText className={styles.error}>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
}
