/* eslint-disable lingui/no-unlocalized-strings */
import { TebuBannerProps } from './TebuBanner';

export const tebuBannerMock: TebuBannerProps = {
  content:
    'The Terrasos Biodiversity Unit represents approximately 10m2 of conserved or restored land for at least 30 years.',
  learnMoreLink: {
    text: 'Learn more',
    href: 'https://www.terrasos.co/',
  },
  imageProps: { src: '/logos/tebu.png', width: 62, height: 76 },
  logoAlt: 'Tebu logo',
  onClose: () => void 0,
};
