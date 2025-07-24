import { useLingui } from '@lingui/react';
import Image from 'next/image';

import { PrefinanceTag } from 'web-components/src/components/PrefinanceTag/PrefinanceTag';

import { getProjectCardBodyTextMapping } from 'lib/constants/shared.constants';

export function OrderSummaryImage({
  src,
  prefinanceProject,
  altText,
}: {
  src: string;
  prefinanceProject?: boolean;
  altText: string;
}) {
  const { _ } = useLingui();

  return (
    <div className="w-[90px] sm:w-full  sm:h-[160px]">
      {prefinanceProject && (
        <PrefinanceTag
          classNames={{ root: 'top-20' }}
          bodyTexts={getProjectCardBodyTextMapping(_)}
        />
      )}
      <Image
        src={src}
        alt={altText}
        width={728}
        height={440}
        className="w-[90px] h-[60px] px-15 sm:h-[160px] sm:px-0 sm:w-full object-cover object-center"
      />
    </div>
  );
}
