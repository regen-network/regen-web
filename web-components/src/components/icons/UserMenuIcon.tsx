type Props = {
  linearGradient?: boolean;
  disabled?: boolean;
} & React.SVGProps<SVGSVGElement>;

export const UserMenuIcon = (props: Props) => {
  const randomId = Math.random().toString(36).substring(7);
  const gradientId1 = props.disabled
    ? `user_menu_icon_gradient-${randomId}`
    : 'user_menu_icon_gradient';
  const gradientId2 = props.disabled
    ? `user_menu_icon_gradient-${randomId}`
    : 'user_menu_icon_gradient';
  const gradientId3 = props.disabled
    ? `user_menu_icon_gradient-${randomId}`
    : 'user_menu_icon_gradient';
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Icon / User">
        <circle
          id="Ellipse 1"
          cx="12"
          cy="12"
          r="11"
          stroke={
            props.linearGradient
              ? `url(#${gradientId1})`
              : props.disabled
              ? '#8F8F8F'
              : 'currentColor'
          }
          stroke-width="2"
        />
        <circle
          id="Ellipse 2"
          cx="12"
          cy="9"
          r="4.5"
          stroke={
            props.linearGradient
              ? `url(#${gradientId2})`
              : props.disabled
              ? '#8F8F8F'
              : 'currentColor'
          }
        />
        <path
          id="Intersect"
          fill-rule="evenodd"
          clipRule="evenodd"
          d="M3.75983 20.725C4.60501 16.5563 7.97337 13.4414 12 13.4414C16.0266 13.4414 19.395 16.5564 20.2401 20.725C19.9581 20.9915 19.6632 21.2444 19.3564 21.4828C18.7968 17.4261 15.6426 14.4414 12 14.4414C8.35735 14.4414 5.20321 17.4261 4.64358 21.4828C4.33677 21.2444 4.04184 20.9914 3.75983 20.725Z"
          fill={
            props.linearGradient
              ? `url(#${gradientId3})`
              : props.disabled
              ? '#8F8F8F'
              : 'currentColor'
          }
        />
      </g>
      <defs>
        <linearGradient
          id={gradientId1}
          x1="12"
          y1="2.86102e-07"
          x2="2.4"
          y2="24"
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
          x1="12"
          y1="4"
          x2="8"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0.00458717"
            stopColor={props.disabled ? '#8F8F8F' : '#7BC796'}
          />
          <stop offset="1" stopColor={props.disabled ? '#EFEFEF' : '#C5E6D1'} />
        </linearGradient>
        <linearGradient
          id={gradientId3}
          x1="12"
          y1="13.4414"
          x2="10.2462"
          y2="22.4271"
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
