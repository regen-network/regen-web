import React from 'react';

type Props = {
  /** use the green gradient when true */
  linearGradient?: boolean;
  /** grey-out the icon when true */
  disabled?: boolean;
} & React.SVGProps<SVGSVGElement>;

const MembersIcon: React.FC<Props> = ({
  linearGradient,
  disabled,
  ...props
}) => {
  // unique gradient-id so it never conflicts if you render multiple
  const gradientId = React.useMemo(
    () => `members_gradient_${Math.random().toString(36).slice(2)}`,
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
            x1="15"
            y1="6"
            x2="9.25321"
            y2="25.156"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.00458717" stopColor={disabled ? '#8F8F8F' : '#7BC796'} />
            <stop offset="1" stopColor={disabled ? '#EFEFEF' : '#C5E6D1'} />
          </linearGradient>
        </defs>
      )}

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7226 8H24C25.6569 8 27 9.34315 27 11V21C27 22.6569 25.6569 24 24 24H6C4.34315 24 3 22.6569 3 21V11C3 9.34315 4.34315 8 6 8H8.61048C9.12503 6.82273 10.3001 6 11.667 6C13.0337 6.00013 14.2083 6.82283 14.7226 8ZM14.9333 10C14.6244 11.521 13.2799 12.6663 11.668 12.667V11.667L11.9062 11.6543C13.0823 11.5343 14 10.5408 14 9.33301C13.9998 8.0446 12.9554 7.00018 11.667 7C10.3784 7 9.33318 8.04449 9.33301 9.33301C9.33301 10.6213 10.3778 11.6665 11.666 11.667V13.667C9.64158 13.6676 8.00018 15.3085 8 17.333V19H15.333V17.333C15.3328 15.3085 13.6923 13.6677 11.668 13.667V12.667C14.2446 12.6677 16.3328 14.7563 16.333 17.333V19.5C16.333 19.7761 16.1091 20 15.833 20H7.5C7.22386 20 7 19.7761 7 19.5V17.333C7.00018 14.7564 9.08857 12.6679 11.665 12.667C10.0532 12.6662 8.70868 11.521 8.39976 10H6C5.44772 10 5 10.4477 5 11V21C5 21.5523 5.44772 22 6 22H24C24.5523 22 25 21.5523 25 21V11C25 10.4477 24.5523 10 24 10H14.9333ZM18 13.75C18 13.8881 18.1119 14 18.25 14H19.75C19.8881 14 20 13.8881 20 13.75V13.25C20 13.1119 19.8881 13 19.75 13H18.25C18.1119 13 18 13.1119 18 13.25V13.75ZM18.25 17C18.1119 17 18 16.8881 18 16.75V16.25C18 16.1119 18.1119 16 18.25 16H22.75C22.8881 16 23 16.1119 23 16.25V16.75C23 16.8881 22.8881 17 22.75 17H18.25ZM18.25 20C18.1119 20 18 19.8881 18 19.75V19.25C18 19.1119 18.1119 19 18.25 19H22.75C22.8881 19 23 19.1119 23 19.25V19.75C23 19.8881 22.8881 20 22.75 20H18.25Z"
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

export default MembersIcon;
