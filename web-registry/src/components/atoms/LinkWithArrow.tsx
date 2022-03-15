import React from 'react';
import { makeStyles } from '@mui/styles';
import { Link } from '@mui/material';

import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { parseText } from 'web-components/lib/utils/textParser';

const useStylesLink = makeStyles(theme => ({
  arrowIcon: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0.3),
    height: 9,
    width: 13,
  },
}));

interface LinkProps {
  link: string;
  label: string | JSX.Element;
  className?: string;
}

export const LinkWithArrow = ({
  link,
  label,
  className,
}: LinkProps): JSX.Element => {
  const styles = useStylesLink();

  return (
    <Link href={link} className={className} target="_blank" rel="noreferrer">
      {parseText(label)}
      <SmallArrowIcon className={styles.arrowIcon} />
    </Link>
  );
};
