import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';

interface OutlinedButtonProps extends ButtonProps {
  target?: string;
  rel?: string;
  isImageBtn?: boolean;
}

// MUI won't allow passing `component="label"` when extending `ButtonProps`, so this is a workaround
const SpanButton: React.FC = props => <Button variant="contained" component="span" {...props} />;

const styleCallback = (theme: Theme): any => ({
  root: {
    border: `2px solid ${theme.palette.secondary.light}`,
    borderRadius: '2px',
    color: theme.palette.secondary.main,
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    letterSpacing: '1px',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      boxShadow: 'none',
    },
  },
});

const CustomButton = withStyles(styleCallback)(Button);
const CustomLabel = withStyles(styleCallback)(SpanButton);

export default function OutlinedButton({ isImageBtn, ...props }: OutlinedButtonProps): JSX.Element {
  const Component = isImageBtn ? CustomLabel : CustomButton;
  return (
    <Component color="secondary" {...props}>
      {props.children}
    </Component>
  );
}
