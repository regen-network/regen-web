import PinIcon from '../../icons/PinIcon';
import Gallery from '../Gallery';
import { Tag } from './components/Tag';
import { PostFilesProps } from './PostFiles';

type Props = Pick<PostFilesProps, 'files'>;

const PostFilesPrivateLocations = ({ files }: Props) => {
  return (
    <div className="relative">
      <Tag
        className="top-20 left-20 absolute"
        label="Location data available on request"
        icon={<PinIcon className="w-[16px] h-[17px]" />}
      />

      <Gallery items={files} className={{ root: 'h-[100%]' }} />
    </div>
  );
};

export { PostFilesPrivateLocations };
