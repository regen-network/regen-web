import clsx from 'clsx';

import CheckIcon from 'web-components/src/components/icons/CheckIcon';
import UserAvatar from 'web-components/src/components/user/UserAvatar';

type Account = {
  id: string;
  name: string;
  avatarSrc?: string;
};

interface Props {
  accounts: Account[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const AccountSwitcherDropdown: React.FC<Props> = ({
  accounts,
  activeId,
  onSelect,
}) => (
  <ul
    /* pull out 8 px on each side so it “floats” wider than the rail */
    className={clsx(
      'absolute top-[25%] -left-[15px] w-[256px] h-[110px]',
      'shadow-[0_0_20px_rgba(0,0,0,0.25)] ',
      'z-10 list-none p-0',
    )}
  >
    {accounts.map((acc, idx) => {
      const selected = acc.id === activeId;

      return (
        <li key={acc.id}>
          <button
            type="button"
            onClick={() => onSelect(acc.id)}
            className={clsx(
              'flex w-full items-center gap-10 px-10 py-10 h-12 border-none h-[55px]',
              'hover:cursor-pointer',
              selected
                ? 'bg-bc-neutral-200' // active row
                : 'bg-bc-neutral-100 hover:bg-bc-neutral-200', // inactive rows
            )}
          >
            <UserAvatar src={acc.avatarSrc} size="small" alt={acc.name} />
            <span className="ml-3 mr-auto truncate text-left">{acc.name}</span>
            {selected && (
              <CheckIcon className="h-[18px] w-[18px] text-brand-400" />
            )}
          </button>
        </li>
      );
    })}
  </ul>
);

export default AccountSwitcherDropdown;
