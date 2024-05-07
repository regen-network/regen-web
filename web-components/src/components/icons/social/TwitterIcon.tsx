import withHoverColor, { Props } from '../withHoverColor';

function TwitterIcon({
  className,
  color,
  onMouseEnter,
  onMouseLeave,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        d="M0.0560763 0L8.93612 12.1343L0 22H2.01116L9.83472 13.3624L16.1559 22H23L13.6203 9.18317L21.938 0H19.9268L12.7217 7.95503L6.90014 0H0.0560763ZM3.01364 1.51397H6.15782L20.042 20.4858H16.8978L3.01364 1.51397Z"
        fill={color}
      />
    </svg>
  );
}

export default withHoverColor(TwitterIcon);
