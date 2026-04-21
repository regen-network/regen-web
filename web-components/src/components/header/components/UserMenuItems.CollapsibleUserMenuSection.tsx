import { useState } from 'react';
import Collapse from '@mui/material/Collapse';

import BreadcrumbIcon from '../../icons/BreadcrumbIcon';
import { LinkComponentProp } from '../../modal/ConfirmModal';
import { HeaderDropdownItem } from './HeaderDropdown/HeaderDropdown.Item';

type CollapsibleUserMenuSectionProps = {
  header: JSX.Element;
  items: {
    href?: string;
    label: string;
    icon: JSX.Element;
    className: string;
    iconClassName?: string;
  }[];
  pathname: string;
  labelClassName: string;
  linkComponent: LinkComponentProp;
};

export const CollapsibleUserMenuSection = ({
  header,
  items,
  pathname,
  labelClassName,
  linkComponent,
}: CollapsibleUserMenuSectionProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const resolvedItems = items.filter(item => !!item.href);

  return (
    <div className="w-full">
      <div className="flex items-start gap-5 pr-10">
        <div className="flex-1 min-w-0">{header}</div>
        {resolvedItems.length > 0 && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded(current => !current)}
            className="mt-5 p-0 border-0 bg-transparent cursor-pointer"
          >
            <BreadcrumbIcon
              direction={expanded ? 'up' : 'down'}
              className="w-[12px] text-sc-icon-standard-disabled"
            />
          </button>
        )}
      </div>
      <Collapse in={expanded}>
        <div className="pt-5">
          {resolvedItems.map(item => (
            <HeaderDropdownItem
              key={`${item.href}-${item.label}`}
              pathname={pathname}
              linkComponent={linkComponent}
              href={item.href as string}
              label={item.label}
              labelClassName={labelClassName}
              className={item.className}
              iconClassName={item.iconClassName}
              icon={item.icon}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
};
