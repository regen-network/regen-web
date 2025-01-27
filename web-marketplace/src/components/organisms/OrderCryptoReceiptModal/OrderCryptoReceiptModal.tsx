import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { USD_DENOM } from 'config/allowedBaseDenoms';

// import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Card from 'web-components/src/components/cards/Card';
// import PrintIcon from 'web-components/src/components/icons/PrintIcon';
import Modal from 'web-components/src/components/modal';
import { Title } from 'web-components/src/components/typography';

import { UseStateSetter } from 'types/react/use-state';

import { Link } from 'components/atoms/Link';
import { AmountWithCurrency } from 'components/molecules/AmountWithCurrency/AmountWithCurrency';

import {
  // ORDER_RECEIPT_BUTTON_TEXT,
  ORDER_RECEIPT_MODAL_CREDITS_RETIRED,
  ORDER_RECEIPT_MODAL_CREDITS_TRADABLE,
  ORDER_RECEIPT_MODAL_DATE,
  ORDER_RECEIPT_MODAL_HEADING,
  ORDER_RECEIPT_MODAL_PRICE,
  ORDER_RECEIPT_MODAL_PROJECT_TITLE,
} from './OrderCryptoReceiptModal.constants';
import { ReceiptSection } from './OrderCryptoReceiptModal.Section';
import {
  OrderCryptoReceiptModalContent,
  OrderCryptoReceiptModalStateType,
  ReceiptSectionData,
} from './OrderCryptoReceiptModal.types';

interface OrderCryptoReceiptModalProps extends OrderCryptoReceiptModalContent {
  onClose: UseStateSetter<OrderCryptoReceiptModalStateType>;
  open: boolean;
}

export const OrderCryptoReceiptModal = ({
  open,
  modalContent,
  onClose,
}: OrderCryptoReceiptModalProps) => {
  const { _ } = useLingui();
  const { price, project, currency, displayDenom, amount, date, txType } =
    modalContent;

  const receiptSections: ReceiptSectionData[] = [
    {
      title: _(ORDER_RECEIPT_MODAL_PRICE),
      body: (
        <AmountWithCurrency
          amount={price}
          currency={currency}
          displayDenom={displayDenom}
          classes={{
            amount: 'text-lg pb-5',
            denom: `${
              currency.askDenom === USD_DENOM ? 'mt-[7px]' : 'mt-[2px]'
            }`,
          }}
        />
      ),
    },
    {
      title: _(ORDER_RECEIPT_MODAL_PROJECT_TITLE),
      body: (
        <Link
          href={project.projectHref}
          className="text-brand-400 inline-block text-ellipsis overflow-hidden leading-[145%] text-lg font-bold"
        >
          {project.name}
        </Link>
      ),
    },
    {
      title:
        txType === 'retired'
          ? _(ORDER_RECEIPT_MODAL_CREDITS_RETIRED)
          : _(ORDER_RECEIPT_MODAL_CREDITS_TRADABLE),
      body: <p>{amount}</p>,
    },
    {
      title: _(ORDER_RECEIPT_MODAL_DATE),
      body: <p>{date}</p>,
    },
  ];

  return (
    <Modal
      open={open}
      onClose={() => onClose({ open: false, type: null })}
      className="w-[560px] !py-40 !px-30"
    >
      <Box className="flex flex-col items-center">
        <Title
          variant="h2"
          className="text-center mt-20 px-30 text-[32px] capitalize"
        >
          {_(ORDER_RECEIPT_MODAL_HEADING)}
        </Title>
        <Card className="text-left w-full py-40 px-30 my-40">
          <div className={'flex flex-col'}>
            {receiptSections.map(({ title, body }, index) => (
              <ReceiptSection key={index} title={title} body={body} />
            ))}
          </div>
        </Card>
        {/* TODO: Implement print functionality */}
        {/* <OutlinedButton onClick={() => {}}>
          <PrintIcon className={'mr-10'} />
          {_(ORDER_RECEIPT_BUTTON_TEXT)}
        </OutlinedButton> */}
      </Box>
    </Modal>
  );
};
