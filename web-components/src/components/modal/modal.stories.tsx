import React, { useState } from 'react';
import Modal from 'web-components/lib/components/modal';
import LedgerModal from 'web-components/lib/components/modal/LedgerModal';
import Button from '@material-ui/core/Button';

export default {
  title: 'Components|Modal',
  component: Modal,
  // decorators: [withKnobs],
};

function OpenModal(): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <p>I'm a Modal</p>
      </Modal>
    </div>
  );
}

function OpenLedgerModal(): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <LedgerModal
        open={open}
        link="https://devnet.regen.aneka.io/txs/C7F4DDC696BB64605D2ACB45D5999CF3E36F2F73783E6DB5066CFB282A6E7C42"
        summary={[
          { label: 'issued by', value: 'RND' },
          { label: 'timestamp', value: 'Nov 23rd 2020 1:02:15 PM' },
          { label: '# of credits', value: '1000' },
        ]}
        txRes={{
          txResponse: {
            txhash: 'C7F4DDC696BB64605D2ACB45D5999CF3E36F2F73783E6DB5066CFB282A6E7C42',
            height: {
              low: 1234,
            },
            code: 0,
            timestamp: 'Nov 23rd 2020 1:02:15 PM',
            logs: [
              {
                events: [
                  {
                    attributes: [
                      { key: 'validator', value: 'regen:valoper1xnrrhkhyd5kp0s0ffr6z73mydlu3fau8tfvxux' },
                      { key: 'amount', value: '9000000000' },
                    ],
                    type: 'create_validator',
                  },
                ],
              },
            ],
          },
          tx: {
            body: {
              memo: 'memo',
            },
            authInfo: {
              fee: {
                amount: [
                  {
                    denom: 'TREE',
                    amount: '100',
                  },
                ],
              },
            },
          },
        }}
      />
    </div>
  );
}

export const modal = (): JSX.Element => <OpenModal />;

export const ledgerModal = (): JSX.Element => <OpenLedgerModal />;
