import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
// import zxcvbn, { ZXCVBNScore } from 'zxcvbn';
// import { ZXCVBNResult } from 'zxcvbn';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DefaultTheme as Theme } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

import EyeIcon from '../icons/EyeIcon';
import TextField, { RegenTextFieldProps } from './TextField';
import { validatePassword } from './validation';

interface PasswordFieldProps extends RegenTextFieldProps {
  signup?: boolean;
}

const useStyles = makeStyles()((theme: Theme) => ({
  eyeIcon: {
    width: `${theme.spacing(4.75)} !important`,
    height: `${theme.spacing(4)} !important`,
    left: '2px',
    top: 'calc(50% - 7px) !important',
  },
}));

const scores = ['weak', 'okay', 'good', 'strong', 'stronger'];

function getScoreLabel(score: number): string {
  return `Password strength: ${scores[score]}`;
}

export default function PasswordField({
  signup = false,
  ...props
}: PasswordFieldProps): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const { classes } = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>(!matches);
  const [score, setScore] = useState<number | undefined>();

  useEffect(() => {
    setShowPassword(!matches);
  }, [matches, setShowPassword]);

  const {
    form: { errors },
    field: { name, value },
  } = props;

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLElement>,
  ): void => {
    event.preventDefault();
  };

  const onChange = async (event: any): Promise<void> => {
    // Only verify password strength if valid to avoid unnecessary computation
    if (signup && validatePassword(value)) {
      const { default: zxcvbn } = await import('zxcvbn');
      setScore(zxcvbn(value).score);
    }
  };

  return (
    <TextField
      label="Password"
      type={showPassword ? 'text' : 'password'}
      helperText={
        score !== undefined ? getScoreLabel(score) : String(errors[name])
      }
      FormHelperTextProps={{ filled: score !== undefined }}
      triggerOnChange={onChange}
      endAdornment={
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setShowPassword(!showPassword)}
          onMouseDown={handleMouseDownPassword}
          size="large"
        >
          <EyeIcon
            className={classes.eyeIcon}
            color={theme.palette.secondary.dark}
            visible={showPassword}
          />
        </IconButton>
      }
      {...props}
    />
  );
}
