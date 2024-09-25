import { useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import {
  BlockContent,
  SanityBlockContent,
} from 'web-components/src/components/block-content';
import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import { cn } from 'web-components/src/utils/styles/cn';

export interface TebuBannerProps {
  content: SanityBlockContent;
  learnMoreLink: SanityBlockContent;
  logo: string;
  className?: string;
}

export const TebuBanner = ({
  content,
  learnMoreLink,
  logo,
  className,
}: TebuBannerProps) => {
  const { _ } = useLingui();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'flex items-center-col p-20 relative w-full border border-solid border-grey-300',
        className,
      )}
    >
      <img
        src={logo}
        alt={_(msg`Tebu banner`)}
        className="mr-20 sm:mr-30 object-contain"
      />
      <div
        className="flex flex-col max-w-[620px] gap-10 sm:gap-20"
        style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
      >
        <BlockContent
          className="sm:text-base text-sm font-normal leading-[145%] font-montserrat text-grey-500"
          content={content}
        />
        <BlockContent
          content={learnMoreLink}
          className="text-brand-400 sm:text-sm text-xs font-extrabold uppercase tracking-[1px] cursor-pointer"
        />
      </div>
      <CloseIcon
        role="button"
        className="absolute sm:right-[12px] sm:top-[12px] right-[6px] top-[6px] text-2xl cursor-pointer"
        onClick={() => setIsVisible(false)}
      />
    </div>
  );
};
