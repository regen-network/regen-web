import React, { useState, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { DefaultTheme as Theme } from '@mui/styles';
import { Popover, MenuList, Paper } from '@mui/material';
import DropdownIcon from '../icons/DropdownIcon';

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  popoverContent: {
    pointerEvents: 'auto',
    marginTop: theme.spacing(4),
  },
  text: {
    '& li.MuiMenuItem-root:hover': {
      backgroundColor: 'transparent',
    },
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
  noOutline: {
    outline: 'none',
    '&:focus, &:selected': {
      outline: 'none',
    },
  },
  paper: {
    'border-radius': '2px',
    border: `1px solid ${theme.palette.grey[400]}`,
    padding: theme.spacing(5, 9),
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
}));

export interface MenuTitle {
  title?: string;
  renderTitle?: () => JSX.Element;
}

interface Props extends MenuTitle {
  classes?: {
    title?: string;
  };
  children: React.ReactNode;
  textColor?: string;
  dropdownColor?: string;
}

/**
 *
 * @param object contains text, color, children. Where text is the anchor text. Color is a string for link text color, and children are MenuItems typically with Links.
 */
const MenuHover = ({
  title,
  renderTitle,
  classes,
  textColor,
  dropdownColor,
  children,
}: Props): JSX.Element => {
  const [openedPopover, setOpenedPopover] = useState(false);
  const popoverAnchor = useRef(null);

  // nullish coalescing operator ?? to avoid typescript error on undefined
  const styles = useStyles({ textColor: textColor ?? '' });

  const popoverEnter = (): void => {
    setOpenedPopover(true);
  };

  const popoverLeave = (): void => {
    setOpenedPopover(false);
  };

  return (
    <div>
      <span
        ref={popoverAnchor}
        aria-owns="mouse-over-popover"
        aria-haspopup="true"
        onMouseEnter={popoverEnter}
        onMouseLeave={popoverLeave}
      >
        {title && (
          <span className={classes?.title}>
            {title}
            <DropdownIcon className={styles.icon} color={dropdownColor} />
          </span>
        )}
        {renderTitle && renderTitle()}
      </span>
      <Popover
        // disableScrollLock
        disableRestoreFocus
        id="mouse-over-popover"
        className={styles.popover}
        classes={{
          paper: styles.popoverContent,
        }}
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
      >
        <Paper className={styles.paper} elevation={5}>
          <MenuList classes={{ root: styles.text, padding: styles.noOutline }}>
            {children}
          </MenuList>
        </Paper>
      </Popover>
    </div>
  );
};

export default MenuHover;
