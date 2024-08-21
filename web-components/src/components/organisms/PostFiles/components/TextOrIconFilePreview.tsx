import { useEffect, useRef, useState } from 'react';
import ReactHtmlParser from 'html-react-parser';

import { cn } from '../../../../utils/styles/cn';
import { AudioFileIcon } from '../../../icons/AudioFileIcon';
import { OtherDocumentsIcon } from '../../../icons/OtherDocumentsIcon';
import { getColors } from '../PostFiles.utils';

type Props = React.PropsWithChildren<{
  preview?: string;
  audio: boolean;
  csv: boolean;
  xls: boolean;
  json: boolean;
  docx: boolean;
  className?: string;
  previewClassName?: string;
  colors: ReturnType<typeof getColors>;
  iconSize: string;
}>;

export const TextOrIconFilePreview = ({
  preview,
  audio,
  csv,
  xls,
  json,
  docx,
  colors,
  iconSize,
  className,
  previewClassName,
  children,
}: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [childWidth, setChildWidth] = useState('100%');

  useEffect(() => {
    if (parentRef.current) {
      const parentWidth = parentRef.current.offsetWidth;
      setChildWidth(`${parentWidth}px`);
    }
  }, []);

  return (
    <div
      ref={parentRef}
      className={cn(
        `flex ${
          !csv && !xls && !docx ? 'justify-center items-center' : ''
        } h-full w-full overflow-hidden ${colors.text} ${colors.bg}`,
        className,
      )}
    >
      {audio ? (
        <AudioFileIcon width={iconSize} height={iconSize} />
      ) : preview ? (
        csv || xls ? (
          <div
            className="max-w-full h-full overflow-hidden"
            style={{
              width: childWidth,
            }}
          >
            <table
              className={cn(
                'whitespace-nowrap border-collapse w-full h-full',
                previewClassName,
              )}
            >
              {preview
                .split('\n')
                .map(row => row.split(','))
                .slice(0, 9)
                .map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="border border-solid border-grey-300"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
            </table>
          </div>
        ) : json ? (
          <div
            className="max-w-full"
            style={{
              width: childWidth,
            }}
          >
            <pre
              className={cn(
                'text-grey-400 m-0 w-full h-full font-bold',
                previewClassName,
              )}
            >
              {JSON.stringify(JSON.parse(preview), null, 2)}
            </pre>
          </div>
        ) : docx ? (
          <div className={previewClassName}>{ReactHtmlParser(preview)}</div>
        ) : (
          <OtherDocumentsIcon width={iconSize} height={iconSize} />
        )
      ) : (
        <OtherDocumentsIcon width={iconSize} height={iconSize} />
      )}
      {children}
    </div>
  );
};
