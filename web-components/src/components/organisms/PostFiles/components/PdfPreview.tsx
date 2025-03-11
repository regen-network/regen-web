import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
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

  /**
   * Updates the dimensions of the PDF based on container and canvas dimensions.
   *
   * This function adjusts the PDF display size by:
   * 1. Getting current container (PDF wrapper) width and height from containerRef
   * 2. Getting current canvas (PDF) dimensions from canvasRef if available
   * 3. Setting PDF dimensions based on aspect ratio (check whether PDF is portrait or landscape):
   *    - For portrait orientation (height > width): sets height and clears width
   *    - For landscape orientation: sets width to container width and clears height
   *
   * @returns {void}
   * @depends containerRef - React ref for the container element
   * @depends canvasRef - React ref for the canvas element
   * @depends pageHeight - Height of PDF page
   */
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
  const debouncedUpdateDimensions = useMemo(
    () => debounce(updatePdfDimensions, 100),
    [updatePdfDimensions],
  );

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
