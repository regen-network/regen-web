import { Title } from 'web-components/src/components/typography';

export function OrderSummmaryRowHeader({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  return (
    <Title
      variant="h6"
      className={`text-grey-400 text-[11px] font-extrabold font-sans uppercase tracking-[1px] m-0 ${className}`}
    >
      {text}
    </Title>
  );
}
