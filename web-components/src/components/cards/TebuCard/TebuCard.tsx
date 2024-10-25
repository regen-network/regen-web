import Box from '@mui/material/Box';

import Card from '../../cards/Card';
import InfoIconOutlined from '../../icons/InfoIconOutlined';
import InfoTooltip from '../../tooltip/InfoTooltip';
import { Body, Label } from '../../typography';

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
    <Card className={`text-sc-text-header w-[350px] ${className}`}>
      <Box className="flex items-center gap-[10px] pl-[20px] py-[15px] text-[12px] bg-sc-card-standard-header-background">
        <Body className="font-montserrat tracking-[1px] uppercase font-extrabold text-sc-text-sub-header">
          {header}
        </Body>
        {headerTooltip && (
          <InfoTooltip title={headerTooltip || ''} arrow placement="top">
            <Box className="cursor-pointer m-0">
              <InfoIconOutlined className="-mb-3 w-[17px] h-[17px]" />
            </Box>
          </InfoTooltip>
        )}
      </Box>
      <Box className="p-[20px]">
        {children}
        <Box className="flex flex-col items-end">
          {footerLabels?.length &&
            footerLabels.map(({ label, value }) => (
              <Box className="flex text-[12px] items-center" key={label}>
                <Body>{label}</Body>
                <Body className="font-bold ml-3">{value}</Body>
              </Box>
            ))}
        </Box>
      </Box>
    </Card>
  );
}
