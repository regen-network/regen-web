import { OtherDocumentsIcon } from '../../icons/OtherDocumentsIcon';
import { Tag } from './components/Tag';

type Props = {
  label: string;
};

const PostFilesPrivateFiles = ({ label }: Props) => (
  <Tag
    label={label}
    icon={<OtherDocumentsIcon className="w-[18px] h-[18px]" />}
  />
);

export { PostFilesPrivateFiles };
