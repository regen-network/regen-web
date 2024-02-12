import { useMediaQuery, useTheme } from '@mui/material';

import PinIcon from '../../icons/PinIcon';
import Gallery from '../Gallery';
import { Tag } from './components/Tag';
import { PostFilesProps } from './PostFiles';

type Props = Pick<PostFilesProps, 'files'>;

const PostFilesPrivateLocations = ({ files }: Props) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div className="h-[100%] relative">
      <Tag
        className="top-20 left-20 absolute"
        label="Location data available on request"
        icon={<PinIcon className="w-[16px] h-[17px]" />}
      />

      <Gallery
        items={files}
        className={{ root: 'h-[100%]' }}
        pdfPageHeight={mobile ? 340 : 550}
      />
    </div>
  );
};

export { PostFilesPrivateLocations };
