import Card from '../../cards/Card';

interface UserMenuItemProfileProps {
  selected: boolean;
}

const UserMenuItemProfile: React.FC<UserMenuItemProfileProps> = ({
  selected,
}) => {
  return <Card borderColor={selected ? undefined : 'transparent'}></Card>;
};

export { UserMenuItemProfile };
