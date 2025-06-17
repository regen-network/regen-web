import React from 'react';

type Props = {
  linearGradient?: boolean;
  disabled?: boolean;
} & React.SVGProps<SVGSVGElement>;

export const PaymentInfoIcon = ({ disabled, ...props }: Props) => {
  const randomId = Math.random().toString(36).substring(7);
  const gradientId = props
    ? `payment_info_gradient-${randomId}`
    : 'payment_info_gradient';
  return (
    <svg
      id={randomId}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Icon / Credit Card">
        <path
          id="Union"
          fill-rule="evenodd"
          clipRule="evenodd"
          d="M19 6H5C4.44772 6 4 6.44772 4 7V8L20 8V7C20 6.44771 19.5523 6 19 6ZM2 8.25V8.75V16C2 17.6569 3.34315 19 5 19H19C20.6569 19 22 17.6569 22 16V8.75V8.25V7C22 5.34315 20.6569 4 19 4H5C3.34315 4 2 5.34315 2 7V8.25ZM19 17C19.5523 17 20 16.5523 20 16V9L4 9V16C4 16.5523 4.44772 17 5 17H19ZM5 10.75C5 10.8881 5.11193 11 5.25 11H8.75C8.88807 11 9 10.8881 9 10.75V10.25C9 10.1119 8.88807 10 8.75 10H5.25C5.11193 10 5 10.1119 5 10.25V10.75ZM10.25 11C10.1119 11 10 10.8881 10 10.75V10.25C10 10.1119 10.1119 10 10.25 10H13.75C13.8881 10 14 10.1119 14 10.25V10.75C14 10.8881 13.8881 11 13.75 11H10.25ZM14.5 14.25C14.5 13.8358 14.8358 13.5 15.25 13.5C15.495 13.5 15.7126 13.617 15.8503 13.8002C15.9447 13.9259 16.0928 13.9999 16.25 13.9999C16.4072 13.9999 16.5553 13.9259 16.6497 13.8002C16.7874 13.617 17.005 13.5 17.25 13.5C17.6642 13.5 18 13.8358 18 14.25C18 14.6642 17.6642 15 17.25 15C17.005 15 16.7874 14.883 16.6497 14.6998C16.5553 14.5741 16.4072 14.5001 16.25 14.5001C16.0928 14.5001 15.9447 14.5741 15.8503 14.6998C15.7126 14.883 15.495 15 15.25 15C14.8358 15 14.5 14.6642 14.5 14.25ZM15.25 12.5C14.2835 12.5 13.5 13.2835 13.5 14.25C13.5 15.2165 14.2835 16 15.25 16C15.6219 16 15.9667 15.8838 16.25 15.6862C16.5333 15.8838 16.8781 16 17.25 16C18.2165 16 19 15.2165 19 14.25C19 13.2835 18.2165 12.5 17.25 12.5C16.8781 12.5 16.5333 12.6162 16.25 12.8138C15.9667 12.6162 15.6219 12.5 15.25 12.5Z"
          fill={
            props.linearGradient
              ? `url(#${gradientId})`
              : disabled
              ? '#8F8F8F'
              : 'currentColor'
          }
        />
      </g>
      <defs>
        <linearGradient
          id={gradientId}
          x1="12"
          y1="4"
          x2="7.21101"
          y2="19.9633"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0.00458717"
            stopColor={disabled ? '#8F8F8F' : '#7BC796'}
          />
          <stop offset="1" stopColor={disabled ? '#EFEFEF' : '#C5E6D1'} />
        </linearGradient>
      </defs>
    </svg>
  );
};
