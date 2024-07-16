import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/es6';
import { Slide } from '@mui/material';
import { Point } from 'geojson';

import { UseStateSetter } from '../../../types/react/useState';
import { cn } from '../../../utils/styles/cn';
import { PlayButton } from '../../atoms/PlayButton/PlayButton';
import BreadcrumbIcon from '../../icons/BreadcrumbIcon';
import { Image } from '../../image';
import {
  isAudio,
  isCsv,
  isDocx,
  isImage,
  isJson,
  isPdf,
  isVideo,
  isXlsOrXlsx,
} from '../../inputs/new/FileDrop/FileDrop.utils';
import { FileBody } from './components/FileBody';
import { PdfPreview } from './components/PdfPreview';
import { TextOrIconFilePreview } from './components/TextOrIconFilePreview';
import { PostFile } from './PostFiles';
import { FilesPreviews } from './PostFiles.types';
import { getColors } from './PostFiles.utils';

type Props = {
  files: Array<PostFile>;
  selectedUrl?: string;
  setSelectedUrl: UseStateSetter<string | undefined>;
  setSelectedLocation: UseStateSetter<Point | undefined>;
  filesPreviews: FilesPreviews;
};

const PostFilesDrawer = ({
  files,
  selectedUrl,
  setSelectedUrl,
  setSelectedLocation,
  filesPreviews,
}: Props) => {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const index = files.findIndex(file => file.url === selectedUrl);
    ref.current?.children[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [files, selectedUrl]);

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className={cn(
          open ? 'right-[170px]' : 'right-20',
          'flex items-center justify-center cursor-pointer absolute top-20 h-30 w-30 bg-grey-0 rounded-[5px]',
        )}
      >
        <BreadcrumbIcon
          className="text-grey-400 h-20 w-20"
          direction={open ? 'next' : 'prev'}
        />
      </div>

      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <div
          ref={ref}
          className="bg-grey-0 overflow-y-auto border-solid border-0 border-t border-l border-r border-grey-200 absolute top-0 right-0 w-[150px] h-[100%] z-10"
        >
          {files.map(file => {
            const { mimeType, url } = file;
            const image = isImage(mimeType);
            const video = isVideo(mimeType);
            const audio = isAudio(mimeType);
            const csv = isCsv(mimeType);
            const json = isJson(mimeType);
            const xls = isXlsOrXlsx(mimeType);
            const docx = isDocx(mimeType);
            const colors = getColors(audio, csv, xls, json, docx);

            const preview = url ? filesPreviews[url] : undefined;

            return (
              <div
                className={cn(
                  selectedUrl === file.url ? 'bg-grey-200' : 'bg-grey-0',
                  'border-solid border-0 border-b border-grey-200 p-10 cursor-pointer',
                )}
                key={file.url}
                onClick={() => {
                  setSelectedLocation(file.location);
                  setSelectedUrl(file.url);
                }}
              >
                {image || video ? (
                  <>
                    {image && url && (
                      <Image
                        className="rounded-sm w-[100%]"
                        src={url}
                        alt={file.name}
                      />
                    )}
                    {video && (
                      <div className="relative">
                        <ReactPlayer
                          className="rounded-sm overflow-hidden"
                          url={url}
                          width="100%"
                          height="100%"
                        />
                        <PlayButton className="w-[28px] h-[28px]" />
                      </div>
                    )}
                    <FileBody file={file} />
                  </>
                ) : (
                  <>
                    {isPdf(mimeType) ? (
                      <div className="h-[70px] overflow-hidden bg-grey-300 mb-10">
                        <PdfPreview file={url} pageHeight={70} />
                      </div>
                    ) : (
                      <TextOrIconFilePreview
                        className={`overflow-hidden h-[70px] mb-10 rounded-sm border-solid ${
                          csv || xls ? 'border-0 border-b border-r' : 'border'
                        } ${colors.border}`}
                        previewClassName="text-[6px] leading-[8px]"
                        preview={preview}
                        audio={audio}
                        csv={csv}
                        xls={xls}
                        json={json}
                        docx={docx}
                        colors={colors}
                        iconSize="40"
                      />
                    )}
                    <FileBody file={file} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Slide>
    </>
  );
};

export { PostFilesDrawer };
