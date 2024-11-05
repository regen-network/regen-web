import RegenIcon from 'web-components/src/components/icons/RegenIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import { Link } from 'components/atoms';

import { TerrasosColumnItem, TerrasosSocialItem } from './Terrasos.types';

import terrasosFooterLogo from 'assets/svgs/logos/terrasosFooterLogo.svg';

export interface Props {
  poweredBy: string;
  copyright: string;
  socialItems: TerrasosSocialItem[];
  columnItems: TerrasosColumnItem[];
  companyDescription: string;
  logoAlt: string;
  className?: string;
}

export const TerrasosFooter = ({
  poweredBy,
  copyright,
  socialItems,
  columnItems,
  companyDescription,
  logoAlt,
  className,
}: Props): JSX.Element => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start text-bc-neutral-0 font-montserrat',
        className,
      )}
    >
      <div className="px-[30px] md:px-0 pt-[80px] pb-[40px] gap-[72px] bg-[#252525] w-full md:h-[461px]">
        <div className="flex flex-col items-center self-stretch md:items-start md:justify-center md:flex-row md:max-w-[708px] lg:max-w-[940px] xl:max-w-[1220px] w-full md:mx-auto">
          <div className="max-w-[300px] md:max-w-none md:w-[40%] md:pl-[12px]">
            <div className="flex flex-col items-center md:items-start gap-30 md:pr-[10%]">
              <img
                src={terrasosFooterLogo}
                alt={logoAlt}
                className="w-[226px]"
              />
              <span className="text-[13px] md:text-[15px] leading-[160%] text-center md:text-left">
                {companyDescription}
              </span>
              <div className="flex items-center gap-[18px]">
                {socialItems.map(item => (
                  <Link href={item.href} key={item.name}>
                    <item.Icon
                      className={cn(
                        'w-[36px] h-[36px] p-[7px] rounded-[20px] border border-solid border-bc-neutral-0',
                        item.className,
                      )}
                    />
                  </Link>
                ))}
              </div>
              <Link
                href="https://app.regen.network/"
                className="text-sc-button-text-icon-light"
              >
                <div className="flex items-center">
                  <span className="font-montserrat text-[9px] font-bold leading-normal tracking-[1px] uppercase mr-10">
                    {poweredBy}
                  </span>
                  <RegenIcon className="w-[73px] h-[33px]" color="#fff" />
                </div>
              </Link>
            </div>
          </div>
          {columnItems?.map((columnItem, index) => (
            <div className="md:w-[20%]" key={columnItem.title}>
              <div className="flex flex-col items-center md:items-start md:mx-[12px] md:mb-[40px]">
                <h6 className="text-brand-300 text-[13px] md:text-[15px] font-bold leading-[160%] mb-30 mt-0 whitespace-nowrap uppercase">
                  {columnItem.title}
                </h6>
                <ul className="list-none pl-0 flex flex-col items-center md:items-start my-0">
                  {columnItem.links?.map((item, subIndex) => (
                    <li
                      key={item.label ?? subIndex}
                      className="mb-20 font-medium text-[15px] text-center md:text-left"
                    >
                      {item.href && (
                        <Link
                          href={item.href}
                          className="block whitespace-pre-line"
                        >
                          {item.label}
                        </Link>
                      )}
                      {item.subLinks && (
                        <div className="flex flex-col items-center md:items-start">
                          {item.subLinks.map(subLink => (
                            <Link href={subLink.href}>{subLink.label}</Link>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex items-center justify-center h-[101px] md:h-[108px] bg-bc-neutral-700">
        <span className="text-[13px] md:text-[15px] leading-[130%] font-bold">
          {copyright}
        </span>
      </div>
    </div>
  );
};
