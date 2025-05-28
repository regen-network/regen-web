import React from 'react';

import { useGradientId } from './hooks/useGradientId';

type Props = {
  /** use the green gradient when true */
  linearGradient?: boolean;
  /** grey‑out the icon when true */
  disabled?: boolean;
} & React.SVGProps<SVGSVGElement>;

export const ProjectsIcon = ({ linearGradient, disabled, ...props }: Props) => {
  const gradientId = useGradientId('projects_icon');

  return (
    <svg
      width="24"
      height="24"
      viewBox="4 5 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {linearGradient && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="14.689"
            y1="5"
            x2="6.86562"
            y2="25.1648"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0.00458717"
              stopColor={disabled ? '#8F8F8F' : '#7BC796'}
            />
            <stop offset="1" stopColor={disabled ? '#EFEFEF' : '#C5E6D1'} />
          </linearGradient>
        </defs>
      )}

      <path
        d="M21.999 5C23.6558 5 24.999 6.34315 24.999 8V24.75L24.9941 24.8008C24.974 24.8981 24.8971 24.975 24.7997 24.9951L24.749 25H4.99896V15H4.62982L4.54974 14.9883C4.37963 14.933 4.31409 14.7041 4.45794 14.5684L12.499 7L18.999 13.1172V8C18.999 6.34315 20.3421 5 21.999 5ZM6.99896 14.9229V23H8.99896V18.25C8.99896 18.1293 9.08443 18.0283 9.19818 18.0049L9.24896 18H15.749L15.7997 18.0049C15.9135 18.0283 15.999 18.1293 15.999 18.25V23H17.999V14.9229L12.499 9.74609L6.99896 14.9229ZM11.1992 23H13.7988L12.499 21.916L11.1992 23ZM20.999 23H22.999V17.5H20.999V23ZM13.2792 21.2656L14.999 22.6982V19.833L13.2792 21.2656ZM9.99896 22.6982L11.7177 21.2656L9.99896 19.833V22.6982ZM12.498 20.6143L14.4365 19H10.5615L12.498 20.6143ZM20.999 16.5H22.999V12.5H20.999V16.5ZM14.7997 14.0049C14.9135 14.0283 14.999 14.1293 14.999 14.25V15.75C14.999 15.8707 14.9135 15.9717 14.7997 15.9951L14.749 16H10.249L10.1982 15.9951C10.0844 15.9717 9.99896 15.8707 9.99896 15.75V14.25C9.99896 14.1293 10.0844 14.0283 10.1982 14.0049L10.249 14H14.749L14.7997 14.0049ZM21.999 7C21.4467 7 20.999 7.44772 20.999 8V11.5H22.999V8C22.999 7.44772 22.5512 7 21.999 7Z"
        fill={
          linearGradient
            ? `url(#${gradientId})`
            : disabled
            ? '#8F8F8F'
            : 'currentColor'
        }
      />
    </svg>
  );
};
