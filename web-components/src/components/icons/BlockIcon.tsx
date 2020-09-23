import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

import withHoverColor, { Props } from './withHoverColor';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.spacing(9.25),
    height: theme.spacing(9.25),
  },
}));

function BlockIcon({ className, color, onMouseEnter, onMouseLeave }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(className, classes.root)}
      viewBox="0 0 62 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.5503 0.406334C30.9903 0.130084 30.3333 0.131303 29.7743 0.409631L1.10863 14.6812C0.428186 15.02 -0.00140762 15.7152 3.45707e-06 16.4753C0.000251277 16.6088 0.0137877 16.7403 0.0396308 16.8681C0.0135223 16.9972 0 17.1299 0 17.2645V45.7927C0 46.5526 0.430554 47.2468 1.11123 47.5844L29.893 61.8618C30.0528 61.9432 30.2213 62.0018 30.3936 62.0375C30.6758 62.0961 30.967 62.0928 31.2468 62.0287C31.405 61.9924 31.5596 61.9368 31.7068 61.8618L60.4886 47.5844C61.1693 47.2468 61.5998 46.5526 61.5998 45.7927V17.2645C61.5998 17.1301 61.5863 16.9976 61.5603 16.8686C61.5867 16.7382 61.6002 16.6041 61.6 16.4679C61.5986 15.7078 61.1664 15.0142 60.4847 14.6779L31.5503 0.406334ZM6.50429 16.4632L30.6698 4.43211L55.0957 16.48L30.9302 28.5111L6.50429 16.4632ZM32.8 32.7913V56.8544L57.5998 44.5523V20.4891L32.8 32.7913ZM4 20.4891L28.7998 32.7913V56.8544L4 44.5523V20.4891Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default withHoverColor(BlockIcon);
