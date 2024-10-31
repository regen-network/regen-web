import { Meta, StoryObj } from '@storybook/react';

import Certificate from '.';
import { certificateLabels, certificateMock } from './certificate.mock';

export default {
  title: 'Certificate',
  component: Certificate,
} as Meta<typeof Certificate>;

type Story = StoryObj<typeof Certificate>;

export const Default: Story = {
  render: args => <Certificate {...args} />,
};

Default.args = {
  certificateData: certificateMock,
  background: './certificate-bg.png',
  linkComponent: ({ children, href }) => <a href={href}>{children}</a>,
  labels: certificateLabels,
  certificateNotFoundAlt: 'certificate not found',
  certificateNotFoundSrc: './certificate-not-found.svg',
  certificateNotFoundTitle:
    'This certificate has not been generated yet because the credit transfer to you is still pending.',
  certificateNotFoundDescription: (
    <span>
      If you do not see your certificate within 24 hours, please reach out to{' '}
      <a href="support@regen.network">support@regen.network</a>.
    </span>
  ),
};

export const NotFound: Story = {
  render: args => <Certificate {...args} />,
};

NotFound.args = {
  background: './certificate-bg.png',
  linkComponent: ({ children, href }) => <a href={href}>{children}</a>,
  labels: certificateLabels,
  certificateNotFoundAlt: 'certificate not found',
  certificateNotFoundSrc: './certificate-not-found.svg',
  certificateNotFoundTitle:
    'This certificate has not been generated yet because the credit transfer to you is still pending.',
  certificateNotFoundDescription: (
    <span>
      If you do not see your certificate within 24 hours, please reach out to{' '}
      <a href="support@regen.network">support@regen.network</a>.
    </span>
  ),
};
