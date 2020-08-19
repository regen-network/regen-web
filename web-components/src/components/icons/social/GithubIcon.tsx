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

function GithubIcon({ className, color, onMouseEnter, onMouseLeave }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(className, classes.root)}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1028 6.08398C11.0188 6.08398 6.08398 11.0188 6.08398 17.1028C6.08398 21.97 9.26118 26.0936 13.5876 27.5808C14.1284 27.6484 14.3312 27.3104 14.3312 27.04C14.3312 26.7696 14.3312 26.0936 14.3312 25.1472C11.2892 25.8232 10.6132 23.66 10.6132 23.66C10.14 22.3756 9.39638 22.0376 9.39638 22.0376C8.38238 21.3616 9.46398 21.3616 9.46398 21.3616C10.5456 21.4292 11.154 22.5108 11.154 22.5108C12.168 24.2008 13.7228 23.7276 14.3312 23.4572C14.3988 22.7136 14.7368 22.2404 15.0072 21.97C12.5736 21.6996 10.0048 20.7532 10.0048 16.4944C10.0048 15.2776 10.4104 14.3312 11.154 13.52C11.0864 13.3172 10.6808 12.168 11.2892 10.6808C11.2892 10.6808 12.2356 10.4104 14.3312 11.83C15.21 11.5596 16.1564 11.492 17.1028 11.492C18.0492 11.492 18.9956 11.6272 19.8744 11.83C21.97 10.4104 22.9164 10.6808 22.9164 10.6808C23.5248 12.168 23.1192 13.3172 23.0516 13.5876C23.7276 14.3312 24.2008 15.3452 24.2008 16.562C24.2008 20.8208 21.632 21.6996 19.1984 21.97C19.604 22.308 19.942 22.984 19.942 23.998C19.942 25.4852 19.942 26.6344 19.942 27.04C19.942 27.3104 20.1448 27.6484 20.6856 27.5808C25.0796 26.0936 28.1892 21.97 28.1892 17.1028C28.1216 11.0188 23.1868 6.08398 17.1028 6.08398Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default withHoverColor(GithubIcon);
