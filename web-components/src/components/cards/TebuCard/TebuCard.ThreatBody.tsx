import React from 'react';
import Box from '@mui/material/Box';

import IucnRedCodeIcon, {
  IucnType,
} from '../../icons/terrasos/IucnRedCodeIcon';
import { Body } from '../../typography';

interface ThreatBodyProps {
  title: string;
  description: JSX.Element | string;
  iucnType: IucnType;
}

const ThreatBody: React.FC<ThreatBodyProps> = ({
  title,
  description,
  iucnType,
}) => {
  return (
    <Box className="flex gap-[10px]">
      <Box>
        <IucnRedCodeIcon type={iucnType} />
      </Box>
      <Box>
        <Body className="text-[16px] mt-[12px] font-bold">{title}</Body>
        <Body className="mb-[10px]">{description}</Body>
      </Box>
    </Box>
  );
};

export default ThreatBody;
