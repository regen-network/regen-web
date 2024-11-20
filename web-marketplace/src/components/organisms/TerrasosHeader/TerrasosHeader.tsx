import { useMemo, useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAtomValue } from 'jotai';

import BreadcrumbIcon from 'web-components/src/components/icons/BreadcrumbIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';

import HamburgerIcon from 'components/atoms/HumberIconTerrasos';
import TerrasosLogo from 'components/atoms/TerrasosLogo';

import {
  getTerrasosHeaderItems,
  TERRASOS_BASE_PATHNAME,
} from './TerrasosHeader.constants';
import { LanguageSwitcher } from './TerrasosHeader.LanguageSwitcher';
import { TerrasosHeaderMobileMenu } from './TerrasosHeader.MobileMenu';

export interface Props {
  className?: string;
}

export const TerrasosHeader = ({ className }: Props): JSX.Element => {
  const { _ } = useLingui();
  const selectedLanguage = useAtomValue(selectedLanguageAtom);
  const items = useMemo(
    () => getTerrasosHeaderItems({ _, selectedLanguage }),
    [_, selectedLanguage],
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className={cn(
        'relative flex flex-col items-end bg-bc-neutral-0',
        className,
      )}
    >
      <div className="relative flex px-15 py-10 md:py-0 md:px-0 h-[62px] md:h-[72px] justify-between items-center md:max-w-[708px] lg:max-w-[940px] xl:max-w-[1220px] w-full mx-auto bg-brand-300 md:bg-ac-neutral-0">
        <a href="https://www.terrasos.co/">
          <TerrasosLogo
            className="text-bc-neutral-0 lg:ml-[7px] md:text-brand-300 ml-[7px] pt-[6px]"
            width={190}
            height={43}
          />
        </a>
        <div className="flex items-center mb-5 md:mb-0 pr-25 md:pr-0">
          <LanguageSwitcher className="mr-5 md:mr-15" />
          <HamburgerIcon
            role="button"
            className="text-bc-neutral-700 m-5 mb-0 md:hidden cursor-pointer w-[21px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </div>
      <nav className="justify-center items-center self-stretch bg-brand-300 hidden md:flex md:px-25 lg:px-0">
        <div className="flex justify-between items-center md:max-w-[708px] lg:max-w-[940px] xl:max-w-[1220px] w-full">
          <ul className="flex items-center justify-center lg:justify-start flex-wrap 2xl:flex-nowrap pl-0 my-0 md:ml-5">
            {items.map((item, index) => {
              const isActive = item.href.startsWith(TERRASOS_BASE_PATHNAME);

              return (
                <li
                  key={index}
                  className={cn(
                    'relative flex justify-center items-center transition-colors whitespace-nowrap',
                    'font-montserrat text-[14px] font-bold uppercase',
                    'tracking-normal leading-normal',
                    '[font-feature-settings:"liga"_off,"clig"_off]',
                    'hover:bg-bc-neutral-700 group',
                    'after:content-[""] after:absolute after:top-0 after:right-0 after:w-[1px] after:h-full after:bg-[rgba(0,0,0,0.04)] last:after:hidden',
                    isActive && 'bg-bc-neutral-700',
                  )}
                >
                  <a
                    href={item.href}
                    className={cn(
                      'text-bc-neutral-700 group-hover:text-brand-300 flex items-center px-[28px] py-15',
                      isActive && 'text-brand-300',
                    )}
                  >
                    {item.label}
                    {item.items && (
                      <BreadcrumbIcon className="w-[11px] h-[11px] ml-10" />
                    )}
                  </a>
                  {item.items && (
                    <ul className="absolute top-full left-0 bg-bc-neutral-0 hidden group-hover:block z-50 pl-0 w-full">
                      {item.items.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className={cn(
                            'flex bg-bc-neutral-0 hover:bg-brand-300 transition-colors',
                            'font-montserrat text-[14px] font-medium normal-case',
                            'group/submenu whitespace-normal',
                            isActive && subItem.default && 'bg-brand-300',
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
              );
            })}
          </ul>
          <a
            href="https://tebu.terrasos.co/"
            className={cn(
              'rounded-[3px] bg-bc-neutral-700 border-none cursor-pointer whitespace-nowrap',
              'flex px-20 py-10 scale-[1.1] mr-5',
              'justify-center items-center',
              'text-bc-neutral-0 hover:bg-bc-neutral-600',
              'font-montserrat text-[13px] leading-[15.6px] font-semibold uppercase',
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
