import { Title } from 'web-components/src/components/typography';

import { ReceiptSectionData as ReceiptSectionProps } from './OrderCryptoReceiptModal.types';

export const ReceiptSection = ({ title, body }: ReceiptSectionProps) => (
  <section className="mb-20">
    <Title
      variant="h3"
      className={
        'text-[14px] font-extrabold uppercase tracking-[1px] mb-[10px]'
      }
    >
      {title}
    </Title>
    {body}
  </section>
);
