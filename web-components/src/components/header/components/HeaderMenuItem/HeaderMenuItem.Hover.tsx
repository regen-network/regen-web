import { MenuList } from '@mui/material';

import DropdownIcon from '../../../icons/DropdownIcon';
import { useMenuHoverStyles } from './HeaderMenuItem.Hover.styles';
import { useMenuState } from './hooks/useMenuState';

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
  isUserMenu?: boolean;
  pathname: string;
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
  isUserMenu,
  pathname,
}: Props): JSX.Element => {
  const { classes: styles } = useMenuHoverStyles();

  const {
    isMenuOpen,
    hasInteracted,
    isTouchScreen,
    openMenu,
    closeMenu,
    toggleMenu,
  } = useMenuState(pathname);

  return (
    <div
      className="relative p-10"
      onMouseEnter={isTouchScreen ? undefined : openMenu}
      onMouseLeave={closeMenu}
    >
      <span
        className="relative"
        aria-owns={isMenuOpen ? 'mouse-over-menu' : undefined}
        aria-haspopup="true"
        onClick={isTouchScreen ? toggleMenu : undefined}
      >
        {title && (
          <span className={classes?.title}>
            {title}
            <DropdownIcon className={styles.icon} color={dropdownColor} />
          </span>
        )}
        {renderTitle && renderTitle()}
      </span>
      <nav
        id="mouse-over-menu"
        className={`absolute top-15 ${
          isUserMenu ? 'pt-35' : 'top-full'
        } right-0 z-50 ${
          isMenuOpen
            ? 'block opacity-100' + (hasInteracted ? ' animate-menuOpen' : '')
            : 'opacity-0' +
              (hasInteracted
                ? ' animate-menuClose pointer-events-none'
                : ' hidden')
        }`}
        onClick={isTouchScreen ? closeMenu : undefined}
      >
        <MenuList
          className="bg-grey-0 rounded-[4px] border border-solid border-grey-300 shadow-[0px_5px_5px_-3px_rgba(0,0,0,0.2),_0px_8px_10px_1px_rgba(0,0,0,0.14),_0px_3px_14px_2px_rgba(0,0,0,0.12)]"
          classes={{ root: styles.text, padding: styles.noOutline }}
          disablePadding
          component="div"
        >
          {children}
        </MenuList>
      </nav>
    </div>
  );
};

export default HeaderMenuItemHover;
