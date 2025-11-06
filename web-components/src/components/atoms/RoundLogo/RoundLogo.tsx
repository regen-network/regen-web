import { RoundLogoItemType } from '../../molecules/RoundLogoItemsList/RoundLogoItemsList.types';
import { cn } from '../../../utils/styles/cn';
type Props = Pick<RoundLogoItemType, 'image'> & { className: string };

const RoundLogo = ({ image, className }: Props): JSX.Element => {
  return (
    <div
      className={cn(
        '[&>*]:h-[58px] [&>*]:w-[58px] [&>*]:rounded-[58px] [&>*]:border [&>*]:border-solid [&>*]:border-grey-300 [&>*]:bg-grey-0 [&>*]:p-[4px]',
        className,
      )}
    >
      {image}
    </div>
  );
};

export { RoundLogo };
