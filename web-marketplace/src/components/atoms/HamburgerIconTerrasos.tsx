import { SVGProps } from 'react';

import { cn } from 'web-components/src/utils/styles/cn';

type Props = SVGProps<SVGSVGElement> & {
  className?: string;
};

/**
 * Mobile menu icon used in Terrasos app
 */
export default function HamburgerIcon({
  className,
  ...props
}: Props): JSX.Element {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 19 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect y="0.5" width="19" height="1.27273" rx="0.25" fill="currentColor" />
      <rect
        y="6.86353"
        width="19"
        height="1.27273"
        rx="0.25"
        fill="currentColor"
      />
      <rect
        y="13.2273"
        width="19"
        height="1.27273"
        rx="0.25"
        fill="currentColor"
      />
    </svg>
  );
}
