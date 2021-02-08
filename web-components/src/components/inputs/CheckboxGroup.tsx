import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckedIcon from '../icons/CheckedIcon';
import UncheckedIcon from '../icons/UncheckedIcon';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { FieldProps } from 'formik';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& label': {
      lineHeight: '140%',
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
        color: theme.palette.primary.contrastText,
      },
    },
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  },
}));

interface CheckboxGroupProps extends FieldProps {
  label: string;
  className?: string;
  options: {
    label: string;
    value: string;
  }[];
}

export default function CheckboxGroup({ label, options, ...props }: CheckboxGroupProps): JSX.Element {
  const classes = useStyles();
  const {
    form: { setFieldValue },
    field: { name, value },
  } = props;

  return (
    <FormControl className={`${classes.root} ${props.className}`}>
      <FormLabel>{label}</FormLabel>
      <FormGroup>
        {options.map((opt, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                color="secondary"
                icon={<UncheckedIcon />}
                checkedIcon={<CheckedIcon />}
                onChange={(e, c) => {
                  if (c) {
                    value.push(opt.value);
                  } else {
                    const index = value.indexOf(opt.value);
                    if (index > -1) {
                      value.splice(index, 1);
                    }
                  }
                  setFieldValue(name, value);
                }}
              />
            }
            label={opt.label}
            value={opt.value}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
