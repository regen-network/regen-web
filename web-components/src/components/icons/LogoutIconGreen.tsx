import { useGradientId } from './hooks/useGradientId';

export interface LogoutIconProps extends React.SVGProps<SVGSVGElement> {
  /** if true, use the green gradient; otherwise currentColor */
  linearGradient?: boolean;
}

export const LogoutIconGreen: React.FC<LogoutIconProps> = ({
  linearGradient = true,
  ...props
}) => {
  // unique ID so gradients don’t collide
  const gradientId = useGradientId('logout_icon_green');

  return (
    <svg
      width="24"
      height="24"
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
            <stop offset="0.00458717" stopColor="#7BC796" />
            <stop offset="1" stopColor="#C5E6D1" />
          </linearGradient>
        </defs>
      )}

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.75 6C16.8881 6 17 6.11193 17 6.25V7.75C17 7.88807 16.8881 8 16.75 8H8V22H16.75C16.8881 22 17 22.1119 17 22.25V23.75C17 23.8881 16.8881 24 16.75 24H7C6.44772 24 6 23.5523 6 23V7C6 6.44772 6.44772 6 7 6H16.75ZM18.5957 10.1768C18.6933 10.0793 18.8517 10.0792 18.9492 10.1768L22.4844 13.7119L23.5449 14.7734C23.6424 14.8711 23.6425 15.0294 23.5449 15.127L18.9492 19.7227C18.8516 19.8202 18.6933 19.8201 18.5957 19.7227L17.5342 18.6621C17.4368 18.5646 17.4369 18.4062 17.5342 18.3086L19.8418 16H11.25C11.1119 16 11 15.8881 11 15.75V14.25C11 14.1119 11.1119 14 11.25 14H19.9434L17.5352 11.5908C17.4375 11.4932 17.4375 11.3349 17.5352 11.2373L18.5957 10.1768Z"
        fill={linearGradient ? `url(#${gradientId})` : 'currentColor'}
      />
    </svg>
  );
};
