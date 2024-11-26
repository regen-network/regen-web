import React from 'react';
import Box from '@mui/material/Box';

import { Body } from '../../typography';

export interface CommonBodyProps {
  icon: JSX.Element;
  description: JSX.Element | string;
  title: string;
}

const CommonBody: React.FC<CommonBodyProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <Box className="flex gap-[10px]">
      <Box>{icon}</Box>
      <Box>
        <Body className="font-montserrat text-[16px] mt-[12px] font-bold mb-5">
          {title}
        </Body>
        <Body className="font-montserrat text-[12px] pb-20">{description}</Body>
      </Box>
    </Box>
  );
};

export default CommonBody;
