import { Link } from 'react-router-dom';

import { CopyButton } from 'web-components/src/components/buttons/CopyButton';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Body } from 'web-components/src/components/typography/Body';
import { Subtitle } from 'web-components/src/components/typography/Subtitle';
import UserAvatar from 'web-components/src/components/user/UserAvatar';

import { DashboardNavHeaderData } from './DashboardNavigation.types';

export const DashboardNavHeader: React.FC<DashboardNavHeaderData> = ({
  name,
  address,
  avatarSrc,
}) => {
  const short = `${address.slice(0, 8)}…${address.slice(-5)}`;

  return (
    <div className="flex items-start gap-15 px-3 py-4 mb-20">
      <UserAvatar src={avatarSrc} size="project" alt={name} />

      <div className="flex flex-col">
        <Subtitle className="text-[16px] text-bc-neutral-900 pt-5">
          {name}
        </Subtitle>

        <div className="flex items-center">
          <Body className="text-neutral-600 weight-500 text-[12px]">
            {short}
          </Body>
          <span className="inline-flex origin-center scale-[0.6]">
            <CopyButton content={address} tooltipText={''} toastText={''} />
          </span>
        </div>
        <Link
          style={{
            textDecoration: 'underline',
            color: '#8F8F8F',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
          to={''}
          // eslint-disable-next-line lingui/no-unlocalized-strings
        >
          View personal profile
          <SmallArrowIcon className="h-12 w-12" />
        </Link>
      </div>
    </div>
  );
};
