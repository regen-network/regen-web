import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { pdfjs } from 'react-pdf';
import { CircularProgress } from '@mui/material';
import { debounce } from 'lodash';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const Document = lazy(() => import('../lib/Document'));
const Page = lazy(() => import('../lib/Page'));

type Props = {
  file?: string;
  pageHeight?: number;
  className?: string;
};

export const PdfPreview = ({ file, pageHeight, className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(
    undefined,
  );
  const [pdfHeight, setPdfHeight] = useState<number | undefined>(undefined);
  const [pdfWidth, setPdfWidth] = useState<number | undefined>(undefined);

  const updatePdfDimensions = useCallback(() => {
    if (containerRef.current) {
      const currentContainerWidth = containerRef.current.clientWidth;
      const currentContainerHeight = containerRef.current.clientHeight;
      setContainerWidth(currentContainerWidth);

      if (canvasRef.current) {
        const currentCanvasHeight =
          canvasRef.current.getBoundingClientRect().height;
        const currentCanvasWidth =
          canvasRef.current.getBoundingClientRect().width;

        if (currentCanvasHeight && currentContainerWidth) {
          if (currentCanvasHeight > currentCanvasWidth) {
            setPdfHeight(pageHeight || currentContainerHeight);
            setPdfWidth(undefined);
          } else {
            setPdfWidth(currentContainerWidth);
            setPdfHeight(undefined);
          }
        }
      }
    }
  }, [pageHeight]);

  // Debounced updatePdfDimensions function
  const debouncedUpdateDimensions = useCallback(() => {
    const debouncedFn = debounce(updatePdfDimensions, 100);
    debouncedFn();
  }, [updatePdfDimensions]);

  useEffect(() => {
    // Update on resize
    window.addEventListener('resize', debouncedUpdateDimensions);
    return () =>
      window.removeEventListener('resize', debouncedUpdateDimensions);
  }, [debouncedUpdateDimensions]);

  return (
    <div
      ref={containerRef}
      className="max-w-full flex flex-col justify-center align-middle h-full"
    >
      <Suspense fallback={<CircularProgress color="secondary" />}>
        <Document
          className={className}
          file={file}
          loading={
            <div className="flex justify-center items-center h-full">
              <CircularProgress color="secondary" />
            </div>
          }
        >
          <div className="flex justify-center items-center h-full">
            <Page
              pageNumber={1}
              width={pdfWidth}
              height={pdfHeight}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              canvasRef={canvasRef}
              onLoadSuccess={updatePdfDimensions}
              _className={`${
                containerWidth ? `inline-block` : ''
              } !bg-transparent`}
            />
          </div>
        </Document>
      </Suspense>
    </div>
  );
};
