import { useLingui } from '@lingui/react';

import {
  ROLE_TOOLTIP_LINK_TEXT,
  ROLE_TOOLTIP_TEXT,
} from './RoleTooltip.constants';

export const RoleTooltip = ({ docsUrl }: { docsUrl: string }) => {
  const { _ } = useLingui();

  return (
    <span className="text-[14px]">
      {_(ROLE_TOOLTIP_TEXT)}{' '}
      <a
        href={docsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sc-text-link border-none bg-transparent cursor-pointer pl-0 font-bold"
      >
        {_(ROLE_TOOLTIP_LINK_TEXT)}
      </a>
    </span>
  );
};
