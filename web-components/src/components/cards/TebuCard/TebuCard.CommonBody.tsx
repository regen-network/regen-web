import React from 'react';
import Box from '@mui/material/Box';

import { Body } from '../../typography';

export interface ThreatBodyProps {
  icon: JSX.Element;
  description: JSX.Element | string;
  title: string;
}

const ThreatBody: React.FC<ThreatBodyProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <Box className="flex gap-[10px]">
      <Box>{icon}</Box>
      <Box>
        <Body className="font-montserrat text-[16px] mt-[12px] font-bold">
          {title}
        </Body>
        <Body className="font-montserrat text-[12px] pmb-[10px]">
          {description}
        </Body>
      </Box>
    </Box>
  );
};

export default ThreatBody;
