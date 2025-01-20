import React, { useRef } from 'react';
import {
  MenuList,
  Paper,
  Popover,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import cx from 'clsx';

import DropdownIcon from '../../../icons/DropdownIcon';
import { useMenuHoverStyles } from './HeaderMenuItem.Hover.styles';

export interface MenuTitle {
  title?: string;
  renderTitle?: () => JSX.Element;
}

interface Props extends MenuTitle {
  classes?: {
    title?: string;
    paper?: string;
  };
  children: React.ReactNode;
  textColor?: string;
  dropdownColor?: string;
}

/**
 *
 * @param object contains text, color, children. Where text is the anchor text. Color is a string for link text color, and children are MenuItems typically with Links.
 */
const HeaderMenuItemHover = ({
  title,
  renderTitle,
  classes,
  dropdownColor,
  children,
}: Props): JSX.Element => {
  const { classes: styles } = useMenuHoverStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const popoverAnchor = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverToggle = () => {
    setAnchorEl(el => (el ? null : popoverAnchor.current));
  };

  const handlePopoverOpen = () => {
    setAnchorEl(popoverAnchor.current);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <span
        ref={popoverAnchor}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={isMobile ? undefined : handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={isMobile ? handlePopoverToggle : undefined}
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
        disableRestoreFocus
        id="mouse-over-popover"
        className={styles.popover}
        classes={{
          paper: styles.popoverContent,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            onClick: handlePopoverClose,
          },
        }}
        onClose={handlePopoverClose}
        disableScrollLock={true}
        sx={{ position: 'absolute' }}
      >
        <Paper className={cx(classes?.paper, styles.paper)} elevation={5}>
          <MenuList
            classes={{ root: styles.text, padding: styles.noOutline }}
            disablePadding
          >
            {children}
          </MenuList>
        </Paper>
      </Popover>
    </div>
  );
};

export default HeaderMenuItemHover;
