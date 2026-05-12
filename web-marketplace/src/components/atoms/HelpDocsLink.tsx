import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import { Link } from './Link';

const SEE_HELP_DOCS = msg`SEE HELP DOCS`;

interface HelpDocsLinkProps {
  href: string;
  className?: string;
}

export const HelpDocsLink: React.FC<HelpDocsLinkProps> = ({
  href,
  className,
}) => {
  const { _ } = useLingui();
  return (
    <Link
      className={cn(
        'p-0 text-[12px] tracking-[1px] font-[800] bg-transparent font-muli cursor-pointer text-ac-primary-500 border-none flex items-center gap-3 group',
        className,
      )}
      href={href}
    >
      {_(SEE_HELP_DOCS)}
      <SmallArrowIcon
        sx={{ height: '16px', width: '16px', transition: 'transform 0.2s' }}
        className="group-hover:translate-x-3"
      />
    </Link>
  );
};
