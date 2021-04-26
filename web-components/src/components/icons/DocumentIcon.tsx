import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
// import { makeStyles, Theme } from '@material-ui/core';

type Props = {
  fileType?: string;
  className?: string;
};

const DocumentIcon: React.FC<Props & Partial<typeof SvgIcon>> = ({ className, fileType, ...props }) => {
  // const classes = useStyles({});
  const getFill = (): string => {
    switch (fileType) {
      case 'xls':
        return '#3D7ACF';
      case 'pdf':
        return '#DE4526';
      default:
        return '#7BC796';
    }
  };

  const fill = getFill();

  return (
    <SvgIcon viewBox="0 0 18 22" className={className} {...props}>
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 21V1H9H12.0601L17 6.38898V21H1Z" fill="white" stroke="black" strokeWidth="2" />
        <rect x="4" y="11" width="1" height="10" rx="0.25" transform="rotate(-90 4 11)" fill="black" />
        <rect x="4" y="14" width="1" height="10" rx="0.25" transform="rotate(-90 4 14)" fill="black" />
        <rect x="4" y="17" width="1" height="8" rx="0.25" transform="rotate(-90 4 17)" fill="black" />
        <path d="M11.5 1V6.25C11.5 6.38807 11.6119 6.5 11.75 6.5H17.5" stroke="black" />
        <path d="M1 21V1H9H12.0601L17 6.38898V21H1Z" fill="white" stroke="#B9E1C7" strokeWidth="2" />
        <rect x="4" y="11" width="1" height="10" rx="0.25" transform="rotate(-90 4 11)" fill={fill} />
        <rect x="4" y="14" width="1" height="10" rx="0.25" transform="rotate(-90 4 14)" fill={fill} />
        <rect x="4" y="17" width="1" height="8" rx="0.25" transform="rotate(-90 4 17)" fill={fill} />
        <path d="M11.6432 6.49983L11.6432 1.07539L16.9998 6.5L11.6432 6.49983Z" fill="#DCF0E3" />
        <path d="M11.5 1V6.25C11.5 6.38807 11.6119 6.5 11.75 6.5H17.5" stroke="#B9E1C7" />
        <path d="M1 21V1H9H12.0601L17 6.38898V21H1Z" stroke={fill} strokeWidth="2" />
      </svg>
    </SvgIcon>
  );
};

export default DocumentIcon;
