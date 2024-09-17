import Card from 'web-components/src/components/cards/Card';

import { OrderSummaryContent } from './OrderSummaryCard.Content';
import { OrderSummaryImage } from './OrderSummaryCard.Image';
import { OrderSummaryProps } from './OrderSummaryCard.types';

export const OrderSummaryCard = (orderSummary: OrderSummaryProps) => {
  const {
    order,
    paymentMethod,
    currentBuyingStep,
    onClickEditCard,
    paymentOption,
    allowedDenoms,
  } = orderSummary;
  return (
    <Card className="relative sm:w-full sm:max-w-[330px] h-[100%] py-20 sm:py-0 flex flex-2 sm:flex-col ">
      <OrderSummaryImage
        src={order.image}
        prefinanceProject={order.prefinanceProject}
      />
      <OrderSummaryContent
        order={order}
        currentBuyingStep={currentBuyingStep}
        paymentMethod={paymentMethod}
        onClickEditCard={onClickEditCard}
        paymentOption={paymentOption}
        allowedDenoms={allowedDenoms}
      />
    </Card>
  );
};
