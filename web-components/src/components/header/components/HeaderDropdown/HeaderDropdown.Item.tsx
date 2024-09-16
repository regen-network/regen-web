import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import ReactHtmlParser from 'html-react-parser';

import InfoTooltip from 'src/components/tooltip/InfoTooltip';

import { cn } from '../../../../utils/styles/cn';
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
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  disabledTooltipText?: string;
};

export const HeaderDropdownItem: React.FC<
  React.PropsWithChildren<HeaderDropdownItemProps>
> = ({
  svg: SVG,
  icon,
  children,
  importCallback,
  linkComponent: LinkComponent,
  className,
  labelClassName,
  ...props
}) => {
  const { classes: styles } = useStyles();
  const onHover = (): Promise<any> | undefined =>
    importCallback && importCallback();

  // If the icon is disabled, we need to add two new
  // props to change the color to grey and disable it
  const iconElement =
    icon && props.disabled
      ? React.cloneElement(icon, {
          disabled: true,
          color: '#8F8F8F',
        })
      : icon;

  return (
    <Box
      display="flex"
      flexWrap="nowrap"
      alignItems="center"
      className={cn(styles.item, className)}
      onMouseEnter={onHover}
    >
      {SVG && (
        <Box className="mr-[18px] flex items-center">
          <SVG />
        </Box>
      )}
      {iconElement && (
        <Box className="mr-[18px] flex items-center">{iconElement}</Box>
      )}
      {props.pathname &&
        (props.disabled ? (
          <InfoTooltip title={props.disabledTooltipText} arrow>
            <div>
              <LinkComponent
                className={cn(labelClassName, 'cursor-default text-grey-400')}
                pathname={props.pathname}
                href={props.href}
                disabled={props.disabled}
              >
                {ReactHtmlParser(props.label)}
              </LinkComponent>
            </div>
          </InfoTooltip>
        ) : (
          <LinkComponent
            className={labelClassName}
            pathname={props.pathname}
            href={props.href}
          >
            {ReactHtmlParser(props.label)}
          </LinkComponent>
        ))}
      {children && children}
      {props.right && <Box ml={3}>{props.right()}</Box>}
    </Box>
  );
};
