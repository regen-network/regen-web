import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import clsx from 'clsx';

//replacing #000 on line 15, color property, with theme.palette.primary.contrastText doesn't yield black text in the dropdown. Not sure why
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '80px',
  },
  bar: {
    width: '80%',
    height: '3px',
    'background-color': theme.palette.primary.contrastText,
    color: theme.palette.primary.contrastText,
    'border-color': theme.palette.primary.contrastText,
    'border-tyle': 'solid',
  },
}));

interface Props extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  textColor?: string;
}

/**
 *
 * @param object contains text, color, children. Where text is the anchor text. Color is a string for link text color, and children are MenuItems typically with Links.
 */
const MobileMenu = ({ textColor, children, className }: Props): JSX.Element => {
  let classes = useStyles({});
  return (
    <div className={clsx(className, classes.root)}>
      <hr className={classes.bar} />
      <hr className={classes.bar} />
      <hr className={classes.bar} />
    </div>
  );
};

export default MobileMenu;
