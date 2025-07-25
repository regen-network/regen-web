import React from 'react';

type Props = {
  linearGradient?: boolean;
  disabled?: boolean;
} & React.SVGProps<SVGSVGElement>;

export const CogIcon = ({ linearGradient, ...props }: Props) => {
  const randomId = Math.random().toString(36).substring(7);
  const gradientId1 = `linear1_cog_icon-${randomId}`;
  const gradientId2 = `linear2_cog_icon-${randomId}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M20.9664 10.0728L18.4842 9.6671C18.3388 9.16898 18.1402 8.69018 17.8915 8.237L19.3405 6.17186C19.4577 6.00512 19.4376 5.7779 19.2935 5.63342L17.6601 4.00088C17.5144 3.85556 17.2851 3.83666 17.1179 3.9572L15.0838 5.41922C14.6265 5.16638 14.1435 4.96562 13.6424 4.81988L13.2094 2.34776C13.1741 2.147 12.9998 2 12.7957 2H10.4857C10.2799 2 10.1043 2.1491 10.0711 2.35238L9.66962 4.81106C9.16562 4.95596 8.68178 5.15462 8.22608 5.4041L6.19748 3.9551C6.0299 3.8354 5.80184 3.85472 5.6561 3.99962L4.02356 5.63216C3.8795 5.77622 3.85934 6.00302 3.97652 6.16976L5.4041 8.21222C5.15 8.67212 4.94756 9.1589 4.80014 9.66542L2.35112 10.0732C2.14868 10.1068 2 10.2824 2 10.4874V12.7974C2 13.0011 2.14616 13.1754 2.3465 13.2111L4.79552 13.6453C4.9421 14.1506 5.14454 14.6374 5.39948 15.0985L3.95426 17.12C3.83498 17.2867 3.85388 17.5156 3.99878 17.6614L5.63174 19.2956C5.7758 19.4397 6.00302 19.4598 6.16976 19.3426L8.21516 17.91C8.67422 18.1624 9.15932 18.3628 9.66206 18.5081L10.072 20.9697C10.1052 21.1717 10.2803 21.32 10.4857 21.32H12.7957C12.9994 21.32 13.1737 21.1738 13.209 20.9735L13.6479 18.4997C14.1514 18.3514 14.634 18.1498 15.0885 17.897L17.1486 19.3422C17.3157 19.4602 17.5425 19.4397 17.687 19.2956L19.32 17.6614C19.4653 17.5156 19.4842 17.2859 19.3636 17.1187L17.8945 15.0788C18.1435 14.6252 18.3414 14.1456 18.4854 13.6474L20.971 13.2111C21.1722 13.1758 21.3183 13.0011 21.3183 12.7974V10.4874C21.3187 10.2816 21.1696 10.106 20.9664 10.0728Z"
        stroke={
          linearGradient
            ? `url(#${gradientId1})`
            : props.disabled
            ? '#8F8F8F'
            : 'currentColor'
        }
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8.71875 11.66C8.71875 13.2837 10.035 14.6 11.6587 14.6C13.2825 14.6 14.5987 13.2837 14.5987 11.66C14.5987 10.0363 13.2825 8.71997 11.6587 8.71997C10.035 8.71997 8.71875 10.0363 8.71875 11.66Z"
        stroke={
          linearGradient
            ? `url(#${gradientId2})`
            : props.disabled
            ? '#8F8F8F'
            : 'currentColor'
        }
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={gradientId1}
          x1="11.6592"
          y1="2"
          x2="3.93067"
          y2="21.3195"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0.00458717"
            stopColor={props.disabled ? '#8F8F8F' : '#7BC796'}
          />
          <stop offset="1" stopColor={props.disabled ? '#EFEFEF' : '#C5E6D1'} />
        </linearGradient>
        <linearGradient
          id={gradientId2}
          x1="11.6587"
          y1="8.71997"
          x2="9.30675"
          y2="14.6"
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
