import { UseStateSetter } from '../../../types/react/useState';
import { Buttons } from './components/Buttons';
import { Cards } from './components/Cards';
import { FilePreview } from './components/FilePreview';
import { PostFile } from './PostFiles';
import { FilesPreviews } from './PostFiles.types';

type Props = {
  files: Array<PostFile>;
  onClose: () => void;
  setSelectedUrl: UseStateSetter<string | undefined>;
  selectedUrl: string;
  filesPreviews: FilesPreviews;
};

const PostFilesCardsDesktop = ({
  files,
  onClose,
  setSelectedUrl,
  selectedUrl,
  filesPreviews,
}: Props) => (
  <Cards
    files={files}
    infinite
    selectedUrl={selectedUrl}
    setSelectedUrl={setSelectedUrl}
    controls
    classNames={{
      root: 'hidden sm:block group',
      slider:
        'w-[301px] h-[202px] rounded-[10px] border-[3px] border-solid border-grey-0 overflow-hidden',
    }}
    items={files.map(file => (
      <FilePreview
        preview={file.url ? filesPreviews[file.url] : undefined}
        pdfPageHeight={196}
        className="h-[196px]"
        key={file.url}
        file={file}
        showName
      />
    ))}
  >
    <Buttons onClose={onClose} selectedUrl={selectedUrl} />
  </Cards>
);

export { PostFilesCardsDesktop };
