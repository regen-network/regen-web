import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { makeStyles } from 'tss-react/mui';
import { DefaultTheme as Theme } from '@mui/styles';

interface props extends SvgIconProps {
  width?: string;
  height?: string;
}

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
const useStyles = makeStyles()((theme: Theme) => ({
  root: props => ({
    width: props.width || 'inherit',
    height: props.height || 'inherit',
  }),
}));

export default function HamburgerIcon({
  width,
  height,
  className,
  ...props
}: props): JSX.Element {
  const { classes, cx } = useStyles({ width, height });

  return (
    <SvgIcon
      className={cx(className, classes.root)}
      viewBox="0 0 29 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="29" height="2" rx="0.25" fill="#8F8F8F" />
      <rect y="10" width="29" height="2" rx="0.25" fill="#8F8F8F" />
      <rect y="20" width="29" height="2" rx="0.25" fill="#8F8F8F" />
    </SvgIcon>
  );
}
