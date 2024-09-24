import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { cn } from 'web-components/src/utils/styles/cn';

import { TebuHeaderItemType } from './TebuHeader.types';

export interface Props {
  logo: string;
  items: TebuHeaderItemType[];
  className?: string;
}

export const TebuHeader = ({ logo, items, className }: Props): JSX.Element => {
  const { _ } = useLingui();

  return (
    <div className={cn(className, 'bg-brand-100 py-20 px-50')}>
      <div className="flex items-center pt-30">
        <img src={logo} alt={_(msg`Terrasos logo`)} className="mr-30" />
        <ul className="flex items-center list-none">
          {items.map(item => (
            <li
              key={item.label}
              className="mr-25 last:mr-0 border-solid border-0 border-b-2 border-brand-100 hover:border-grey-0 pb-3"
            >
              <a
                href={item.href}
                className="text-grey-700 font-montserrat font-bold text-base leading-[130%] no-underline"
                style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
