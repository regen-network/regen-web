import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

const AuthorIcon: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className,
  ...props
}) => (
  <SvgIcon viewBox="0 0 25 24" className={className} {...props}>
    <path
      d="M7.99999 16.9069C7.99999 16.8405 8.02633 16.777 8.07322 16.7301L13.9017 10.9017L15.5957 12.5957L9.76711 18.4243C9.72032 18.4711 9.65689 18.4974 9.59072 18.4975L8.25038 18.4996C8.11216 18.4998 7.99999 18.3878 7.99999 18.2496L7.99999 16.9069Z"
      fill="currentColor"
    />
    <path
      d="M16.3028 11.8886L14.6088 10.1945L14.7903 10.0131C15.1808 9.62253 15.8139 9.62253 16.2045 10.0131L16.4843 10.2929C16.8748 10.6834 16.8748 11.3166 16.4843 11.7071L16.3028 11.8886Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.5 7V22.75C21.5 22.8881 21.3881 23 21.25 23H3.75C3.61193 23 3.5 22.8881 3.5 22.75V1.25C3.5 1.11193 3.61193 1 3.75 1H15.89C15.9601 1 16.027 1.02941 16.0743 1.08107L21.4343 6.92831C21.4538 6.94958 21.4693 6.97387 21.4803 7H21.5ZM19.5 21V8H15.25C14.8358 8 14.5 7.66421 14.5 7.25V3H5.5V21H19.5ZM18.7869 7L15.5 3.41433V7H18.7869Z"
      fill="currentColor"
    />
  </SvgIcon>
);

export default AuthorIcon;
