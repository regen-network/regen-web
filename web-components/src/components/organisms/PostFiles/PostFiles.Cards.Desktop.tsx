import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { pdfjs } from 'react-pdf';
import ReactPlayer from 'react-player/es6';
import Slider from 'react-slick';
import { Box, CircularProgress } from '@mui/material';

import { UseStateSetter } from '../../../types/react/useState';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import { AudioFileIcon } from '../../icons/AudioFileIcon';
import CloseIcon from '../../icons/CloseIcon';
import { OpenInNewIcon } from '../../icons/OpenInNewIcon';
import { OtherDocumentsIcon } from '../../icons/OtherDocumentsIcon';
import { SpreadsheetFileIcon } from '../../icons/SpreadsheetFileIcon';
import {
  isAudio,
  isImage,
  isPdf,
  isSpreadSheet,
  isVideo,
} from '../../inputs/new/FileDrop/FileDrop.utils';
import { Body } from '../../typography';
import { PostFile } from './PostFiles';
import { getIconForFiles } from './PostFiles.utils';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const Document = lazy(() => import('./lib/Document'));
const Page = lazy(() => import('./lib/Page'));

type Props = {
  files: Array<PostFile>;
  onClose: () => void;
  setSelectedUrl: UseStateSetter<string | undefined>;
  selectedUrl?: string;
};

const PostFilesCards = ({
  files,
  onClose,
  setSelectedUrl,
  selectedUrl,
}: Props) => {
  const initialSlide = files.findIndex(file => file.url === selectedUrl);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSlide);

  const settings = {
    initialSlide: selectedIndex,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (currentSlide: number) => {
      if (selectedIndex !== currentSlide) setSelectedIndex(currentSlide);
      setSelectedUrl(files[currentSlide].url);
    },
  };

  const slider = useRef<Slider>(null);

  useEffect(() => {
    if (initialSlide !== selectedIndex) {
      slider.current?.slickGoTo(initialSlide, true);
      setSelectedIndex(initialSlide);
    }
  }, [initialSlide, selectedIndex]);

  const slickPrev = useCallback(() => {
    slider.current?.slickPrev();
  }, [slider]);

  const slickNext = useCallback(() => {
    slider.current?.slickNext();
  }, [slider]);

  return (
    <div className="group">
      <Slider
        {...settings}
        ref={slider}
        className="w-[301px] h-[202px] rounded-[10px] border-[3px] border-solid border-grey-0 overflow-hidden"
      >
        {files.map(file => {
          const { mimeType, url } = file;
          const image = isImage(mimeType);
          const video = isVideo(mimeType);
          return (
            <Box
              key={file.url}
              sx={theme => ({
                position: 'relative',
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 62.39%, rgba(0, 0, 0, 0.70) 100%), ${
                  image ? `url(${url})` : `${theme.palette.grey[100]}`
                }`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                outline: 'none',
                height: '196px',
                backgroundColor:
                  image || video ? 'primary.contrastText' : undefined,
              })}
            >
              {video ? (
                <ReactPlayer url={url} width="100%" height="100%" controls />
              ) : isPdf(mimeType) ? (
                <Suspense fallback={<CircularProgress color="secondary" />}>
                  <Document
                    className="px-[65px]"
                    file={url}
                    loading={<CircularProgress color="secondary" />}
                  >
                    <Page height={196} pageNumber={1} />
                  </Document>
                </Suspense>
              ) : (
                !isImage(mimeType) && (
                  <div className="flex items-center justify-center h-[100%] text-grey-400">
                    {isAudio(mimeType) ? (
                      <AudioFileIcon width="50" height="50" />
                    ) : isSpreadSheet(mimeType) ? (
                      <SpreadsheetFileIcon width="50" height="50" />
                    ) : (
                      <OtherDocumentsIcon width="50" height="50" />
                    )}
                    <Body
                      className="absolute left-[13px] bottom-[13px] text-grey-0 font-bold"
                      size="xs"
                    >
                      {file.name}
                    </Body>
                  </div>
                )
              )}
            </Box>
          );
        })}
      </Slider>
      {files.length > 1 && (
        <div
          onClick={slickNext}
          className="hidden group-hover:block cursor-pointer absolute top-[50%] -translate-y-[50%] right-[25px]"
        >
          <ArrowDownIcon
            direction="next"
            className="h-30 w-30 rounded-[50%] bg-grey-0 p-3"
          />
        </div>
      )}
      {files.length > 1 && (
        <div
          onClick={slickPrev}
          className="hidden group-hover:block cursor-pointer absolute top-[50%] -translate-y-[50%] left-[25px]"
        >
          <ArrowDownIcon
            direction="prev"
            className="h-30 w-30 rounded-[50%] bg-grey-0 p-3"
          />
        </div>
      )}
      <div className="sm:hidden">
        <div className="sm:w-[301px] sm:h-[202px] rounded-10 border-3 border-solid border-grey-0"></div>
      </div>
      <div
        onClick={onClose}
        className="cursor-pointer absolute top-[13px] right-[13px]"
      >
        <CloseIcon className="h-[24px] w-[24px] rounded-[50%] text-grey-0 bg-grey-700/[.6] p-3" />
      </div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={selectedUrl}
        className="outline-none cursor-pointer absolute top-[13px] right-[47px]"
      >
        <OpenInNewIcon className="h-[24px] w-[24px] rounded-[50%] text-grey-0 bg-grey-700/[.6] p-3" />
      </a>
      {files.length > 1 && (
        <div className="flex items-center absolute bottom-10 right-[13px]">
          <Body className="text-grey-0 font-semibold pr-5" size="xs">
            {`${selectedIndex + 1} / ${files.length}`}
          </Body>
          <div className="text-grey-0 right-[13px]">
            {getIconForFiles(files)}
          </div>
        </div>
      )}
    </div>
  );
};

export { PostFilesCards };
