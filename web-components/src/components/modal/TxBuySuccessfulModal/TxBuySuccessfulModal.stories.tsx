import { Link } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { TxBuySuccessfulModal } from './TxBuySuccessfulModal';

export default {
  title: 'Modal/TxBuySuccessfulModal',
  component: TxBuySuccessfulModal,
} as Meta<typeof TxBuySuccessfulModal>;

type Story = StoryObj<typeof TxBuySuccessfulModal>;

export const Default: Story = {
  render: args => <TxBuySuccessfulModal {...args} />,
};

Default.args = {
  open: true,
  onClose: action('onClose'),
  onButtonClick: action('onButtonClick'),
  linkComponent: Link,
  title: 'Congrats! Your purchase was successful.',
  description: 'We have emailed you a receipt to mary.smith@gmail.com.',
  txHash: '3F7EFAA3BBD0F4109094FEDA0D06B7E2C4C57A4720D591A1FACD42FC7E2C2583',
  txHashUrl:
    'https://redwood.regen.aneka.io/txs/3F7EFAA3BBD0F4109094FEDA0D06B7E2C4C57A4720D591A1FACD42FC7E2C2583',
  cardItems: [
    { label: 'total purchase price', value: { name: '123' } },
    {
      label: 'project',
      value: { name: 'Monte Dinero', url: 'http://app.regen.network' },
    },
    { label: 'amount retired', value: { name: '456' } },
  ],
  buttonTitle: 'View certificate',
  blockchainRecordText: 'Blockchain record',
  steps: ['Choose credits', 'Payment info', 'Retirement', 'Complete'],
  bgClassName: '',
};
