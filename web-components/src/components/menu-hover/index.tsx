import React, { useRef, useState } from 'react';
import { MenuList, Paper, Popover } from '@mui/material';

import DropdownIcon from '../icons/DropdownIcon';
import { useMenuHoverStyles } from './MenuHover.Styles';

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
  dropdownColor,
  children,
}: Props): JSX.Element => {
  const [openedPopover, setOpenedPopover] = useState(false);

  const popoverAnchor = useRef(null);

  const { classes: styles } = useMenuHoverStyles();

  const popoverEnter = (): void => {
    setOpenedPopover(true);
  };

  const popoverLeave = (): void => {
    setOpenedPopover(false);
  };

  const togglePopover = (): void => {
    setOpenedPopover(true);
  };

  return (
    <div>
      <span
        ref={popoverAnchor}
        aria-owns="mouse-over-popover"
        aria-haspopup="true"
        onMouseEnter={popoverEnter}
        onMouseLeave={popoverLeave}
        onClick={togglePopover}
      >
        {title && (
          <span className={classes?.title}>
            {title}
            <DropdownIcon className={styles.icon} color={dropdownColor} />
          </span>
        )}
        {renderTitle && renderTitle()}
      </span>
      {popoverAnchor.current !== null && (
        <Popover
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
          PaperProps={{
            onMouseEnter: popoverEnter,
            onMouseLeave: popoverLeave,
          }}
          disableScrollLock={true}
          sx={{ position: 'absolute' }}
        >
          <Paper className={styles.paper} elevation={5}>
            <MenuList
              classes={{ root: styles.text, padding: styles.noOutline }}
            >
              {children}
            </MenuList>
          </Paper>
        </Popover>
      )}
    </div>
  );
};

export default MenuHover;
