import { ReactNode, useState } from 'react';

import copyTextToClipboard from '../../utils/copy';
import { cn } from '../../utils/styles/cn';
import Banner from '../banner';
import { CopyIcon } from '../icons/CopyIcon';
import InfoTooltip from '../tooltip/InfoTooltip';

/** The props for the CopyButton component */
export interface CopyButtonProps {
  /** The content to be copied to the clipboard */
  content: string;

  /** The text to be displayed in the tooltip */
  tooltipText: string;

  /** The text to be displayed in the toast banner */
  toastText: string;

  /** Optional className applied to the root element */
  className?: string;

  /** Optional className applied to CopyIcon */
  iconClassName?: string;

  /** Optional content rendered inside the component, placed before the CopyIcon */
  children?: ReactNode;
}

/** CopyButton is a component for copying text to the clipboard. It
 * displays a copy icon that, when clicked, copies the content to the
 * clipboard and displays a toast banner with the toastText.
 */
export const CopyButton = ({
  content,
  tooltipText,
  toastText,
  className,
  iconClassName,
  children,
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        copyTextToClipboard(content).then(() => {
          setCopied(true);
        });
      }}
      className={cn('border-none bg-[transparent] p-0', className)}
      aria-label={tooltipText}
    >
      {children}
      <InfoTooltip title={tooltipText} arrow placement="top">
        <CopyIcon
          className={cn('cursor-pointer hover:stroke-grey-400', iconClassName)}
        />
      </InfoTooltip>
      {copied && (
        <Banner
          text={toastText}
          duration={1000}
          onClose={() => setCopied(false)}
        />
      )}
    </button>
  );
};
