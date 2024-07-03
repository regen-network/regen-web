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
  colors,
  iconSize,
  className,
  previewClassName,
  children,
}: Props) => {
  return (
    <div
      className={cn(
        `flex ${
          !csv && !xls ? 'justify-center items-center' : ''
        } h-[100%] w-[100%] ${colors.text} ${colors.bg}`,
        className,
      )}
    >
      {audio ? (
        <AudioFileIcon width={iconSize} height={iconSize} />
      ) : csv || xls ? (
        <table
          className={cn(
            'whitespace-nowrap border-collapse w-[100%] h-[100%]',
            previewClassName,
          )}
        >
          {preview
            ?.split('\n')
            .map(row => row.split(','))
            .slice(0, 9)
            .map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="border border-solid border-grey-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
        </table>
      ) : json ? (
        <>
          {preview && (
            <pre
              className={cn(
                'text-grey-400 m-0 w-[100%] h-[100%] font-bold',
                previewClassName,
              )}
            >
              {JSON.stringify(JSON.parse(preview), null, 2)}
            </pre>
          )}
        </>
      ) : (
        <OtherDocumentsIcon width={iconSize} height={iconSize} />
      )}
      {children}
    </div>
  );
};
