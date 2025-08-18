import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { NoProjectIcon } from 'web-components/src/components/icons/NoProjectIcon';
import { Title } from 'web-components/src/components/typography';

interface NoProjectsDisplayProps {
  title?: string;
  className?: string;
}

export const NoProjectsDisplay = ({
  title,
  className = '',
}: NoProjectsDisplayProps): JSX.Element => {
  const { _ } = useLingui();

  return (
    <div
      className={`flex flex-col justify-center items-center rounded-[10px]
                  h-[321px] px-5 gap-[15px] md:py-[40px]
                  md:px-[263px] md:w-auto md:h-auto md:gap-[10px] ${className}`}
      style={{
        border: '1px solid var(--card-standard-stroke, #D2D5D9)',
        background: 'var(--card-standard-header-background, #EFEFEF)',
      }}
    >
      <NoProjectIcon sx={{ width: 100, height: 100 }} />
      <Title variant="h4">{title || _(msg`No projects to display`)}</Title>
    </div>
  );
};
