import { useMemo, useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import BreadcrumbIcon from 'web-components/src/components/icons/BreadcrumbIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import { Link } from 'components/atoms';
import HamburgerIcon from 'components/atoms/HumberIconTerrasos';
import TerrasosLogo from 'components/atoms/TerrasosLogo';

import { getTerrasosHeaderItems } from './TerrasosHeader.constants';
import { TerrasosHeaderMobileMenu } from './TerrasosHeader.MobileMenu';

export interface Props {
  className?: string;
}

export const TerrasosHeader = ({ className }: Props): JSX.Element => {
  const { _ } = useLingui();
  const items = useMemo(() => getTerrasosHeaderItems(_), [_]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className={cn(
        'relative flex flex-col items-end bg-bc-neutral-0',
        className,
      )}
    >
      <div className="flex h-[74px] px-[50px] justify-between items-center max-w-[1440px] w-full mx-auto bg-brand-300 lg:bg-ac-neutral-0">
        <TerrasosLogo className="text-bc-neutral-0 lg:text-brand-300" />
        <HamburgerIcon
          role="button"
          className="text-bc-neutral-700 p-2 lg:hidden cursor-pointer w-[19px] h-[14px]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>
      <nav className="h-[52px] pl-30 pr-50 justify-center items-center self-stretch bg-brand-300 hidden lg:flex">
        <div className="flex justify-between items-center max-w-[1440px] w-full">
          <ul className="flex items-center">
            {items.map((item, index) => (
              <li
                key={index}
                className={cn(
                  'relative flex justify-center items-center transition-colors h-[52px]',
                  'font-montserrat text-[15px] font-semibold uppercase',
                  'tracking-normal leading-normal',
                  '[font-feature-settings:"liga"_off,"clig"_off]',
                  'hover:bg-bc-neutral-700 group',
                )}
              >
                <Link
                  href={item.href}
                  className="text-bc-neutral-700 group-hover:text-brand-300 flex items-center h-[52px] px-20"
                >
                  {item.label}
                  {item.items && <BreadcrumbIcon className="w-10 h-10 ml-10" />}
                </Link>
                {item.items && (
                  <ul className="absolute top-full left-0 bg-bc-neutral-0 shadow-md hidden group-hover:block z-50 pl-0 w-full">
                    {item.items.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className={cn(
                          'flex bg-bc-neutral-0 hover:bg-brand-300',
                          'font-montserrat text-[14px] font-medium',
                          'transition-colors group/submenu',
                        )}
                      >
                        <Link
                          href={subItem.href}
                          className="text-bc-neutral-700 p-[10px_20px]"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <a
            href="https://tebu.terrasos.co/"
            className={cn(
              'rounded-[2px] bg-bc-neutral-700 border-none cursor-pointer',
              'flex h-[42px] px-20 py-[6px]',
              'justify-center items-center gap-[5px]',
              'text-bc-neutral-0 hover:bg-bc-neutral-600',
              'font-montserrat text-[15px] font-semibold uppercase',
            )}
          >
            {_(msg`Act!`)}
          </a>
        </div>
      </nav>
      <TerrasosHeaderMobileMenu
        items={items}
        isOpen={mobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
      />
    </div>
  );
};
