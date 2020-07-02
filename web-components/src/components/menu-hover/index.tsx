import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Popover, MenuList, Paper, Theme } from '@material-ui/core';

//replacing #000 on line 15, color property, with theme.palette.primary.contrastText doesn't yield black text in the dropdown. Not sure why
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& svg': {
      position: 'relative',
      top: '-1px',
    },
  },
  popover: {
    pointerEvents: 'none',
  },
  popoverContent: {
    pointerEvents: 'auto',
  },
  text: {
    '& li > a': {
      'font-family': 'lato',
      color: '#000',
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  paper: {
    'border-radius': '0px',
    border: `1px solid ${theme.palette.info.light}`,
  },
}));

interface styleProps {
  textColor: string;
}

interface Props {
  children: React.ReactNode;
  text: string;
  textColor?: string;
}

/**
 *
 * @param object contains text, color, children. Where text is the anchor text. Color is a string for link text color, and children are MenuItems typically with Links.
 */
const MenuHover = ({ text, textColor, children }: Props): JSX.Element => {
  const [openedPopover, setOpenedPopover] = useState(false);
  const popoverAnchor = useRef(null);

  // nullish coalescing operator ?? to avoid typescript error on undefined
  const classes = useStyles({ textColor: textColor ?? '' });

  const popoverEnter = ({ currentTarget }: any): void => {
    setOpenedPopover(true);
  };

  const popoverLeave = ({ currentTarget }: any): void => {
    setOpenedPopover(false);
  };

  return (
    <div className={classes.root}>
      <span
        ref={popoverAnchor}
        aria-owns="mouse-over-popover"
        aria-haspopup="true"
        onMouseEnter={popoverEnter}
        onMouseLeave={popoverLeave}
      >
        {text}
      </span>{' '}
      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.69995 7.7336C5.59994 7.86684 5.40006 7.86684 5.30005 7.7336L0.171111 0.900071C0.0474202 0.735273 0.165005 0.5 0.371057 0.5L10.6289 0.500001C10.835 0.500001 10.9526 0.735274 10.8289 0.900072L5.69995 7.7336Z"
          fill="#B9E1C7"
        />
      </svg>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.popoverContent,
        }}
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
      >
        <Paper className={`${classes.paper}`}>
          <MenuList className={`${classes.text}`}>{children}</MenuList>
        </Paper>
      </Popover>
    </div>
  );
};

export default MenuHover;
