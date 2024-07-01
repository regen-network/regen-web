import { lazy, Suspense, useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import ReactPlayer from 'react-player/es6';
import { Box, CircularProgress } from '@mui/material';

import { srcToFile } from 'src/components/image-crop/canvas-utils';

import { PlayButton } from '../../../atoms/PlayButton/PlayButton';
import { AudioFileIcon } from '../../../icons/AudioFileIcon';
import { OtherDocumentsIcon } from '../../../icons/OtherDocumentsIcon';
import { SpreadsheetFileIcon } from '../../../icons/SpreadsheetFileIcon';
import {
  isAudio,
  isImage,
  isJson,
  isPdf,
  isSpreadSheet,
  isVideo,
  toText,
} from '../../../inputs/new/FileDrop/FileDrop.utils';
import { Body } from '../../../typography';
import { PostFile } from '../PostFiles';
import { getColors } from '../PostFiles.utils';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const Document = lazy(() => import('../lib/Document'));
const Page = lazy(() => import('../lib/Page'));

type Props = {
  file: PostFile;
  className?: string;
  pdfPageHeight: number;
  showName?: boolean;
};

const FilePreview = ({ file, className, pdfPageHeight, showName }: Props) => {
  const { mimeType, url } = file;
  const image = isImage(mimeType);
  const video = isVideo(mimeType);
  const audio = isAudio(mimeType);
  const spreadsheet = isSpreadSheet(mimeType);
  const json = isJson(mimeType);
  const colors = getColors(audio, spreadsheet);
  const [preview, setPreview] = useState<string | undefined>();

  useEffect(() => {
    async function parseFile() {
      if ((spreadsheet || json) && file.url && file.name) {
        const fileData = await srcToFile(file.url, file.name, file.mimeType);
        const text = (await toText(fileData)) as string;
        console.log(text);
        setPreview(text);
        // const rows = base64.split('\n').map(row => row.split(','));
      }
    }
    parseFile();
  }, [file.mimeType, file.name, file.url, json, spreadsheet]);
  return (
    <Box
      className={className}
      sx={theme => ({
        position: 'relative',
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 62.39%, rgba(0, 0, 0, 0.70) 100%), ${
          image ? `url(${url})` : `${theme.palette.grey[100]}`
        }`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        outline: 'none',
        backgroundColor: image || video ? 'primary.contrastText' : undefined,
      })}
    >
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
        <Suspense fallback={<CircularProgress color="secondary" />}>
          <Document
            className="px-[65px] h-[100%]"
            file={url}
            loading={<CircularProgress color="secondary" />}
          >
            <Page height={pdfPageHeight} pageNumber={1} />
          </Document>
        </Suspense>
      ) : json ? (
        <pre className="m-0">{preview}</pre>
      ) : (
        !isImage(mimeType) && (
          <div
            className={`flex items-center justify-center h-[100%] w-[100%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_62.39%,rgba(0,0,0,0.80)_100%)] ${colors.text} ${colors.bg}`}
          >
            {audio ? (
              <AudioFileIcon width="50" height="50" />
            ) : spreadsheet ? (
              <table>
                {preview
                  ?.split('\n')
                  .map(row => row.split(','))
                  .slice(0, 9)
                  .map((row, i) => (
                    <tr key={i}>
                      {row.map(cell => (
                        <td>{cell}</td>
                      ))}
                    </tr>
                  ))}
              </table>
            ) : (
              // <SpreadsheetFileIcon width="50" height="50" />
              <OtherDocumentsIcon width="50" height="50" />
            )}
            {showName && (
              <Body
                className="absolute left-[13px] bottom-[13px] text-grey-0 font-bold"
                size="xs"
              >
                {file.name}
              </Body>
            )}
          </div>
        )
      )}
    </Box>
  );
};

export { FilePreview };
