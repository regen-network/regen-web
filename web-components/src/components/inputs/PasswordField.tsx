import React, { useState, useEffect } from 'react';
import { useTheme, makeStyles, Theme } from '@material-ui/core/styles';
import zxcvbn, { ZXCVBNScore } from 'zxcvbn';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import EyeIcon from '../icons/EyeIcon';
import TextField, { RegenTextFieldProps } from './TextField';
import { validatePassword } from './validation';

interface PasswordFieldProps extends RegenTextFieldProps {
  signup?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  eyeIcon: {
    width: `${theme.spacing(4.75)} !important`,
    height: `${theme.spacing(4)} !important`,
    left: '2px',
    top: 'calc(50% - 7px) !important',
  },
}));

const scores = ['weak', 'okay', 'good', 'strong', 'stronger'];

function getScoreLabel(score: ZXCVBNScore): string {
  return `Password strength: ${scores[score]}`;
}

export default function PasswordField({ signup = false, ...props }: PasswordFieldProps): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>(!matches);

  useEffect(() => {
    setShowPassword(!matches);
  }, [matches, setShowPassword]);

  const {
    form: { errors },
    field: { name, value },
  } = props;

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
  };

  // Only verify password strength if valid to avoid unnecessary computation
  let score: ZXCVBNScore | undefined;
  if (validatePassword(value)) {
    score = zxcvbn(value).score;
  }

  return (
    <TextField
      label="Password"
      type={showPassword ? 'text' : 'password'}
      helperText={score !== undefined ? getScoreLabel(score) : errors[name]}
      FormHelperTextProps={{ filled: score !== undefined }}
      endAdornment={
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setShowPassword(!showPassword)}
          onMouseDown={handleMouseDownPassword}
        >
          <EyeIcon className={classes.eyeIcon} color={theme.palette.secondary.dark} visible={showPassword} />
        </IconButton>
      }
      {...props}
    />
  );
}
