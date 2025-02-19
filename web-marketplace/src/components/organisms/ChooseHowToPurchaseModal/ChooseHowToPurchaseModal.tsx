import { useNavigate } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useSetAtom } from 'jotai';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Card from 'web-components/src/components/cards/Card';
import Modal from 'web-components/src/components/modal';
import {
  Body,
  Subtitle,
  Title,
} from 'web-components/src/components/typography';
import { RegenModalPropsWithOnClose } from 'web-components/src/types/shared/modalPropsWithOnClose';

import { buyFromProjectIdAtom } from 'pages/BuyCredits/BuyCredits.atoms';
import {
  BUYINGS_OPTIONS_FILTERS_PARAM,
  CREDIT_CARD_BUYING_OPTION_ID,
} from 'pages/Projects/Projects.constants';
import { Link } from 'components/atoms';
import { LoginButton } from 'components/organisms/LoginButton/LoginButton';

import {
  CARD_BUTTON,
  CARD_SUBTITLE,
  CRYPTO_BUTTON,
  CRYPTO_SUBTITLE,
  TITLE,
} from './ChooseHowToPurchaseModal.constants';

export type ChooseHowToPurchaseModalProps = {
  projectId: string;
} & RegenModalPropsWithOnClose;

export const ChooseHowToPurchaseModal = ({
  open,
  onClose,
  projectId,
}: ChooseHowToPurchaseModalProps) => {
  const { _ } = useLingui();
  const setBuyFromProjectIdAtom = useSetAtom(buyFromProjectIdAtom);
  const navigate = useNavigate();

  return (
    <Modal open={open} onClose={onClose} className="!py-50 !px-20 sm:!px-30">
      <Title className="text-center pb-50" variant="h4">
        {_(TITLE)}
      </Title>
      <Card className="p-30 flex flex-col md:flex-row">
        <div>
          <Subtitle size="xl">{_(CRYPTO_SUBTITLE)}</Subtitle>
          <Subtitle className="italic py-[7px]" size="sm">
            {_(CARD_SUBTITLE)}
          </Subtitle>
          <Body>
            <Trans>
              Buying with crypto requires a{' '}
              <Link href={'TODO'}>Keplr wallet</Link>.
            </Trans>
          </Body>
          <LoginButton
            className="!flex-row pt-20 pb-[9px] w-full"
            onlyWallets
            containedButton
            onClick={() => setBuyFromProjectIdAtom(projectId)}
            buttonLabel={_(CRYPTO_BUTTON)}
            buttonClassName="w-full text-xs"
          />

          <OutlinedButton
            className="w-full text-xs"
            size="small"
            onClick={() => {
              onClose();
              navigate(
                `/projects/1?${BUYINGS_OPTIONS_FILTERS_PARAM}=${CREDIT_CARD_BUYING_OPTION_ID}`,
                {},
              );
            }}
          >
            {_(CARD_BUTTON)}
          </OutlinedButton>
        </div>
        <div className="self-end -mt-50 md:mt-0 md:-ml-30">
          <img src="/svg/keplr-wallet.svg" />
        </div>
      </Card>
    </Modal>
  );
};
