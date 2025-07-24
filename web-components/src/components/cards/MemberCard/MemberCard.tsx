import { LinkComponentType } from '../../../types/shared/linkComponentType';
import EditIcon from '../../icons/EditIcon';
import { Body, Label, Title } from '../../typography';
import UserAvatar from '../../user/UserAvatar';

type Props = {
  imageSrc: string;
  name: string;
  description: string;
  isCurrentAccount: boolean;
  editLink: string;
  editText: string;
  linkComponent: LinkComponentType;
};
export const MemberCard = ({
  imageSrc,
  name,
  description,
  isCurrentAccount,
  editLink,
  editText,
  linkComponent: LinkComponent,
}: Props) => (
  <article className="flex flex-col items-center relative px-20 py-40 border border-solid border-sc-card-standard-stroke rounded-[10px] shadow-[0_0_4px_0_rgba(0,0,0,0.05)]">
    <UserAvatar src={imageSrc} alt={name} className="w-[120px] h-[120px]" />
    <Title className="py-10" variant="h6">
      {name}
    </Title>
    <Body className="text-center">{description}</Body>
    {isCurrentAccount && (
      <LinkComponent href={editLink}>
        <Label
          className="group flex items-center gap-5 text-sc-text-link hover:text-brand-300 absolute top-[17px] left-20"
          size="xs"
        >
          <EditIcon className="group-hover:text-brand-300" />
          {editText}
        </Label>
      </LinkComponent>
    )}
  </article>
);
