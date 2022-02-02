import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import clsx from 'clsx';

interface IconProps {
  className?: string;
  isActive?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.spacing(9.25),
    height: theme.spacing(9.25),
    fill: theme.palette.primary.main,
  },
}));

function RegistrationIcon({ className, isActive }: IconProps): JSX.Element {
  const classes = useStyles();

  return isActive ? (
    <SvgIcon
      className={clsx(className, classes.root)}
      width="84"
      height="62"
      viewBox="0 0 84 62"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1" fill="white">
        <rect width="84" height="62" rx="2" />
      </mask>
      <rect
        width="84"
        height="62"
        rx="2"
        fill="white"
        stroke="#4FB573"
        strokeWidth="6"
        mask="url(#path-1-inside-1)"
      />
      <path d="M2 14H82" stroke="#4FB573" strokeWidth="2" />
      <rect
        x="47"
        y="28"
        width="3"
        height="23"
        rx="0.25"
        transform="rotate(-90 47 28)"
        fill="#4FB573"
      />
      <rect
        x="47"
        y="34"
        width="2"
        height="28"
        rx="0.25"
        transform="rotate(-90 47 34)"
        fill="#4FB573"
      />
      <rect
        x="47"
        y="39"
        width="2"
        height="28"
        rx="0.25"
        transform="rotate(-90 47 39)"
        fill="#4FB573"
      />
      <rect
        x="47"
        y="44"
        width="2"
        height="28"
        rx="0.25"
        transform="rotate(-90 47 44)"
        fill="#4FB573"
      />
      <rect
        x="47"
        y="49"
        width="2"
        height="15"
        rx="0.25"
        transform="rotate(-90 47 49)"
        fill="#4FB573"
      />
      <circle cx="8" cy="8" r="2" fill="#4FB573" />
      <circle cx="14" cy="8" r="2" fill="#4FB573" />
      <circle cx="20" cy="8" r="2" fill="#4FB573" />
      <mask id="path-11-inside-2" fill="white">
        <rect x="9" y="22" width="33" height="29" rx="2" />
      </mask>
      <rect
        x="9"
        y="22"
        width="33"
        height="29"
        rx="2"
        fill="white"
        stroke="#4FB573"
        strokeWidth="6"
        mask="url(#path-11-inside-2)"
      />
      <path
        d="M30 40V49H17V40V39.4909L23.5 33.3732L30 39.4909V40Z"
        stroke="#4FB573"
        strokeWidth="2"
      />
      <mask id="path-13-inside-3" fill="white">
        <path d="M30 33C30 31.3431 31.3431 30 33 30C34.6569 30 36 31.3431 36 33V49.75C36 49.8881 35.8881 50 35.75 50H30.25C30.1119 50 30 49.8881 30 49.75V33Z" />
      </mask>
      <path
        d="M30 33C30 31.3431 31.3431 30 33 30C34.6569 30 36 31.3431 36 33V49.75C36 49.8881 35.8881 50 35.75 50H30.25C30.1119 50 30 49.8881 30 49.75V33Z"
        stroke="#4FB573"
        strokeWidth="4"
        mask="url(#path-13-inside-3)"
      />
      <mask id="path-14-inside-4" fill="white">
        <rect x="20" y="43" width="7" height="6" rx="0.25" />
      </mask>
      <rect
        x="20"
        y="43"
        width="7"
        height="6"
        rx="0.25"
        stroke="#4FB573"
        strokeWidth="2"
        mask="url(#path-14-inside-4)"
      />
      <mask id="path-15-inside-5" fill="white">
        <rect x="21" y="39" width="5" height="2" rx="0.25" />
      </mask>
      <rect
        x="21"
        y="39"
        width="5"
        height="2"
        rx="0.25"
        stroke="#4FB573"
        strokeWidth="2"
        mask="url(#path-15-inside-5)"
      />
      <line
        x1="20.3201"
        y1="43.6159"
        x2="26.3201"
        y2="48.6159"
        stroke="#4FB573"
      />
      <path d="M31 37H35" stroke="#4FB573" />
      <path d="M31 42H35" stroke="#4FB573" />
      <line
        y1="-0.5"
        x2="7.81025"
        y2="-0.5"
        transform="matrix(-0.768221 0.640184 0.640184 0.768221 27 44)"
        stroke="#4FB573"
      />
    </SvgIcon>
  ) : (
    <SvgIcon
      className={clsx(className, classes.root)}
      width="100"
      height="75"
      viewBox="0 0 100 75"
      fill="none"
    >
      <mask id="path-1-inside-1" fill="white">
        <rect y="0.684082" width="100" height="74.0741" rx="2" />
      </mask>
      <rect
        y="0.684082"
        width="100"
        height="74.0741"
        rx="2"
        fill="white"
        stroke="#8F8F8F"
        strokeWidth="6"
        mask="url(#path-1-inside-1)"
      />
      <path d="M2.38086 17.4104H97.6189" stroke="#8F8F8F" strokeWidth="2" />
      <rect
        x="55.9524"
        y="34.137"
        width="3.58423"
        height="27.3809"
        rx="0.25"
        transform="rotate(-90 55.9524 34.137)"
        fill="#8F8F8F"
      />
      <rect
        x="55.9524"
        y="41.3054"
        width="2.38949"
        height="33.3333"
        rx="0.25"
        transform="rotate(-90 55.9524 41.3054)"
        fill="#8F8F8F"
      />
      <rect
        x="55.9524"
        y="47.2791"
        width="2.38948"
        height="33.3333"
        rx="0.25"
        transform="rotate(-90 55.9524 47.2791)"
        fill="#8F8F8F"
      />
      <rect
        x="55.9524"
        y="53.2527"
        width="2.38948"
        height="33.3333"
        rx="0.25"
        transform="rotate(-90 55.9524 53.2527)"
        fill="#8F8F8F"
      />
      <rect
        x="55.9524"
        y="59.2266"
        width="2.38949"
        height="17.8571"
        rx="0.25"
        transform="rotate(-90 55.9524 59.2266)"
        fill="#8F8F8F"
      />
      <ellipse
        cx="9.52378"
        cy="10.242"
        rx="2.38095"
        ry="2.38949"
        fill="#8F8F8F"
      />
      <ellipse
        cx="16.6666"
        cy="10.242"
        rx="2.38095"
        ry="2.38949"
        fill="#8F8F8F"
      />
      <ellipse
        cx="23.8094"
        cy="10.242"
        rx="2.38095"
        ry="2.38949"
        fill="#8F8F8F"
      />
      <mask id="path-11-inside-2" fill="white">
        <rect x="10.7144" y="26.9685" width="39.2857" height="34.6476" rx="2" />
      </mask>
      <rect
        x="10.7144"
        y="26.9685"
        width="39.2857"
        height="34.6476"
        rx="2"
        fill="white"
        stroke="#8F8F8F"
        strokeWidth="6"
        mask="url(#path-11-inside-2)"
      />
      <path
        d="M27.9762 40.2913L35.9048 47.7803V48.4737V59.4211H20.0477V48.4737V47.7803L27.9762 40.2913Z"
        stroke="#8F8F8F"
        strokeWidth="2"
      />
      <mask id="path-13-inside-3" fill="white">
        <path d="M35.7144 40.0978C35.7144 38.1254 37.3133 36.5264 39.2858 36.5264C41.2582 36.5264 42.8572 38.1253 42.8572 40.0978V60.1712C42.8572 60.3093 42.7453 60.4212 42.6072 60.4212H35.9644C35.8263 60.4212 35.7144 60.3093 35.7144 60.1712V40.0978Z" />
      </mask>
      <path
        d="M35.7144 40.0978C35.7144 38.1254 37.3133 36.5264 39.2858 36.5264C41.2582 36.5264 42.8572 38.1253 42.8572 40.0978V60.1712C42.8572 60.3093 42.7453 60.4212 42.6072 60.4212H35.9644C35.8263 60.4212 35.7144 60.3093 35.7144 60.1712V40.0978Z"
        stroke="#8F8F8F"
        strokeWidth="4"
        mask="url(#path-13-inside-3)"
      />
      <mask id="path-14-inside-4" fill="white">
        <rect
          x="23.8096"
          y="52.0581"
          width="8.33333"
          height="7.16846"
          rx="0.25"
        />
      </mask>
      <rect
        x="23.8096"
        y="52.0581"
        width="8.33333"
        height="7.16846"
        rx="0.25"
        stroke="#8F8F8F"
        strokeWidth="2"
        mask="url(#path-14-inside-4)"
      />
      <mask id="path-15-inside-5" fill="white">
        <rect x="25" y="47.2791" width="5.95238" height="2.38949" rx="0.25" />
      </mask>
      <rect
        x="25"
        y="47.2791"
        width="5.95238"
        height="2.38949"
        rx="0.25"
        stroke="#8F8F8F"
        strokeWidth="2"
        mask="url(#path-15-inside-5)"
      />
      <line
        y1="-0.5"
        x2="9.31159"
        y2="-0.5"
        transform="matrix(0.767093 0.641536 -0.638832 0.769346 23.8096 53.2527)"
        stroke="#8F8F8F"
      />
      <path d="M36.9048 44.8896H41.6667" stroke="#8F8F8F" />
      <path d="M36.9048 50.8633H41.6667" stroke="#8F8F8F" />
      <line
        y1="-0.5"
        x2="9.31159"
        y2="-0.5"
        transform="matrix(-0.767093 0.641536 0.638832 0.769346 32.1428 53.2527)"
        stroke="#8F8F8F"
      />
    </SvgIcon>
  );
}

export default RegistrationIcon;
