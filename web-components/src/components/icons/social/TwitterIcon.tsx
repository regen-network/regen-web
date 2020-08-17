import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

interface props extends React.HTMLProps<HTMLDivElement> {
  width?: string;
  height?: string;
}

const useStyles = makeStyles<Theme, props>((theme: Theme) => ({
  root: props => ({
    width: props.width || theme.spacing(9.25),
    height: props.height || theme.spacing(9.25),
  }),
}));

export default function TwitterIcon({ width, height, className }: props): JSX.Element {
  const classes = useStyles({ width, height });

  return (
    <SvgIcon
      className={clsx(className, classes.root)}
      viewBox="0 0 38 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M28.0936 12.6556C27.4157 12.9202 26.7378 13.1848 26.0599 13.273C26.8225 12.832 27.331 12.1265 27.5852 11.2446C26.9073 11.6855 26.1447 11.9501 25.2973 12.1265C24.6194 11.4209 23.6874 10.98 22.6705 10.98C20.7216 10.98 19.1117 12.6556 19.1117 14.6841C19.1117 14.9487 19.1117 15.3014 19.1964 15.566C16.2307 15.3896 13.6039 13.9785 11.8245 11.6855C11.4855 12.2147 11.3161 12.832 11.3161 13.5376C11.3161 14.8605 11.9092 15.9188 12.926 16.6243C12.3329 16.6243 11.8245 16.4479 11.3161 16.1834V16.2715C11.3161 18.0354 12.5024 19.5347 14.197 19.8875C13.8581 19.9756 13.6039 19.9756 13.265 19.9756C13.0108 19.9756 12.8413 19.9756 12.5871 19.8875C13.0108 21.3867 14.3665 22.445 15.8917 22.445C14.7055 23.4152 13.1802 24.0325 11.4855 24.0325C11.2313 24.0325 10.8924 24.0325 10.6382 23.9443C12.2481 25.0026 14.1123 25.62 16.0612 25.62C22.5858 25.62 26.1447 19.9756 26.1447 15.125C26.1447 14.9487 26.1447 14.7723 26.1447 14.6841C26.992 14.0667 27.5852 13.3612 28.0936 12.6556Z"
        fill="#FAFAFA"
      />
    </SvgIcon>
  );
}
