import ReactPlayer from 'react-player/es6';
import { Box } from '@mui/material';

import { PlayButton } from '../../../atoms/PlayButton/PlayButton';
import {
  isAudio,
  isCsv,
  isImage,
  isJson,
  isPdf,
  isVideo,
  isXlsOrXlsx,
} from '../../../inputs/new/FileDrop/FileDrop.utils';
import { Body } from '../../../typography';
import { PostFile } from '../PostFiles';
import { getColors } from '../PostFiles.utils';
import { PdfPreview } from './PdfPreview';
import { TextOrIconFilePreview } from './TextOrIconFilePreview';

type Props = {
  file: PostFile;
  className?: string;
  pdfPageHeight: number;
  showName?: boolean;
  preview?: string;
};

const FilePreview = ({
  file,
  className,
  pdfPageHeight,
  showName,
  preview,
}: Props) => {
  const { mimeType, url } = file;
  const image = isImage(mimeType);
  const video = isVideo(mimeType);
  const audio = isAudio(mimeType);
  const csv = isCsv(mimeType);
  const json = isJson(mimeType);
  const xls = isXlsOrXlsx(mimeType);
  const colors = getColors(audio, csv, xls, json);

  return (
    <Box
      className={className}
      sx={theme => ({
        position: 'relative',
        background: `${image ? `url(${url})` : `${theme.palette.grey[100]}`}`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        outline: 'none',
        backgroundColor: image || video ? 'primary.contrastText' : undefined,
      })}
    >
      <Box className="w-[100%] z-[1] h-[100%] absolute bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_62.39%,rgba(0,0,0,0.70)_100%)]" />
      {video ? (
        <>
          <ReactPlayer url={url} width="100%" height="100%" />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={url}
            className="outline-none cursor-pointer"
          >
            <PlayButton className="w-50 h-50" />
          </a>
        </>
      ) : isPdf(mimeType) ? (
        <PdfPreview
          file={url}
          pageHeight={pdfPageHeight}
          className="px-[65px] h-[100%]"
        />
      ) : (
        !isImage(mimeType) && (
          <TextOrIconFilePreview
            preview={preview}
            audio={audio}
            csv={csv}
            xls={xls}
            json={json}
            colors={colors}
            iconSize="50"
          >
            {showName && (
              <Body
                className="absolute left-[13px] bottom-[13px] text-grey-0 font-bold z-[2]"
                size="xs"
              >
                {file.name}
              </Body>
            )}
          </TextOrIconFilePreview>
        )
      )}
    </Box>
  );
};

export { FilePreview };
