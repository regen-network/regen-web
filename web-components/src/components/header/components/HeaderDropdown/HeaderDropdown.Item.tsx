import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import ReactHtmlParser from 'html-react-parser';

import { NavLinkProps } from '../NavLink';
import { useStyles } from './HeaderDropdown.styles';

export type HeaderDropdownItemProps = {
  label: string;
  href: string;
  pathname: string;
  linkComponent: React.FC<React.PropsWithChildren<NavLinkProps>>;
  importCallback?: () => Promise<any>;
  svg?: React.FunctionComponent<
    React.PropsWithChildren<React.SVGProps<SVGSVGElement>>
  >;
  icon?: JSX.Element;
  children?: ReactNode;
  right?: () => JSX.Element;
};

export const HeaderDropdownItem: React.FC<
  React.PropsWithChildren<HeaderDropdownItemProps>
> = ({
  svg: SVG,
  icon,
  children,
  importCallback,
  linkComponent: LinkComponent,
  ...props
}) => {
  const { classes: styles } = useStyles();
  const onHover = (): Promise<any> | undefined =>
    importCallback && importCallback();
  return (
    <Box
      display="flex"
      flexWrap="nowrap"
      alignItems="center"
      className={styles.item}
      onMouseEnter={onHover}
    >
      {SVG && (
        <Box mr={3}>
          <SVG />
        </Box>
      )}
      {icon && <Box mr={3}>{icon}</Box>}
      {props.pathname && (
        <LinkComponent pathname={props.pathname} href={props.href}>
          {ReactHtmlParser(props.label)}
        </LinkComponent>
      )}
      {children && children}
      {props.right && <Box ml={3}>{props.right()}</Box>}
    </Box>
  );
};
