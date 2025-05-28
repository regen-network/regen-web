import React from 'react';

type Props = {
  linearGradient?: boolean;
  disabled?: boolean;
} & React.SVGProps<SVGSVGElement>;

export const ShoppingCartIcon = ({
  linearGradient,
  disabled,
  ...props
}: Props) => {
  // unique gradient‑ID so multiple icons on the page don’t clash
  const gradientId = React.useMemo(
    () => `shopping_cart_gradient-${Math.random().toString(36).slice(2)}`,
    [],
  );

  return (
    <svg
      width="24"
      height="24"
      viewBox="4 5 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {linearGradient && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="14.8771"
            y1="3"
            x2="4.594"
            y2="26.3021"
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
        d="M10 23C11.1046 23 12 23.8954 12 25C12 26.1046 11.1046 27 10 27C8.89543 27 8 26.1046 8 25C8 23.8954 8.89543 23 10 23ZM21 23C22.1046 23 23 23.8954 23 25C23 26.1046 22.1046 27 21 27C19.8954 27 19 26.1046 19 25C19 23.8954 19.8954 23 21 23ZM10 24C9.44772 24 9 24.4477 9 25C9 25.5523 9.44772 26 10 26C10.5523 26 11 25.5523 11 25C11 24.4477 10.5523 24 10 24ZM21 24C20.4477 24 20 24.4477 20 25C20 25.5523 20.4477 26 21 26C21.5523 26 22 25.5523 22 25C22 24.4477 21.5523 24 21 24ZM7.2041 3C8.13526 3 8.94375 3.64257 9.15332 4.5498L9.71875 7H23.7529C25.0323 7 25.9834 8.18468 25.7061 9.43359L24.1504 16.4336C23.9471 17.3485 23.1355 17.9998 22.1982 18H11.8018C11.7215 18 11.6425 17.9927 11.5645 17.9834L10.3047 20H22.75C22.8881 20 23 20.1119 23 20.25V21.75C23 21.8881 22.8881 22 22.75 22H10.3047C8.73391 22 7.7761 20.2725 8.6084 18.9404L9.93262 16.8213L7.2041 5H4.25C4.11193 5 4 4.88807 4 4.75V3.25C4 3.11193 4.11193 3 4.25 3H7.2041ZM11.8018 16H22.1982L23.7529 9H10.2471L11.8018 16Z"
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
