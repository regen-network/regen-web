import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { DefaultTheme as Theme } from '@mui/styles';

interface StyleProps {
  color?: string;
}

export interface TagProps {
  className?: string;
  color: string;
  name: string;
}

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
const useStyles = makeStyles()((theme: Theme) => ({
  tag: props => ({
    backgroundColor: props.color || theme.palette.secondary.main,
    color: theme.palette.primary.main,
    lineHeight: theme.spacing(4.5),
    fontSize: theme.spacing(3.5),
    letterSpacing: '1px',
    textTransform: 'uppercase',
    textAlign: 'center',
    borderRadius: '2px',
    fontFamily: theme.typography.h1.fontFamily,
    padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
    marginRight: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    whiteSpace: 'nowrap',
    '&:last-child': {
      marginRight: 0,
    },
  }),
}));

export default function Tag({ className, name, color }: TagProps): JSX.Element {
  const { classes, cx } = useStyles({ color });

  return <span className={cx(className, classes.tag)}>{name}</span>;
}
