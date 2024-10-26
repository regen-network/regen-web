import React from 'react';

import EcologicalConnectivityLevelIcon, {
  Level,
} from '../../icons/terrasos/EcologicalConnectivityLevelIcon';
import CommonBody from './TebuCard.CommonBody';

export interface ConnectivityBodyProps {
  title: string;
  description: JSX.Element | string;
  type: Level;
}

const ConnectivityBody: React.FC<ConnectivityBodyProps> = ({
  title,
  description,
  type,
}) => {
  return (
    <CommonBody
      title={title}
      description={description}
      icon={<EcologicalConnectivityLevelIcon type={type} />}
    />
  );
};

export default ConnectivityBody;
