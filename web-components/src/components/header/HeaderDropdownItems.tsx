import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Title from '../title';
import { NavLinkProps } from './NavLink';

const useStyles = makeStyles(theme => {
  const { pxToRem } = theme.typography;
  return {
    item: {
      padding: theme.spacing(1.5, 0),
      '&:first-of-type': {
        paddingTop: 0,
      },
      '&:last-of-type': {
        paddingBottom: 0,
      },
    },
    label: {
      fontSize: pxToRem(14),
      letterSpacing: '1px',
      lineHeight: pxToRem(17.57),
      fontWeight: 800,
      color: theme.palette.info.dark,
      textTransform: 'uppercase',
    },
  };
});

export type HeaderDropdownItemProps = {
  title: string;
  href: string;
  linkComponent: React.FC<NavLinkProps>;
  svg?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  right?: () => JSX.Element;
};

export const HeaderDropdownItem: React.FC<HeaderDropdownItemProps> = ({
  svg: SVG,
  linkComponent: LinkComponent,
  ...props
}) => {
  const styles = useStyles();
  return (
    <Box
      display="flex"
      flexWrap="nowrap"
      alignItems="center"
      className={styles.item}
    >
      {SVG && (
        <Box mr={3}>
          <SVG />
        </Box>
      )}
      <LinkComponent href={props.href}>
        {ReactHtmlParser(props.title)}
      </LinkComponent>
      {props.right && <Box ml={3}>{props.right()}</Box>}
    </Box>
  );
};

/** column with a title and links */
export const HeaderDropdownColumn: React.FC<{
  items: HeaderDropdownItemProps[];
  linkComponent: React.FC<NavLinkProps>;
  title?: string;
}> = props => {
  const styles = useStyles();
  return (
    <Box display="flex" flexDirection="column">
      {props.title && (
        <Box mb={2}>
          <Title variant="h4" className={styles.label}>
            {ReactHtmlParser(props.title)}
          </Title>
        </Box>
      )}
      {props.items.map((link, i) => (
        <HeaderDropdownItem
          key={i}
          {...link}
          linkComponent={props.linkComponent}
        />
      ))}
    </Box>
  );
};
