import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { BannerCard } from './BannerCard';

const meta: Meta<typeof BannerCard> = {
  title: 'molecules/BannerCard',
  component: BannerCard,
};
export default meta;

type Story = StoryObj<typeof BannerCard>;

export const Default: Story = {
  args: {
    title: 'Make your profile shine!',
    description:
      'Transform your user profile into a vibrant showcase of who you are by quickly personalizing it with your favorite background, profile or logo image, and sharing links to your website and Twitter.',
    image: { src: '/profile/farmer.svg', alt: 'farmer' },
    buttonLabel: 'share profile',
    onClick: action('click'),
  },
};
