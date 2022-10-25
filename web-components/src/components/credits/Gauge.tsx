import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { DefaultTheme as Theme } from '@mui/styles';

interface GaugeProps {
  amount: number;
  totalAmount: number;
  height?: string;
  borderRadius?: string;
}

interface StyleProps {
  percentage: number;
  height?: string;
  borderRadius?: string;
}

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    height: props => props.height || theme.spacing(1.25),
    borderRadius: props => props.borderRadius || '0.5rem',
    backgroundColor: theme.palette.info.light,
    border: `1px solid ${theme.palette.grey[100]}`,
  },
  gauge: props => ({
    width: `${props.percentage}%`,
    height: '100%',
    backgroundColor: theme.palette.secondary.main,
    borderTopLeftRadius: props.borderRadius || '0.5rem',
    borderBottomLeftRadius: props.borderRadius || '0.5rem',
  }),
}));

export default function Gauge({
  amount,
  totalAmount,
  height,
  borderRadius,
}: GaugeProps): JSX.Element {
  const { classes } = useStyles({
    percentage: totalAmount ? (100 * amount) / totalAmount : 0,
    height,
    borderRadius,
  });
  return (
    <div className={classes.root}>
      <div className={classes.gauge} />
    </div>
  );
}
