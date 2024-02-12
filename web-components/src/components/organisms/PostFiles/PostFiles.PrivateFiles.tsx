import { OtherDocumentsIcon } from '../../icons/OtherDocumentsIcon';
import { Tag } from './components/Tag';
import { PostFilesProps } from './PostFiles';

type Props = Pick<PostFilesProps, 'files'>;

const PostFilesPrivateFiles = ({ files }: Props) => {
  return (
    <div>
      <Tag
        label="Files available on request"
        icon={<OtherDocumentsIcon className="w-[18px] h-[18px]" />}
      />
    </div>
  );
};

export { PostFilesPrivateFiles };
