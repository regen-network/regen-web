import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { fieldToTextField, TextFieldProps } from 'formik-material-ui';
import MuiTextField from '@material-ui/core/TextField';

interface TriggerTextFieldProps extends TextFieldProps {
  triggerOnChange?: (v: any) => Promise<void>;
  transformValue?: (v: any) => any;
}

interface RegenTextFieldProps extends TextFieldProps {
  children?: any;
  errors?: boolean;
  triggerOnChange?: (v: any) => Promise<void>;
  transformValue?: (v: any) => void;
}

interface StyleProps extends TextFieldProps {
  errors: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    '& label': {
      transform: 'scale(1)',
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4.5),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(4),
      },
      '&.Mui-focused': {
        display: 'block',
      },
    },
    '& .MuiInput-formControl': {
      marginTop: props.label ? theme.spacing(7) : 0,
      [theme.breakpoints.up('sm')]: {
        marginBottom: props.errors ? theme.spacing(5.25) : 0,
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: props.errors ? theme.spacing(4.75) : 0,
      },
    },
    '& .MuiFormLabel-root': {
      '&.Mui-error': {
        color: theme.palette.primary.contrastText,
      },
    },
    '& .MuiFormHelperText-root': {
      fontWeight: 'bold',
      position: props.errors ? 'absolute' : 'inherit',
      bottom: 0,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(3.5),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3),
      },
    },
    '& .MuiSvgIcon-root': {
      width: theme.spacing(3.25),
      height: theme.spacing(2.5),
      top: 'calc(50% - 5px)',
      [theme.breakpoints.up('sm')]: {
        right: theme.spacing(3.75),
      },
      [theme.breakpoints.down('xs')]: {
        right: theme.spacing(3.25),
      },
      position: 'absolute',
      pointerEvents: 'none',
    },
    '& .MuiInputBase-root': {
      '&.Mui-error': {
        '& input, & .MuiSelect-select': {
          borderColor: theme.palette.error.main,
        },
      },
    },
    '& input, & select.MuiSelect-select': {
      border: `1px solid ${theme.palette.grey[50]}`,
      borderRadius: '2px',
      height: theme.spacing(12.5),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3.75),
        paddingRight: theme.spacing(3.75),
      },
      [theme.breakpoints.down('xs')]: {
        paddingLeft: theme.spacing(3.25),
        paddingRight: theme.spacing(3.25),
      },
    },
    '& input[type=number]': {
      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
  }),
}));

function TriggerTextField({ triggerOnChange, transformValue, ...props }: TriggerTextFieldProps): JSX.Element {
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
  children,
  ...props
}: RegenTextFieldProps): JSX.Element {
  const classes = useStyles({ ...props, errors });
  return (
    <TriggerTextField
      {...props}
      transformValue={transformValue}
      triggerOnChange={triggerOnChange}
      className={`${classes.root} ${props.className}`}
      InputProps={{ disableUnderline: true }}
      InputLabelProps={{ focused: false }}
      fullWidth
    >
      {children}
    </TriggerTextField>
  );
}
