import { Box } from '@mui/material';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Card from 'web-components/src/components/cards/Card';
import SellOrderNotFoundIcon from 'web-components/src/components/icons/SellOrderNotFoundIcon';
import Modal from 'web-components/src/components/modal';
import { Title } from 'web-components/src/components/typography';

import { UseStateSetter } from 'types/react/use-state';

import { UserCanPurchaseCreditsType } from './BuyFiatModal.types';

interface BuyFiatModalProps {
  title: string;
  content: React.ReactNode;
  button: { text: string; href: string | null };
  userCanPurchaseCredits: UserCanPurchaseCreditsType;
  onClose: UseStateSetter<UserCanPurchaseCreditsType>;
  handleClick: () => void;
}

export const BuyFiatModal = ({
  title,
  content,
  button,
  userCanPurchaseCredits,
  onClose,
  handleClick,
}: BuyFiatModalProps) => {
  return (
    <Modal
      open={userCanPurchaseCredits.openModal}
      onClose={() => onClose({ ...userCanPurchaseCredits, openModal: false })}
      className="w-[560px] !py-40 !px-30"
    >
      <Box className="flex flex-col items-center">
        <SellOrderNotFoundIcon className="w-[100px] h-[100px]" />
        <Title variant="h4" className="text-center mt-20 px-30">
          {title}
        </Title>
        <Card className="text-left w-full py-40 px-30 my-40">{content}</Card>
        <OutlinedButton onClick={handleClick}>{button.text}</OutlinedButton>
      </Box>
    </Modal>
  );
};
