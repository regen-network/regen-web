import React from 'react';

type Props = {
  linearGradient?: boolean;
  disabled?: boolean;
} & React.SVGProps<SVGSVGElement>;

export const EnvelopeIcon = (props: Props) => {
  const randomId = Math.random().toString(36).substring(7);
  const gradientId = props.disabled
    ? `shopping_bag_gradient-${randomId}`
    : 'shopping_bag_gradient';
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Icon / Email">
        <path
          id="Union"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19 7H5L4.97568 7.00029L12.2584 12.233L19.4158 7.09028C19.2892 7.03231 19.1484 7 19 7ZM19.9956 7.90508L12.4174 13.3501C12.3647 13.3879 12.3024 13.4023 12.2428 13.3954C12.1922 13.3954 12.1412 13.3802 12.097 13.3484L4.08643 7.59271C4.03088 7.71712 4 7.85495 4 8V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V8C20 7.96799 19.9985 7.93632 19.9956 7.90508ZM5 5C3.34315 5 2 6.34315 2 8V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V8C22 6.34315 20.6569 5 19 5H5Z"
          fill={
            props.linearGradient
              ? `url(#${gradientId})`
              : props.disabled
              ? '#8F8F8F'
              : 'currentColor'
          }
        />
      </g>
      <defs>
        <linearGradient
          id={gradientId}
          x1="12"
          y1="5"
          x2="7.21101"
          y2="20.9633"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0.00458717"
            stopColor={props.disabled ? '#8F8F8F' : '#7BC796'}
          />
          <stop offset="1" stopColor={props.disabled ? '#EFEFEF' : '#C5E6D1'} />
        </linearGradient>
      </defs>
    </svg>
  );
};
