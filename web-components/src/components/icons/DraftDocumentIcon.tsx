import React from 'react';

import { useGradientId } from './hooks/useGradientId';

interface DraftDocumentIconProps extends React.SVGProps<SVGSVGElement> {
  hasGradient?: boolean;
}

export const DraftDocumentIcon = ({
  hasGradient = false,
  ...props
}: DraftDocumentIconProps) => {
  const gradientId = useGradientId('draft_document_icon');
  const fillColor = hasGradient ? `url(#${gradientId})` : 'currentColor';

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      {hasGradient && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="12"
            y1="2.86102e-07"
            x2="0.440139"
            y2="21.6747"
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
        d="M19.2857 8.57129V21.2857H4.71429V2.71429H12H13.4286L13.4286 7.28571C13.4286 8.13571 14.1371 8.57129 14.7143 8.57129H19.2857ZM18.5017 6.85714L14.7143 3.11829L14.7143 6.85714H18.5017ZM3 1.42857C3 1.19143 3.19143 1 3.42857 1H12H15.2906C15.4328 1 15.5695 1.05651 15.6697 1.15651L20.6648 6.73107C20.7366 6.8057 20.7857 6.90594 20.7857 7.01308V22.7143C20.7857 22.9514 20.5943 23.1429 20.3571 23.1429H3.42857C3.19143 23.1429 3 22.9514 3 22.7143V1.42857Z"
        fill={fillColor}
      />
    </svg>
  );
};
