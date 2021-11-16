import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { fieldToTextField, TextFieldProps } from 'formik-mui';
import MuiTextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import clsx from 'clsx';

interface TriggerTextFieldProps extends TextFieldProps {
  triggerOnChange?: (v: any) => Promise<void>;
  transformValue?: (v: any) => any;
}

export interface RegenTextFieldProps extends TriggerTextFieldProps {
  children?: any;
  errors?: boolean;
  optional?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

interface StyleProps extends TextFieldProps {
  errors: boolean;
  optional: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    '& label': {
      lineHeight: '140%',
      transform: 'scale(1)',
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4.5),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(4),
      },
      '&.Mui-focused': {
        display: 'block',
      },
    },
    '& .MuiInput-formControl': {
      marginTop: props.label ? theme.spacing(4) : 0,
      [theme.breakpoints.up('sm')]: {
        marginBottom: props.errors ? theme.spacing(5.25) : 0,
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: props.errors ? theme.spacing(4.75) : 0,
      },
    },
    '& .MuiFormLabel-root': {
      '&.Mui-error': {
        color: theme.palette.primary.contrastText,
      },
      '&::after': {
        content: props.optional ? '" (optional)"' : '',
        fontWeight: 'normal',
        color: theme.palette.info.main,
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.spacing(4),
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.spacing(3.5),
        },
      },
    },
    '& .MuiFormHelperText-root': {
      fontWeight: 'bold',
      color: theme.palette.primary.light,
      position: props.errors ? 'absolute' : 'inherit',
      bottom: 0,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(3.5),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(3),
      },
      '&.MuiFormHelperText-filled': {
        color: theme.palette.info.main,
      },
      '&.Mui-error': {
        color: theme.palette.error.main,
      },
    },
    '& .MuiSvgIcon-root': {
      width: theme.spacing(3.25),
      height: theme.spacing(2.5),
      top: 'calc(50% - 5px)',
      [theme.breakpoints.up('sm')]: {
        right: theme.spacing(3.75),
      },
      [theme.breakpoints.down('sm')]: {
        right: theme.spacing(3.25),
      },
      position: 'absolute',
      pointerEvents: 'none',
    },
    '& .MuiInputBase-root': {
      backgroundColor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.grey[100]}`,
      borderRadius: '2px',
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3.75),
        paddingRight: theme.spacing(3.75),
        fontSize: theme.spacing(4.5),
        height: theme.spacing(15), // 11.25
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(3.25),
        paddingRight: theme.spacing(3.25),
        fontSize: theme.spacing(4),
        height: theme.spacing(12.5), // 8.75
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
    // '& input, & select.MuiSelect-select': {},
    '& input[type=number]': {
      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
  }),
}));

function TriggerTextField({
  triggerOnChange,
  transformValue,
  ...props
}: TriggerTextFieldProps): JSX.Element {
  const {
    form: { setFieldValue },
    field: { name },
  } = props;
  const onChange = async (event: any): Promise<void> => {
    const { value } = event.target;
    if (triggerOnChange) {
      await triggerOnChange(value);
    }
    setFieldValue(name, transformValue ? transformValue(value) : value);
  };
  return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}

export default function RegenTextField({
  transformValue,
  triggerOnChange,
  errors = false,
  optional = false,
  children,
  startAdornment,
  endAdornment,
  ...props
}: RegenTextFieldProps): JSX.Element {
  const classes = useStyles({ ...props, optional, errors });
  return (
    <TriggerTextField
      {...props}
      transformValue={transformValue}
      triggerOnChange={triggerOnChange}
      className={clsx(classes.root, props.className)}
      InputProps={{
        disableUnderline: true,
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : null,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : null,
      }}
      InputLabelProps={{ focused: false, required: false }}
      fullWidth
    >
      {children}
    </TriggerTextField>
  );
}
