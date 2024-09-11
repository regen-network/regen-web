import { LockIcon } from '../../icons/LockIcon';
import { Badge, BadgeProps } from './PostCard.Badge';

export const PrivateBadge = ({ label }: Pick<BadgeProps, 'label'>) => (
  <Badge
    className="bg-error-300"
    label={label}
    icon={<LockIcon className="h-[18px] w-[18px]" />}
  />
);
