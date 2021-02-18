import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, useTheme, Theme } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // width: theme.spacing(6.5),
    // height: theme.spacing(6.5),
  },
}));

const EyeIcon: React.FC<{ color?: string; visible?: boolean; className?: string }> = ({
  visible = true,
  className,
  color,
  ...props
}) => {
  const classes = useStyles({});
  const theme = useTheme();
  color = color || theme.palette.secondary.main;

  return (
    <>
      {visible ? (
        <SvgIcon viewBox="0 0 19 14" className={clsx(className, classes.root)} {...props}>
          <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 6.91021C1.29537 2.90035 5.05898 0 9.5 0C13.941 0 17.7046 2.90035 19 6.91021C17.7046 10.9201 13.941 13.8204 9.5 13.8204C5.05898 13.8204 1.29537 10.9201 0 6.91021Z"
              fill={color}
            />
            <circle cx="9.81977" cy="6.91022" r="3.29587" fill={color} stroke="white" strokeWidth="1.5" />
          </svg>
        </SvgIcon>
      ) : (
        <SvgIcon viewBox="0 0 19 16" className={clsx(className, classes.root)} {...props}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 7.91021C1.29537 3.90035 5.05898 1 9.5 1C13.941 1 17.7046 3.90035 19 7.91021C17.7046 11.9201 13.941 14.8204 9.5 14.8204C5.05898 14.8204 1.29537 11.9201 0 7.91021Z"
            fill={color}
          />
          <circle cx="9.81979" cy="7.91025" r="3.29587" fill={color} stroke="white" strokeWidth="1.5" />
          <line
            x1="3"
            y1="14.9393"
            x2="16.9393"
            y2="1"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </SvgIcon>
      )}
    </>
  );
};

export default EyeIcon;
