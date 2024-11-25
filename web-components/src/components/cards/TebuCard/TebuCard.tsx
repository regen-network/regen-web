import cn from 'classnames';

import Card from '../../cards/Card';
import InfoIconOutlined from '../../icons/InfoIconOutlined';
import InfoTooltip from '../../tooltip/InfoTooltip';
import { Body } from '../../typography';

export interface TebuCardProps {
  className?: string;
  header: string;
  headerTooltip?: string;
  children: JSX.Element;
  footerLabels: {
    label: string;
    value: string;
  }[];
}

export default function TebuCard({
  className,
  header,
  children,
  footerLabels,
  headerTooltip,
}: TebuCardProps): JSX.Element {
  return (
    <Card
      className={cn(
        'text-sc-text-header w-full min-w-[250px] h-[239px] font-montserrat border-sc-card-standard-stroke relative',
        className,
      )}
    >
      <div className="flex items-center gap-10 pl-20 pr-3 sm:pr-5 py-15 text-[12px] bg-sc-card-standard-header-background">
        <Body className="tracking-[1px] text-[11px] sm:text-[12px] uppercase font-extrabold text-sc-text-sub-header">
          {header}
        </Body>
        {headerTooltip && (
          <InfoTooltip
            title={headerTooltip || ''}
            arrow
            placement="top"
            sx={{ padding: 0 }}
          >
            <div className="cursor-pointer m-0">
              <InfoIconOutlined className="-mb-3 w-[17px] h-[17px]" />
            </div>
          </InfoTooltip>
        )}
      </div>
      <div className="p-20">{children}</div>
      <div className="absolute bottom-20 right-20">
        {footerLabels?.length &&
          footerLabels.map(({ label, value }) => (
            <div className="flex items-center" key={label}>
              <Body className="text-[12px]">{label}</Body>
              <Body className="font-bold ml-3 text-[12px]">{value}</Body>
            </div>
          ))}
      </div>
    </Card>
  );
}
