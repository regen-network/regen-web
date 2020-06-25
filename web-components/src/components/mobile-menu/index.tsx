import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import clsx from 'clsx';
import HamburgerIcon from '../icons/HamburgerIcon';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '8vh',
  },
  bar: {
    'margin-bottom': '15px',
    width: '80%',
    height: '2px',
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
      <HamburgerIcon />
    </div>
  );
};

export default MobileMenu;
