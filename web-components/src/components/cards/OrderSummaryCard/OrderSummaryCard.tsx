import Card from '../Card';
import { OrderSummaryContent } from './OrderSummaryCard.Content';
import { OrderSummaryImage } from './OrderSummaryCard.Image';
import { OrderSummaryProps } from './OrderSummaryCard.types';

export const OrderSummaryCard = (orderSummary: OrderSummaryProps) => {
  const {
    order,
    paymentMethod,
    currentBuyingStep,
    ariaLabels,
    editableUpdateButtonText,
    endingInText,
    headers,
    title,
    bodyTexts,
    imageAltText,
    onClickEditCard,
  } = orderSummary;
  return (
    <Card className="relative sm:w-full sm:max-w-[330px] h-[100%] py-20 sm:py-0 flex flex-2 sm:flex-col ">
      <OrderSummaryImage
        src={order.image}
        prefinanceProject={order.prefinanceProject}
        bodyTexts={bodyTexts}
        altText={imageAltText}
      />
      <OrderSummaryContent
        title={title}
        order={order}
        currentBuyingStep={currentBuyingStep}
        paymentMethod={paymentMethod}
        onClickEditCard={onClickEditCard}
        headers={headers}
        ariaLabels={ariaLabels}
        editableUpdateButtonText={editableUpdateButtonText}
        endingInText={endingInText}
      />
    </Card>
  );
};
