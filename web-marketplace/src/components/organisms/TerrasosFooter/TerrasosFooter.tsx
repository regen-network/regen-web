import RegenIcon from 'web-components/src/components/icons/RegenIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import { Link } from 'components/atoms';

import { TerrasosSocialItem } from './Terrasos.types';

export interface Props {
  poweredBy: string;
  copyright: string;
  socialItems: TerrasosSocialItem[];
  className?: string;
}

export const TerrasosFooter = ({
  poweredBy,
  copyright,
  socialItems,
  className,
}: Props): JSX.Element => {
  return (
    <div
      className={cn(
        'flex flex-col items-end w-full sm:p-[18px_50px_100px_50px] sm:gap-[11px] bg-brand-300 text-sc-button-text-icon-dark p-[18px_50px_40px_10px] gap-[10px]',
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row items-start gap-20 sm:gap-0 sm:justify-between sm:items-center self-stretch">
        <div className="flex items-center">
          <span className="font-montserrat text-[9px] font-bold leading-normal tracking-[1px] uppercase mr-10">
            {poweredBy}
          </span>
          <RegenIcon className="mr-40 w-[73px] h-[33px]" />
        </div>
        <span className="text-black font-['Montserrat'] text-xs font-normal leading-[130%]">
          {copyright}
        </span>
        <div className="flex items-center gap-10">
          {socialItems.map(item => (
            <Link href={item.href} key={item.name}>
              <item.Icon
                className={cn(
                  'w-30 h-30 p-[7px] rounded-[25px] bg-sc-button-text-icon-dark',
                  item.className,
                )}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
