import { lazy, Suspense, useState } from 'react';
import ReactPlayer from 'react-player/es6';
import { CircularProgress, Slide } from '@mui/material';
import { Point } from 'geojson';

import { UseStateSetter } from '../../../types/react/useState';
import { cn } from '../../../utils/styles/cn';
import { AudioFileIcon } from '../../icons/AudioFileIcon';
import BreadcrumbIcon from '../../icons/BreadcrumbIcon';
import { OtherDocumentsIcon } from '../../icons/OtherDocumentsIcon';
import { SpreadsheetFileIcon } from '../../icons/SpreadsheetFileIcon';
import { Image } from '../../image';
import {
  isAudio,
  isImage,
  isPdf,
  isSpreadSheet,
  isVideo,
} from '../../inputs/new/FileDrop/FileDrop.utils';
import ReadMore from '../../read-more';
import { Body } from '../../typography';
import { PostFile } from './PostFiles';

const Document = lazy(() => import('./lib/Document'));
const Page = lazy(() => import('./lib/Page'));

type Props = {
  files: Array<PostFile>;
  selectedUrl?: string;
  setSelectedUrl: UseStateSetter<string | undefined>;
  setSelectedLocation: UseStateSetter<Point | undefined>;
};

const PostFilesDrawer = ({
  files,
  selectedUrl,
  setSelectedUrl,
  setSelectedLocation,
}: Props) => {
  const [open, setOpen] = useState(true);

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
          direction={open ? 'prev' : 'next'}
        />
      </div>

      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <div className="overflow-y-auto border-solid border-0 border-t border-l border-r border-grey-200 absolute top-0 right-0 w-[150px] h-[100%]">
          {files.map(file => {
            const { mimeType, url, name, description } = file;
            const image = isImage(mimeType);
            const video = isVideo(mimeType);
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
                    {image && (
                      <Image
                        className="rounded-sm w-[100%]"
                        src={url}
                        alt={file.name}
                      />
                    )}
                    {video && (
                      <ReactPlayer
                        className="rounded-sm overflow-hidden"
                        url={url}
                        width="100%"
                        height="100%"
                      />
                    )}
                    {description && (
                      <ReadMore
                        maxLength={50}
                        restMinLength={10}
                        sentenceBased={false}
                        size="xs"
                        component="span"
                        classes={{
                          root: 'mb-0',
                          button: 'text-xs',
                          textContainer: 'p-0',
                        }}
                      >
                        {description}
                      </ReadMore>
                    )}
                  </>
                ) : (
                  <>
                    {isPdf(mimeType) ? (
                      <div className="h-[70px] overflow-hidden bg-grey-300 mb-10">
                        <Suspense
                          fallback={<CircularProgress color="secondary" />}
                        >
                          <Document
                            className="px-30"
                            file={url}
                            loading={<CircularProgress color="secondary" />}
                          >
                            <Page height={70} pageNumber={1} />
                          </Document>
                        </Suspense>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-[70px] mb-10 rounded-sm border-solid border border-blue-400 text-blue-400 bg-blue-50">
                        {isAudio(mimeType) ? (
                          <AudioFileIcon width="40" height="40" />
                        ) : isSpreadSheet(mimeType) ? (
                          <SpreadsheetFileIcon width="40" height="40" />
                        ) : (
                          <OtherDocumentsIcon width="40" height="40" />
                        )}{' '}
                      </div>
                    )}
                    <Body
                      component="span"
                      size="xs"
                      className="text-grey-600 font-bold"
                    >
                      {name}
                    </Body>
                    {description && (
                      <ReadMore
                        maxLength={50}
                        restMinLength={10}
                        sentenceBased={false}
                        size="xs"
                        component="span"
                        classes={{
                          root: 'mb-0',
                          button: 'text-xs',
                          textContainer: 'p-0',
                        }}
                      >
                        {description}
                      </ReadMore>
                    )}
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
