import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { DefaultTheme as Theme } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

interface IconProps {
  className?: string;
  isActive?: boolean;
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    width: theme.spacing(9.25),
    height: theme.spacing(9.25),
    fill: theme.palette.primary.main,
  },
}));

function TrustDocumentIcon({ className }: IconProps): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <SvgIcon
      className={cx(className, classes.root)}
      width="63"
      height="79"
      viewBox="0 0 63 79"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M61.4156 77H2V2H40.8112L61.4156 22.5295V77Z"
        stroke="#4FB573"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M31.6703 63.6634C41.3946 63.6634 49.2777 55.7803 49.2777 46.056C49.2777 36.3317 41.3946 28.4486 31.6703 28.4486C21.946 28.4486 14.0629 36.3317 14.0629 46.056C14.0629 55.7803 21.946 63.6634 31.6703 63.6634Z"
        stroke="#FFC432"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.4286 48.4536L28.0739 53.0989L39.987 41.1859"
        stroke="#FFC432"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.8112 2V22.5295H61.4156"
        stroke="#4FB573"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default TrustDocumentIcon;
