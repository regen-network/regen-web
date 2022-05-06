import React from 'react';
import { Body, Title } from '../typography';
import { TextSize } from '../typography/sizing';

interface GaugeTextProps {
  number: number;
  label: string;
  format?: boolean;
  textSize?: TextSize;
}

export default function GaugeText({
  number,
  label,
  format,
}: GaugeTextProps): JSX.Element {
  const displayedNumber: string = format
    ? new Intl.NumberFormat('en-US').format(number)
    : number.toString();
  return (
    <Body size="lg">
      <Title variant="h4" mobileVariant="h6" as="span">
        {displayedNumber}{' '}
      </Title>
      {label}
    </Body>
  );
}
