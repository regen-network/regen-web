import { useEffect } from 'react';
import { Location } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSetAtom } from 'jotai';

import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import ActionCard from 'web-components/src/components/molecules/ActionCard';
import { Title } from 'web-components/src/components/typography';

import { AllBuyModalOptionsQuery } from 'generated/sanity-graphql';
import { connectWalletModalAtom } from 'lib/atoms/modals.atoms';
import { onBtnClick } from 'lib/button';
import { Track } from 'lib/tracker/types';
import { useBuyModalOptionsTracker } from 'lib/tracker/useBuyModalOptionsTracker';
import { useWallet } from 'lib/wallet/wallet';

import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';

interface Props extends RegenModalProps {
  content?: AllBuyModalOptionsQuery['allBuyModalOptions'][0];
  openModal?: (link: string) => void;
  selectedProject?: ProjectWithOrderData;
  track?: Track;
  location?: Location;
}

export const BuyModalOptions = ({
  open,
  content,
  onClose,
  openModal = () => null,
  selectedProject,
  track,
  location,
}: Props) => {
  const cards = content?.cards ?? [];
  const setConnectWalletModalAtom = useSetAtom(connectWalletModalAtom);
  const { loaded, isConnected } = useWallet();
  const { trackBuyScheduleCall, trackBuyKeplr } = useBuyModalOptionsTracker();

  useEffect(() => {
    if (loaded && isConnected && onClose) onClose();
  }, [isConnected, loaded, onClose]);

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
                  ? () => {
                      trackBuyScheduleCall({
                        track,
                        location,
                        selectedProject,
                      });
                      onBtnClick(openModal, card?.button);
                    }
                  : () => {
                      trackBuyKeplr({ track, location, selectedProject });
                      setConnectWalletModalAtom(
                        atom => void (atom.open = true),
                      );
                    },
              }}
              note={{ text: card?.noteRaw ?? '' }}
              sx={{ mb: isLast ? 0 : 5 }}
            />
          );
        })}
      </Box>
    </Modal>
  );
};
