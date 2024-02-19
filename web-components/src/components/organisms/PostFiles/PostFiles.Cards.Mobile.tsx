import { Point } from 'geojson';

import { UseStateSetter } from '../../../types/react/useState';
import { Buttons } from './components/Buttons';
import { Cards } from './components/Cards';
import { FileBody } from './components/FileBody';
import { FilePreview } from './components/FilePreview';
import { PostFile } from './PostFiles';
import { useStyles } from './PostFiles.styles';

type Props = {
  files: Array<PostFile>;
  onClose: () => void;
  setSelectedUrl: UseStateSetter<string | undefined>;
  setSelectedLocation: UseStateSetter<Point | undefined>;
  selectedUrl: string;
  setAnimateMarker: UseStateSetter<boolean>;
};

const PostFilesCardsMobile = ({
  files,
  onClose,
  setSelectedUrl,
  setSelectedLocation,
  selectedUrl,
  setAnimateMarker,
}: Props) => {
  const { classes: styles } = useStyles();

  return (
    <Cards
      files={files}
      selectedUrl={selectedUrl}
      setSelectedUrl={setSelectedUrl}
      setSelectedLocation={setSelectedLocation}
      classNames={{
        root: 'sm:hidden pl-[7px] pt-[362px]',
        slider: styles.mobileSlider,
      }}
      setAnimateMarker={setAnimateMarker}
      items={files.map(file => (
        <div
          key={file.url}
          className="relative bg-grey-0 h-[230px] rounded-[10px] border-[3px] border-solid border-grey-0"
        >
          <FilePreview
            pdfPageHeight={183}
            className="rounded-t-[10px] h-[183px] overflow-hidden"
            file={file}
          />

          <div className="absolute bottom-0 min-h-[40px] bg-grey-0 py-[2px] px-[7px]">
            <FileBody showMediaName file={file} />
          </div>
          <Buttons onClose={onClose} selectedUrl={selectedUrl} />
        </div>
      ))}
    />
  );
};

export { PostFilesCardsMobile };
