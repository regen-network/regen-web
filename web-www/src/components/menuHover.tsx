import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Popover, MenuList, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  popoverContent: {
    pointerEvents: 'auto',
  },
  text: (props: styleProps) => ({
    '& a': {
      color: props.color || '#ccc',
    },
    backgroundColor: 'rgba(51, 170, 51, 0)',
  }),
}));

interface styleProps {
  menuTextColor: string;
}

interface Props {
  children: React.ReactNode;
  text: string;
  menuTextColor?: string;
  anchorTextColor?: string;
}

/**
 *
 * @param object contains text, color, children. Where text is the anchor text. Color is a string for link text color, and children are MenuItems typically with Links.
 */
const MenuHover = ({ text, anchorTextColor, menuTextColor, children }: Props) => {
  const [openedPopover, setOpenedPopover] = useState(false);
  const popoverAnchor = useRef(null);

  // nullish coalescing operator ?? to avoid typescript error on undefined
  const classes = useStyles({ menuTextColor: menuTextColor ?? '' });

  const popoverEnter = ({ currentTarget }: any) => {
    setOpenedPopover(true);
  };

  const popoverLeave = ({ currentTarget }: any) => {
    setOpenedPopover(false);
  };

  return (
    <div>
      <span
        style={{ color: `${anchorTextColor}` }}
        ref={popoverAnchor}
        aria-owns="mouse-over-popover"
        aria-haspopup="true"
        onMouseEnter={popoverEnter}
        onMouseLeave={popoverLeave}
      >
        {text}
      </span>
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
        <Paper>
          <MenuList className={`${classes.text}`}>{children}</MenuList>
        </Paper>
      </Popover>
    </div>
  );
};

export default MenuHover;
