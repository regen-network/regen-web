import { Meta, StoryObj } from '@storybook/react';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';
import { Order } from 'web-marketplace/src/components/organisms/Order/Order';
import { ORDER_STATUS } from 'web-marketplace/src/components/organisms/Order/Order.constants';

import { ProjectPrefinancing } from 'web-components/src/components/cards/ProjectCard/ProjectCard.types';

import {
  allowedDenoms,
  blockchainDetails,
  credits,
  paymentInfo,
  retirementInfo,
} from './Order.mock';

const orderData = {
  project: {
    id: 'C01-001',
    slug: 'project-name',
    name: 'Project Name',
    deliveryDate: 'Dec 15, 2024',
    place: 'Cabo Vírgenes, Argentina',
    area: 50.4,
    areaUnit: 'hectares',
    imgSrc: 'coorong.png',
  },
  order: {
    status: ORDER_STATUS.delivered,
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
  orderData,
  allowedDenoms,
};

export const Crypto: Story = {
  render: args => (
    <div className="max-w-[800px]">
      <Order {...args} />
    </div>
  ),
};

Crypto.args = {
  orderData: {
    ...orderData,
    order: {
      ...orderData.order,
      credits: {
        ...orderData.order.credits,
        askDenom: REGEN_DENOM,
        askBaseDenom: REGEN_DENOM,
      },
      paymentInfo: {
        ...orderData.order.paymentInfo,
        askDenom: REGEN_DENOM,
        askBaseDenom: REGEN_DENOM,
      },
    },
  },
  allowedDenoms,
};

export const Prefinance: Story = {
  render: args => (
    <div className="max-w-[800px]">
      <Order {...args} />
    </div>
  ),
};

Prefinance.args = {
  orderData: {
    ...orderData,
    project: {
      ...orderData.project,
      projectPrefinancing: { isPrefinanceProject: true } as ProjectPrefinancing,
    },
  },
  allowedDenoms,
};

export const PendingOrder: Story = {
  render: args => (
    <div className="max-w-[800px]">
      <Order {...args} />
    </div>
  ),
};

PendingOrder.args = {
  orderData: {
    ...orderData,
    order: {
      ...orderData.order,
      status: ORDER_STATUS.pending,
      blockchainDetails: {
        ...orderData.order.blockchainDetails,
        blockchainRecord: '',
      },
    },
  },
  allowedDenoms,
};

export const TradableOrder: Story = {
  render: args => (
    <div className="max-w-[800px]">
      <Order {...args} />
    </div>
  ),
};

TradableOrder.args = {
  orderData: {
    ...orderData,
    order: {
      ...orderData.order,
      credits: {
        ...orderData.order.credits,
        askDenom: REGEN_DENOM,
        askBaseDenom: REGEN_DENOM,
        totalPrice: +orderData.order.credits.totalPrice * Math.pow(10, 6),
      },
      retirementInfo: {
        ...orderData.order.retirementInfo,
        retiredCredits: false,
      },
      paymentInfo: {
        ...orderData.order.paymentInfo,
        askDenom: REGEN_DENOM,
        askBaseDenom: REGEN_DENOM,
      },
    },
  },
  allowedDenoms,
};
