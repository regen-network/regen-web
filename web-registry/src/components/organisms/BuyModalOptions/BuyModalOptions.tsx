import { Box } from '@mui/material';
import { ERROR_BANNER } from 'config/contents';
import { useSetAtom } from 'jotai';

import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import ActionCard from 'web-components/lib/components/molecules/ActionCard';
import { Title } from 'web-components/lib/components/typography';

import { AllBuyModalOptionsQuery } from 'generated/sanity-graphql';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { onBtnClick } from 'lib/button';

interface Props extends RegenModalProps {
  content?: AllBuyModalOptionsQuery['allBuyModalOptions'][0];
  openModal?: (link: string) => void;
}

export const BuyModalOptions = ({
  open,
  content,
  onClose,
  openModal = () => null,
}: Props) => {
  const cards = content?.cards ?? [];
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  return (
    <Modal open={open} onClose={onClose}>
      <Title variant="h3" sx={{ mb: 7.5, textAlign: 'center' }}>
        {content?.title}
      </Title>
      <Box>
        {cards.map((card, index) => {
          const isLast = index === cards.length - 1;
          return (
            <ActionCard
              key={card?.title}
              title={card?.title ?? ''}
              description={card?.descriptionRaw}
              image={{
                src:
                  card?.image?.image?.asset?.url ??
                  card?.image?.imageHref ??
                  '',
                alt: card?.image?.imageAlt ?? '',
              }}
              button={{
                text: card?.button?.buttonText ?? '',
                onClick: card?.button?.buttonLink
                  ? () => onBtnClick(openModal, card?.button)
                  : () => setErrorBannerTextAtom(ERROR_BANNER),
              }}
              note={card?.noteRaw ?? ''}
              sx={{ mb: isLast ? 0 : 5 }}
            />
          );
        })}
      </Box>
    </Modal>
  );
};
