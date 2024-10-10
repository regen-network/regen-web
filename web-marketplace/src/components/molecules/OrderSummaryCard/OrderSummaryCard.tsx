import Card from 'web-components/src/components/cards/Card';

import { OrderSummaryContent } from './OrderSummaryCard.Content';
import { OrderSummaryImage } from './OrderSummaryCard.Image';
import { OrderSummaryProps } from './OrderSummaryCard.types';

export const OrderSummaryCard = (orderSummary: OrderSummaryProps) => {
  const {
    order,
    cardDetails,
    imageAltText,
    onClickEditCard,
    paymentOption,
    allowedDenoms,
    setCreditsAmount,
    creditsAvailable,
    onInvalidCredits,
  } = orderSummary;
  return (
    <Card className="relative w-full max-w-[560px] lg:max-w-[330px] h-[100%] py-20 sm:py-0 flex flex-2 sm:flex-col border-grey-300">
      <OrderSummaryImage
        src={order.image}
        prefinanceProject={order.prefinanceProject}
        altText={imageAltText}
      />
      <OrderSummaryContent
        order={order}
        cardDetails={cardDetails}
        onClickEditCard={onClickEditCard}
        paymentOption={paymentOption}
        allowedDenoms={allowedDenoms}
        setCreditsAmount={setCreditsAmount}
        creditsAvailable={creditsAvailable}
        onInvalidCredits={onInvalidCredits}
      />
    </Card>
  );
};
