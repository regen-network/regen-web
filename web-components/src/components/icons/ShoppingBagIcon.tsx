import React from 'react';

type Props = {
  linearGradient?: boolean;
  disabled?: boolean;
} & React.SVGProps<SVGSVGElement>;

export const ShoppingBagIcon = (props: Props) => {
  const randomId = Math.random().toString(36).substring(7);
  const gradientId = `shopping_bag_gradient-${randomId}`;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Icon / Purchases / Small">
        <path
          id="Union"
          fill-rule="evenodd"
          clipRule="evenodd"
          d="M8.48246 3.5C8.48246 2.11929 9.60175 1 10.9825 1H12.9825C14.3632 1 15.4825 2.11929 15.4825 3.5V5.5H8.48246V3.5ZM7.98246 9.5C7.43018 9.5 6.98246 9.94771 6.98246 10.5C6.98246 11.0523 7.43018 11.5 7.98246 11.5C8.53475 11.5 8.98246 11.0523 8.98246 10.5C8.98246 9.94771 8.53475 9.5 7.98246 9.5ZM7.48246 7.5V8.56301C6.61985 8.78503 5.98246 9.56808 5.98246 10.5C5.98246 11.6046 6.87789 12.5 7.98246 12.5C9.08703 12.5 9.98246 11.6046 9.98246 10.5C9.98246 9.56808 9.34507 8.78503 8.48246 8.56301V7.5H15.4825V8.56301C14.6198 8.78503 13.9825 9.56808 13.9825 10.5C13.9825 11.6046 14.8779 12.5 15.9825 12.5C17.087 12.5 17.9825 11.6046 17.9825 10.5C17.9825 9.56808 17.3451 8.78503 16.4825 8.56301V7.5H18.8914L19.8421 21.5H4.12287L5.07349 7.5H7.48246ZM14.9825 10.5C14.9825 9.94771 15.4302 9.5 15.9825 9.5C16.5347 9.5 16.9825 9.94771 16.9825 10.5C16.9825 11.0523 16.5347 11.5 15.9825 11.5C15.4302 11.5 14.9825 11.0523 14.9825 10.5ZM7.48246 5.5V3.5C7.48246 1.567 9.04946 0 10.9825 0H12.9825C14.9155 0 16.4825 1.567 16.4825 3.5V5.5H20.5266C20.6581 5.5 20.7672 5.60187 20.7761 5.73306L21.9643 23.2331C21.9741 23.3775 21.8596 23.5 21.7149 23.5H2.25001C2.10527 23.5 1.99078 23.3775 2.00059 23.2331L3.18886 5.73306C3.19777 5.60187 3.30679 5.5 3.43828 5.5H7.48246Z"
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
          x1="11.9825"
          y1="2.80142e-07"
          x2="1.47665"
          y2="22.3136"
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
