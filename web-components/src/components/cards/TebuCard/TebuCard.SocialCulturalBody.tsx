import React from 'react';

import SocialCulturalValueIcon, {
  SocialCulturalValueType,
} from '../../icons/terrasos/SocialCulturalValueIcon';
import CommonBody from './TebuCard.CommonBody';

export interface SocialCulturalBodyProps {
  title: string;
  description: JSX.Element | string;
  type: SocialCulturalValueType;
}

const SocialCulturalBody: React.FC<SocialCulturalBodyProps> = ({
  title,
  description,
  type,
}) => {
  return (
    <CommonBody
      title={title}
      description={description}
      icon={<SocialCulturalValueIcon type={type} />}
    />
  );
};

export default SocialCulturalBody;
