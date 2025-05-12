import React from 'react';

type Props = {
  /** use the green gradient when true */
  linearGradient?: boolean;
  /** grey-out the icon when true */
  disabled?: boolean;
} & React.SVGProps<SVGSVGElement>;

export const OrgProfile: React.FC<Props> = ({
  linearGradient,
  disabled,
  ...props
}) => {
  // unique gradient-id so it never collides
  const gradientId = React.useMemo(
    () => `dashboard_layout_gradient_${Math.random().toString(36).slice(2)}`,
    []
  );

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {linearGradient && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="14.5"
            y1="4"
            x2="5.98267"
            y2="26.2612"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.00458717" stopColor={disabled ? '#8F8F8F' : '#7BC796'} />
            <stop offset="1" stopColor={disabled ? '#EFEFEF' : '#C5E6D1'} />
          </linearGradient>
        </defs>
      )}

      {/**
         * Each of these <path> blocks originally used a different
         * gradient id; here we reuse the single gradientId for all.
         */}
      <path
        d="M7 8.25C7 8.11193 7.11193 8 7.25 8H8.75C8.88807 8 9 8.11193 9 8.25V9.75C9 9.88807 8.88807 10 8.75 10H7.25C7.11193 10 7 9.88807 7 9.75V8.25Z"
        fill={
          linearGradient
            ? `url(#${gradientId})`
            : disabled
            ? '#8F8F8F'
            : 'currentColor'
        }
      />
      <path
        d="M11.25 8C11.1119 8 11 8.11193 11 8.25V9.75C11 9.88807 11.1119 10 11.25 10H12.75C12.8881 10 13 9.88807 13 9.75V8.25C13 8.11193 12.8881 8 12.75 8H11.25Z"
        fill={
          linearGradient
            ? `url(#${gradientId})`
            : disabled
            ? '#8F8F8F'
            : 'currentColor'
        }
      />
      <path
        d="M7 12.25C7 12.1119 7.11193 12 7.25 12H8.75C8.88807 12 9 12.1119 9 12.25V13.75C9 13.8881 8.88807 14 8.75 14H7.25C7.11193 14 7 13.8881 7 13.75V12.25Z"
        fill={
          linearGradient
            ? `url(#${gradientId})`
            : disabled
            ? '#8F8F8F'
            : 'currentColor'
        }
      />
      <path
        d="M11.25 12C11.1119 12 11 12.1119 11 12.25V13.75C11 13.8881 11.1119 14 11.25 14H12.75C12.8881 14 13 13.8881 13 13.75V12.25C13 12.1119 12.8881 12 12.75 12H11.25Z"
        fill={
          linearGradient
            ? `url(#${gradientId})`
            : disabled
            ? '#8F8F8F'
            : 'currentColor'
        }
      />
      <path
        d="M7 16.25C7 16.1119 7.11193 16 7.25 16H8.75C8.88807 16 9 16.1119 9 16.25V17.75C9 17.8881 8.88807 18 8.75 18H7.25C7.11193 18 7 17.8881 7 17.75V16.25Z"
        fill={
          linearGradient
            ? `url(#${gradientId})`
            : disabled
            ? '#8F8F8F'
            : 'currentColor'
        }
      />
      <path
        d="M11.25 16C11.1119 16 11 16.1119 11 16.25V17.75C11 17.8881 11.1119 18 11.25 18H12.75C12.8881 18 13 17.8881 13 17.75V16.25C13 16.1119 12.8881 16 12.75 16H11.25Z"
        fill={
          linearGradient
            ? `url(#${gradientId})`
            : disabled
            ? '#8F8F8F'
            : 'currentColor'
        }
      />
      <path
        d="M7 20.25C7 20.1119 7.11193 20 7.25 20H8.75C8.88807 20 9 20.1119 9 20.25V21.75C9 21.8881 8.88807 22 8.75 22H7.25C7.11193 22 7 21.8881 7 21.75V20.25Z"
        fill={
          linearGradient
            ? `url(#${gradientId})`
            : disabled
            ? '#8F8F8F'
            : 'currentColor'
        }
      />
      <path
        d="M11.25 20C11.1119 20 11 20.1119 11 20.25V21.75C11 21.8881 11.1119 22 11.25 22H12.75C12.8881 22 13 21.8881 13 21.75V20.25C13 20.1119 12.8881 20 12.75 20H11.25Z"
        fill={
          linearGradient
            ? `url(#${gradientId})`
            : disabled
            ? '#8F8F8F'
            : 'currentColor'
        }
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.25 15C19.1119 15 19 15.1119 19 15.25V17.75C19 17.8881 19.1119 18 19.25 18H21.75C21.8881 18 22 17.8881 22 17.75V15.25C22 15.1119 21.8881 15 21.75 15H19.25ZM20 16V17H21V16H20Z"
        fill={
          linearGradient
            ? `url(#${gradientId})`
            : disabled
            ? '#8F8F8F'
            : 'currentColor'
        }
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 19.25C19 19.1119 19.1119 19 19.25 19H21.75C21.8881 19 22 19.1119 22 19.25V21.75C22 21.8881 21.8881 22 21.75 22H19.25C19.1119 22 19 21.8881 19 21.75V19.25ZM20 21V20H21V21H20Z"
        fill={
          linearGradient
            ? `url(#${gradientId})`
            : disabled
            ? '#8F8F8F'
            : 'currentColor'
        }
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 26C3.11193 26 3 25.8881 3 25.75V4.25C3 4.11193 3.11193 4 3.25 4H16.75C16.8881 4 17 4.11193 17 4.25V11H25.75C25.8881 11 26 11.1119 26 11.25V25.75C26 25.8881 25.8881 26 25.75 26H3.25ZM5 24V6H15V24H5ZM17 24H24V13H17V24Z"
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

export default OrgProfile;
