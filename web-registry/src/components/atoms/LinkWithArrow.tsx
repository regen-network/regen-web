import React from 'react';
import { makeStyles } from '@mui/styles';
import { Link } from '@mui/material';
import { SxProps } from '@mui/system';

import { Theme } from 'web-components/lib/theme/muiTheme';
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
  sx?: SxProps<Theme>;
  link: string;
  label: string | JSX.Element;
  className?: string;
  target?: '_blank' | '_self';
}

const LinkWithArrow: React.FC<LinkProps> = ({
  sx,
  link,
  label,
  className,
  target = '_blank',
}) => {
  const styles = useStylesLink();

  return (
    <Link
      href={link}
      className={className}
      sx={{ color: 'info.dark', ...sx }}
      target={target}
      rel="noreferrer"
    >
      {parseText(label)}
      {link && <SmallArrowIcon className={styles.arrowIcon} />}
    </Link>
  );
};

export { LinkWithArrow };
