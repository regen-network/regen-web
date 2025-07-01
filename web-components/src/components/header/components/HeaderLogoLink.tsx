import React from 'react';
import { makeStyles } from 'tss-react/mui';

import RegenIcon from '../../icons/RegenIcon';

const useStyles = makeStyles()(theme => {
  const { pxToRem } = theme.typography;

  return {
    icon: {
      display: 'block',
      height: 'auto',
      width: pxToRem(186),
      [theme.breakpoints.down('md')]: {
        width: pxToRem(111),
      },
      [theme.breakpoints.down('sm')]: {
        width: pxToRem(104),
      },
    },
  };
});

interface HeaderLogoLinkProps {
  color: string;
  linkComponent?: React.ElementType;
}

export const HeaderLogoLink = ({
  color,
  linkComponent,
}: HeaderLogoLinkProps): JSX.Element => {
  const { classes: styles } = useStyles();

  const LinkComponent = linkComponent ? linkComponent : 'a';
  return (
    <LinkComponent href="/">
      <RegenIcon className={styles.icon} color={color} />
    </LinkComponent>
  );
};
