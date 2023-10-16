import React, { useState } from 'react';

import copyTextToClipboard from '../../utils/copy';
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
}

/** CopyButton is a component for copying text to the clipboard. It
 * displays a copy icon that, when clicked, copies the content to the
 * clipboard and displays a toast banner with the toastText.
 */
export const CopyButton = ({
  content,
  tooltipText,
  toastText,
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <InfoTooltip title={tooltipText} arrow placement="top">
        <CopyIcon
          onClick={() => {
            copyTextToClipboard(content).then(() => {
              setCopied(true);
            });
          }}
          className="cursor-pointer hover:stroke-grey-400"
        />
      </InfoTooltip>
      {copied && (
        <Banner
          text={toastText}
          duration={1000}
          onClose={() => setCopied(false)}
        />
      )}
    </div>
  );
};
