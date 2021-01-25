import React, { useState } from 'react';
import Modal from 'web-components/lib/components/modal';
import IssuanceModal from 'web-components/lib/components/modal/IssuanceModal';
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
      <IssuanceModal
        open={open}
        onClose={() => setOpen(false)}
        link="https://devnet.regen.aneka.io/txs/C7F4DDC696BB64605D2ACB45D5999CF3E36F2F73783E6DB5066CFB282A6E7C42"
        issuer={{
          name: 'Regen Network Development, Inc.',
          role: 'CTO',
          individual: 'Christian Shearer',
          address: 'regen:1p6syuqk3e5a8hwp8e20jyjwr8p7nj270x4spqm',
          location: 'Great Barrington, Massachussetts, United States',
          description:
            'Regen Network realigns the agricultural economy with ecological health by creating the global marketplace for planetary stewardship.',
        }}
        issuees={[
          {
            name: 'Wyelba Pty Ltd',
            role: 'Director',
            individual: 'Eric Lawrence',
            address: 'regen:1wuufq6vkl4qmmgzs06mtgatklpxr5zr4qqnk4k',
            location: 'New South Wales, Australia',
            description: 'Lorem ipsum',
          },
        ]}
        timestamp={new Date('2020-12-16 09:23:41.904137+00')}
        numberOfCredits={28682}
        creditUnit="1 ton of CO2e"
        vintageId={{
          name: 'certificate',
          info: '634aabf4',
          link: 'https://regen-registry.s3.amazonaws.com/projects/wilmot/wilmot-certificate-121620.pdf',
        }}
        vintagePeriod="2017-2019"
        monitoringPeriods={[
          {
            name: 'monitoring report',
            info: '2017-2018',
            link: 'https://regen-registry.s3.amazonaws.com/projects/wilmot/Wilmot+Monitoring+Report+2018.pdf',
          },
          {
            name: 'monitoring report',
            info: '2018-2019',
            link: 'https://regen-registry.s3.amazonaws.com/projects/wilmot/Wilmot+Monitoring+Report+2019.pdf',
          },
        ]}
        projectName="Wilmot"
        standardId={{
          name: 'RND_PG',
          version: 'v1.0',
        }}
        creditClass={{
          name: 'CarbonPlus Grasslands',
          version: 'v0.9',
        }}
        creditClassHandle="RND_CC_0001"
        methodology={{
          name: 'CarbonPlus Grasslands',
          version: 'v0.9',
        }}
        methodologyHandle="RND_M0001"
        txRes={{
          txResponse: {
            txhash: 'C7F4DDC696BB64605D2ACB45D5999CF3E36F2F73783E6DB5066CFB282A6E7C42',
            // @ts-ignore
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
                log: '',
                msgIndex: 0,
              },
            ],
          },
          tx: {
            // @ts-ignore
            body: {
              memo: 'memo',
            },
            authInfo: {
              // @ts-ignore
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
