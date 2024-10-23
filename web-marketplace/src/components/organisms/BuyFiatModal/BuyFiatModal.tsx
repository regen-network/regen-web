import { Box } from '@mui/material';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Card from 'web-components/src/components/cards/Card';
import SellOrderNotFoundIcon from 'web-components/src/components/icons/SellOrderNotFoundIcon';
import Modal from 'web-components/src/components/modal';
import { Title } from 'web-components/src/components/typography';

import { UseStateSetter } from 'types/react/use-state';

import { BuyFiatModalContent, FiatModalStateType } from './BuyFiatModal.types';

interface BuyFiatModalProps extends BuyFiatModalContent {
  fiatModalState: FiatModalStateType;
  onClose: UseStateSetter<FiatModalStateType>;
  handleClick: (action: string | null) => void;
}

export const BuyFiatModal = ({
  title,
  content,
  buttons,
  fiatModalState,
  onClose,
  handleClick,
}: BuyFiatModalProps) => {
  return (
    <Modal
      open={fiatModalState.openModal}
      onClose={() => onClose({ ...fiatModalState, openModal: false })}
      className="w-[560px] !py-40 !px-30"
    >
      <Box className="flex flex-col items-center">
        <SellOrderNotFoundIcon className="w-[100px] h-[100px]" />
        <Title variant="h4" className="text-center mt-20 px-30">
          {title}
        </Title>
        <Card className="text-left w-full py-40 px-30 my-40">{content}</Card>
        {buttons?.map((button, index) => {
          return button.type === 'outlined' ? (
            <OutlinedButton
              key={index}
              onClick={() => handleClick(button.action)}
              className={`h-[49px] ${
                buttons.find(button => button.type === 'contained')
                  ? 'w-[90%]'
                  : ''
              }`}
            >
              {button.text}
            </OutlinedButton>
          ) : (
            <ContainedButton
              size="small"
              onClick={() => handleClick(button.action)}
              key={index}
              className={`text-lg w-[90%] h-[49px] ${
                buttons.length > 1 ? 'mb-20' : ''
              }`}
            >
              {button.text}
            </ContainedButton>
          );
        })}
      </Box>
    </Modal>
  );
};
