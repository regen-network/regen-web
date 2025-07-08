import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import Image from 'next/image';

import {
  BlockContent,
  SanityBlockContent,
} from 'web-components/src/components/block-content';
import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { LinkType } from 'web-components/src/types/shared/linkType';
import { cn } from 'web-components/src/utils/styles/cn';

import { Link } from 'components/atoms';

export interface TebuBannerProps {
  content: SanityBlockContent;
  learnMoreLink?: LinkType | null;
  logo?: string | null;
  logoAlt?: string | null;
  className?: string;
  onClose: () => void;
}

export const TebuBanner = ({
  content,
  learnMoreLink,
  logoAlt,
  className,
  onClose,
  imageProps,
}: TebuBannerProps) => {
  console.log('imageProps', imageProps);
  const { _ } = useLingui();
  return (
    <div
      className={cn(
        'flex items-center-col p-20 relative w-full border border-solid border-grey-300 rounded-[5px] bg-grey-0',
        className,
      )}
    >
      {imageProps && (
        <Image
          {...imageProps}
          alt={logoAlt}
          className="mr-20 sm:mr-30 object-contain"
        />
      )}
      <div
        className="flex flex-col max-w-[620px] gap-10 sm:gap-20 font-montserrat"
        style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
      >
        <div className="sm:text-base text-sm font-normal leading-[145%] text-grey-500">
          <BlockContent content={content} />
        </div>
        {learnMoreLink && (
          <Link
            href={learnMoreLink.href}
            className="text-brand-400 sm:text-sm text-xs font-extrabold uppercase tracking-[1px] cursor-pointer flex items-center w-fit"
          >
            <span className="mr-3">{learnMoreLink.text}</span>
            <SmallArrowIcon />
          </Link>
        )}
      </div>
      <CloseIcon
        role="button"
        className="absolute sm:right-[12px] sm:top-[12px] right-[6px] top-[6px] text-2xl cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
};
