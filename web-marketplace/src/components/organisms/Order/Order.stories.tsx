import { Meta, StoryObj } from '@storybook/react';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';
import { Order } from 'web-marketplace/src/components/organisms/Order/Order';
import { ORDER_STATUS } from 'web-marketplace/src/components/organisms/Order/Order.constants';

import {
  blockchainDetails,
  credits,
  paymentInfo,
  retirementInfo,
} from './Order.mock';

const args = {
  project: {
    name: 'Project Name',
    date: 'Dec 15, 2024',
    placeName: 'Cabo Vírgenes, Argentina',
    area: 50.4,
    areaUnit: 'hectares',
    imageSrc: 'coorong.png',
    prefinance: false,
  },
  order: {
    status: ORDER_STATUS.delivered,
    cardData: '**** **** **** 1234',
    retirementInfo,
    blockchainDetails,
    credits,
    paymentInfo,
  },
};

export default {
  title: 'Marketplace/Organisms/Order',
  component: Order,
} as Meta<typeof Order>;

type Story = StoryObj<typeof Order>;

export const Default: Story = {
  render: args => (
    <div className="max-w-[800px]">
      <Order {...args} />
    </div>
  ),
};

Default.args = {
  ...args,
  project: {
    ...args.project,
    prefinance: false,
  },
};

export const Crypto: Story = {
  render: args => (
    <div className="max-w-[800px]">
      <Order {...args} />
    </div>
  ),
};

Crypto.args = {
  ...args,
  project: {
    ...args.project,
    prefinance: false,
  },
  order: {
    ...args.order,
    credits: {
      ...args.order.credits,
      askDenom: REGEN_DENOM,
      askBaseDenom: REGEN_DENOM,
    },
    paymentInfo: {
      ...args.order.paymentInfo,
      askDenom: REGEN_DENOM,
      askBaseDenom: REGEN_DENOM,
    },
  },
};

export const Prefinance: Story = {
  render: args => (
    <div className="max-w-[800px]">
      <Order {...args} />
    </div>
  ),
};

Prefinance.args = {
  ...args,
  project: {
    ...args.project,
    prefinance: true,
  },
};

export const PendingOrder: Story = {
  render: args => (
    <div className="max-w-[800px]">
      <Order {...args} />
    </div>
  ),
};

PendingOrder.args = {
  ...args,
  project: {
    ...args.project,
  },
  order: {
    ...args.order,
    status: ORDER_STATUS.pending,
    blockchainDetails: {
      ...args.order.blockchainDetails,
      blockchainRecord: '',
    },
  },
};

export const TradableOrder: Story = {
  render: args => (
    <div className="max-w-[800px]">
      <Order {...args} />
    </div>
  ),
};

TradableOrder.args = {
  ...args,
  project: {
    ...args.project,
  },
  order: {
    ...args.order,
    credits: {
      ...args.order.credits,
      askDenom: REGEN_DENOM,
      askBaseDenom: REGEN_DENOM,
    },
    retirementInfo: {
      ...args.order.retirementInfo,
      tradableCredits:
        'Credits were purchased in a tradable format and were not retired',
    },
    paymentInfo: {
      ...args.order.paymentInfo,
      askDenom: REGEN_DENOM,
      askBaseDenom: REGEN_DENOM,
    },
  },
};
