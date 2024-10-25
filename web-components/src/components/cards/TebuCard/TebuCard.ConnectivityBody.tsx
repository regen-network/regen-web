import React from 'react';
import Box from '@mui/material/Box';

import EcologicalConnectivityLevelIcon, {
  Level,
} from '../../icons/terrasos/EcologicalConnectivityLevelIcon';
import { Body } from '../../typography';

interface ConnectivityBodyProps {
  title: string;
  description: JSX.Element | string;
  level: Level;
}

const ConnectivityBody: React.FC<ConnectivityBodyProps> = ({
  title,
  description,
  level,
}) => {
  return (
    <Box className="flex gap-[10px]">
      <Box>
        <EcologicalConnectivityLevelIcon level={level} />
      </Box>
      <Box>
        <Body className="text-[16px] mt-[12px] font-bold">{title}</Body>
        <Body className="mb-[10px]">{description}</Body>
      </Box>
    </Box>
  );
};

export default ConnectivityBody;
