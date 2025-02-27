import { Title } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

export const OrderSummaryRow = ({
  title,
  value,
  className = '',
  clampDescription = true,
  titleClassName = '',
}: {
  title: string | JSX.Element;
  value: string | boolean | null | JSX.Element;
  className?: string;
  clampDescription?: boolean;
  titleClassName?: string;
}) => {
  return (
    <div className={cn('grid grid-cols-[110px_auto] mb-5 sm:mb-10', className)}>
      <Title
        variant="h6"
        className={cn(
          'text-grey-400 text-[11px] font-extrabold uppercase tracking-[1px] mt-[3px]',
          titleClassName,
        )}
      >
        {title}
      </Title>
      <div
        className={cn(
          'text-grey-700 m-0 ml-5 p-0 text-sm',
          clampDescription ? 'line-clamp-2' : '',
        )}
      >
        {value}
      </div>
    </div>
  );
};
