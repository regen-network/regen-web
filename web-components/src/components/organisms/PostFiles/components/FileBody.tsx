import ReadMore from '../../../../components/read-more';
import { Body } from '../../../../components/typography';
import { isImage, isVideo } from '../../../inputs/new/FileDrop/FileDrop.utils';
import { PostFile } from '../PostFiles';

type Props = {
  file: PostFile;
  className?: string;
  showMediaName?: boolean; // shows image or video file name if no description
};

const FileBody = ({ file, showMediaName }: Props) => {
  const { mimeType, name, description } = file;
  const image = isImage(mimeType);
  const video = isVideo(mimeType);

  return (
    <>
      {((showMediaName && !description) || !(image || video)) && (
        <Body component="span" size="xs" className="text-grey-600 font-bold">
          {name}&nbsp;
        </Body>
      )}
      {description && (
        <ReadMore
          maxLength={50}
          restMinLength={10}
          sentenceBased={false}
          size="xs"
          component="span"
          classes={{
            root: 'mb-0 inline',
            button: 'text-xs',
            textContainer: 'p-0 inline',
          }}
        >
          {description}
        </ReadMore>
      )}
    </>
  );
};

export { FileBody };
