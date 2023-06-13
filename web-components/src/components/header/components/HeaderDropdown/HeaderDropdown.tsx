import React from 'react';
import Box from '@mui/material/Box';
import ReactHtmlParser from 'html-react-parser';

import { Title } from '../../../typography';
import { NavLinkProps } from '../NavLink';
import {
  HeaderDropdownItem,
  HeaderDropdownItemProps,
} from './HeaderDropdown.Item';
import { useStyles } from './HeaderDropdown.styles';

/** column with optional title and links */
const HeaderDropdown: React.FC<
  React.PropsWithChildren<{
    items: HeaderDropdownItemProps[];
    linkComponent: React.FC<React.PropsWithChildren<NavLinkProps>>;
    title?: string;
  }>
> = props => {
  const { classes: styles } = useStyles();
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
export { HeaderDropdown };
