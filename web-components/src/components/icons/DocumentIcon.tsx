import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { useTheme, DefaultTheme as Theme } from '@mui/styles';

type Props = {
  fileType?: string;
  className?: string;
};

type Fill = {
  main: string;
  accent: string;
  shade: string;
};

const DocumentIcon: React.FC<Props & Partial<typeof SvgIcon>> = ({
  className,
  fileType,
  ...props
}) => {
  const theme: Theme = useTheme();
  const getFill = (): Fill => {
    switch (fileType) {
      case 'xls': // TODO: (?) several of these colors are used a few spots in the app now. Move to theme?
        return {
          main: '#3D7ACF',
          accent: '#6D9BDB',
          shade: '#D8E4F5',
        };
      case 'pdf':
        return {
          main: theme.palette.error.main,
          accent: '#F2B5A8',
          shade: '#F8DAD4',
        };
      default:
        return {
          main: theme.palette.secondary.main,
          accent: theme.palette.secondary.contrastText,
          shade: theme.palette.secondary.light,
        };
    }
  };

  const { main, accent, shade } = getFill();

  return (
    <SvgIcon viewBox="0 0 18 22" className={className} {...props}>
      <svg
        width="18"
        height="22"
        viewBox="0 0 18 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 21V1H9H12.0601L17 6.38898V21H1Z"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
        <rect
          x="4"
          y="11"
          width="1"
          height="10"
          rx="0.25"
          transform="rotate(-90 4 11)"
          fill="black"
        />
        <rect
          x="4"
          y="14"
          width="1"
          height="10"
          rx="0.25"
          transform="rotate(-90 4 14)"
          fill="black"
        />
        <rect
          x="4"
          y="17"
          width="1"
          height="8"
          rx="0.25"
          transform="rotate(-90 4 17)"
          fill="black"
        />
        <path
          d="M11.5 1V6.25C11.5 6.38807 11.6119 6.5 11.75 6.5H17.5"
          stroke="black"
        />
        <path
          d="M1 21V1H9H12.0601L17 6.38898V21H1Z"
          fill="white"
          stroke="#B9E1C7"
          strokeWidth="2"
        />
        <rect
          x="4"
          y="11"
          width="1"
          height="10"
          rx="0.25"
          transform="rotate(-90 4 11)"
          fill={main}
        />
        <rect
          x="4"
          y="14"
          width="1"
          height="10"
          rx="0.25"
          transform="rotate(-90 4 14)"
          fill={main}
        />
        <rect
          x="4"
          y="17"
          width="1"
          height="8"
          rx="0.25"
          transform="rotate(-90 4 17)"
          fill={main}
        />
        <path
          d="M11.6432 6.49983L11.6432 1.07539L16.9998 6.5L11.6432 6.49983Z"
          fill={shade}
        />
        <path
          d="M11.5 1V6.25C11.5 6.38807 11.6119 6.5 11.75 6.5H17.5"
          stroke={accent}
        />
        <path
          d="M1 21V1H9H12.0601L17 6.38898V21H1Z"
          stroke={main}
          strokeWidth="2"
        />
      </svg>
    </SvgIcon>
  );
};

export default DocumentIcon;
