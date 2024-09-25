import { OrderBlockchainDetails } from './Order.BlockchainDetails';
import { OrderCredits } from './Order.Credits';
import { OrderPaymentInfo } from './Order.PaymentInfo';
import { OrderRetirementInfo } from './Order.RetirementInfo';
import { OrderSummarySectionProps } from './Order.types';

interface OrderSummaryProps {
  retirementInfo: OrderSummarySectionProps;
  blockchainDetails: OrderSummarySectionProps;
  credits: OrderSummarySectionProps;
  paymentInfo: OrderSummarySectionProps;
}

export const OrderSummary = ({
  credits,
  retirementInfo,
  blockchainDetails,
  paymentInfo,
}: OrderSummaryProps) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-30">
      <OrderCredits {...credits} />
      <OrderRetirementInfo {...retirementInfo} />
      <OrderPaymentInfo {...paymentInfo} />
      <OrderBlockchainDetails {...blockchainDetails} />
    </main>
  );
};
