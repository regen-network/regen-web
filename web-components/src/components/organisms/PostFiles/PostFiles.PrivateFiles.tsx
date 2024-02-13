import { OtherDocumentsIcon } from '../../icons/OtherDocumentsIcon';
import { Tag } from './components/Tag';

const PostFilesPrivateFiles = () => (
  <Tag
    label="Files available on request"
    icon={<OtherDocumentsIcon className="w-[18px] h-[18px]" />}
  />
);

export { PostFilesPrivateFiles };
