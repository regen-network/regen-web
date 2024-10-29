import React from 'react';

import IucnRedCodeIcon, {
  IucnType,
} from '../../icons/terrasos/IucnRedCodeIcon';
import CommonBody from './TebuCard.CommonBody';

export interface ThreatBodyProps {
  title: string;
  description: JSX.Element | string;
  type: IucnType;
}

const ThreatBody: React.FC<ThreatBodyProps> = ({
  title,
  description,
  type,
}) => {
  return (
    <CommonBody
      title={title}
      description={description}
      icon={<IucnRedCodeIcon type={type} />}
    />
  );
};

export default ThreatBody;
