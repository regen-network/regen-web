import Gallery from '../Gallery';
import { PostFilesProps } from './PostFiles';

type Props = Pick<PostFilesProps, 'files'>;

const PostFilesPrivateLocations = ({ files }: Props) => {
  return <Gallery items={files} className={{ root: 'h-[100%]' }} />;
};

export { PostFilesPrivateLocations };
