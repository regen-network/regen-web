import { Link } from 'react-router-dom';

import RegistryIcon from 'web-components/src/components/icons/RegistryIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';

export const DashboardNavFooter: React.FC = () => (
  <div className="flex flex-col gap-10 items-center justify-between px-3 py-4">
    <div className="flex items-center gap-2">
      <RegistryIcon className="h-[53px] w-[80px] text-bc-neutral-400" />
    </div>
    <Link
      to="/"
      style={{
        textDecoration: 'none',
        color: '#000000',
        fontSize: '14px',
        fontWeight: 400,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}
      // eslint-disable-next-line lingui/no-unlocalized-strings
    >
      Exit to homepage
      <SmallArrowIcon className="h-12 w-12" />
    </Link>
  </div>
);
