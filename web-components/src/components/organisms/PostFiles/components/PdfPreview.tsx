import { lazy, Suspense } from 'react';
import { pdfjs } from 'react-pdf';
import { CircularProgress } from '@mui/material';

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
  return (
    <Suspense fallback={<CircularProgress color="secondary" />}>
      <Document
        className={className}
        file={file}
        loading={<CircularProgress color="secondary" />}
      >
        <Page height={pageHeight} pageNumber={1} />
      </Document>
    </Suspense>
  );
};
