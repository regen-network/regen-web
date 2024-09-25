import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import {
  BlockContent,
  SanityBlockContent,
} from 'web-components/src/components/block-content';
import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import { Link } from 'components/atoms';

export interface TebuBannerProps {
  content: SanityBlockContent;
  learnMoreLink: string;
  logo: string;
  className?: string;
  onClose: () => void;
}

export const TebuBanner = ({
  content,
  learnMoreLink,
  logo,
  className,
  onClose,
}: TebuBannerProps) => {
  const { _ } = useLingui();

  return (
    <div
      className={cn(
        'flex items-center-col p-20 relative w-full border border-solid border-grey-300 rounded-[5px]',
        className,
      )}
    >
      <img
        src={logo}
        alt={_(msg`Tebu banner`)}
        className="mr-20 sm:mr-30 object-contain"
      />
      <div
        className="flex flex-col max-w-[620px] gap-10 sm:gap-20 font-montserrat"
        style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
      >
        <BlockContent
          className="sm:text-base text-sm font-normal leading-[145%] text-grey-500"
          content={content}
        />
        <Link
          href={learnMoreLink}
          className="text-brand-400 sm:text-sm text-xs font-extrabold uppercase tracking-[1px] cursor-pointer flex items-center w-fit"
        >
          <span className="mr-3">{_(msg`Learn more`)}</span>
          <SmallArrowIcon />
        </Link>
      </div>
      <CloseIcon
        role="button"
        className="absolute sm:right-[12px] sm:top-[12px] right-[6px] top-[6px] text-2xl cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
};
