import { DraftIcon } from '../../icons/DraftIcon';
import { Badge, BadgeProps } from './PostCard.Badge';

export const DraftBadge = ({ label }: Pick<BadgeProps, 'label'>) => (
  <Badge
    className="bg-grey-300"
    label={label}
    icon={<DraftIcon className="text-grey-700" />}
  />
);
