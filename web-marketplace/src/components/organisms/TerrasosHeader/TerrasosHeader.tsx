import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import BreadcrumbIcon from 'web-components/src/components/icons/BreadcrumbIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import HamburgerIcon from 'components/atoms/HumberIconTerrasos';
import TerrasosLogo from 'components/atoms/TerrasosLogo';

import { getTerrasosHeaderItems } from './TerrasosHeader.constants';
import { TerrasosHeaderMobileMenu } from './TerrasosHeader.MobileMenu';

export interface Props {
  className?: string;
}

export const TerrasosHeader = ({ className }: Props): JSX.Element => {
  const { _ } = useLingui();
  const { pathname } = useLocation();
  const items = useMemo(() => getTerrasosHeaderItems(_), [_]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className={cn(
        'relative flex flex-col items-end bg-bc-neutral-0',
        className,
      )}
    >
      <div className="relative flex px-15 py-10 md:py-0 md:px-0 md:h-[72px] justify-between items-center md:max-w-[708px] lg:max-w-[940px] xl:max-w-[1220px] w-full mx-auto bg-brand-300 md:bg-ac-neutral-0">
        <TerrasosLogo
          className="text-bc-neutral-0 lg:ml-[7px] md:text-brand-300 ml-[6px] pt-[2px] md:mt-[2px]"
          width={190}
          height={42}
        />
        <HamburgerIcon
          role="button"
          className="text-bc-neutral-700 m-5 mb-0 md:hidden cursor-pointer w-[21px] absolute left-[84%]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>
      <nav className="justify-center items-center self-stretch bg-brand-300 hidden md:flex md:px-25 lg:px-0">
        <div className="flex justify-between items-center max-w-[1220px] w-full">
          <ul className="flex items-center justify-center lg:justify-start flex-wrap xl:flex-nowrap pl-0 my-0 md:mx-5">
            {items.map((item, index) => (
              <li
                key={index}
                className={cn(
                  'relative flex justify-center items-center transition-colors whitespace-nowrap',
                  'font-montserrat text-[14px] font-bold uppercase',
                  'tracking-normal leading-normal',
                  '[font-feature-settings:"liga"_off,"clig"_off]',
                  'hover:bg-bc-neutral-700 group',
                  'border-solid border-0 border-r last:border-0 border-[rgba(0,0,0,0.04)]',
                  item.href === pathname && 'bg-bc-neutral-700',
                )}
              >
                <a
                  href={item.href}
                  className={cn(
                    'text-bc-neutral-700 group-hover:text-brand-300 flex items-center px-[28px] py-15',
                    item.href === pathname && 'text-brand-300',
                  )}
                >
                  {item.label}
                  {item.items && <BreadcrumbIcon className="w-10 h-10 ml-10" />}
                </a>
                {item.items && (
                  <ul className="absolute top-full left-0 bg-bc-neutral-0 hidden group-hover:block z-50 pl-0 w-full">
                    {item.items.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className={cn(
                          'flex bg-bc-neutral-0 hover:bg-brand-300',
                          'font-montserrat text-[14px] font-medium',
                          'transition-colors group/submenu',
                        )}
                      >
                        <a
                          href={subItem.href}
                          className="text-bc-neutral-700 p-[10px_20px]"
                        >
                          {subItem.label}
                        </a>
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
              'rounded-[3px] bg-bc-neutral-700 border-none cursor-pointer whitespace-nowrap',
              'flex px-20 py-[10px]',
              'justify-center items-center',
              'text-bc-neutral-0 hover:bg-bc-neutral-600',
              'font-montserrat text-[13px] font-semibold uppercase',
            )}
          >
            {_(msg`Act now`)}
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
