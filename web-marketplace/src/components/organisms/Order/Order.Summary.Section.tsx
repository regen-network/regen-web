import { Title } from 'web-components/src/components/typography';

import { OrderDetailsIcon } from './Order.Icon';

interface OrderSummaryProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export const OrderSummarySection = ({
  icon,
  title,
  children,
}: OrderSummaryProps) => {
  return (
    <section className="flex gap-20">
      <OrderDetailsIcon icon={icon} />
      <div className="w-full">
        <Title
          variant="h5"
          className="text-xs text-grey-600 uppercase font-extrabold mb-15 tracking-[1px]"
        >
          {title}
        </Title>
        {children}
      </div>
    </section>
  );
};
