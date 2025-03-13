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
    allowedDenoms,
    setCreditsAmount,
    creditsAvailable,
    onInvalidCredits,
    userBalance,
  } = orderSummary;
  return (
    <Card className="relative w-full max-w-[560px] lg:max-w-[330px] h-[100%] pb-[15px] sm:pb-[30px] pt-20 sm:pt-0 flex flex-2 sm:flex-col border-grey-300">
      <OrderSummaryImage
        src={order.image}
        prefinanceProject={order.prefinanceProject}
        altText={imageAltText}
      />
      <OrderSummaryContent
        order={order}
        cardDetails={cardDetails}
        onClickEditCard={onClickEditCard}
        allowedDenoms={allowedDenoms}
        setCreditsAmount={setCreditsAmount}
        creditsAvailable={creditsAvailable}
        onInvalidCredits={onInvalidCredits}
        userBalance={userBalance}
      />
    </Card>
  );
};
