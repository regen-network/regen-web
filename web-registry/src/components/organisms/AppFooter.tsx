import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Footer,
  FooterItemProps as FooterItem,
} from 'web-components/lib/components/footer/footer-new';
import { RegistryIconLink, Link } from '../atoms';

const AppFooter: React.FC = () => {
  const { pathname } = useLocation();
  const isHidden = ['/project-pages'].some(route => pathname.startsWith(route));

  const footerItems: [FooterItem, FooterItem, FooterItem] = [
    {
      title: 'Registry App',
      items: [
        // TODO: Hide before merging
        // Add it back once the rNCT basket is created on mainnet
        {
          title: 'rNCT',
          href: '/baskets/eco.uC.rNCT',
        },
        {
          title: 'Projects',
          href: '/#projects',
        },
        // TODO: Hide before merging
        // Add it back once there starts to be some activity on mainnet
        {
          title: 'Activity',
          href: '/stats/activity',
        },
      ],
    },
    {
      title: 'stakeholders',
      items: [
        {
          title: 'Buyers',
          href: `/buyers`,
        },
        {
          title: 'Land Stewards',
          href: `/land-stewards`,
        },
      ],
    },
    {
      title: 'program',
      items: [
        {
          title: 'Program Guide',
          href: 'https://regen-registry.s3.amazonaws.com/Regen+Registry+Program+Guide.pdf',
        },
        {
          title: 'Create a Methodology',
          href: '/create-methodology',
        },
        {
          title: 'Methodology Review Process',
          href: '/methodology-review-process',
        },
        {
          title: 'Regen Registry Library',
          href: 'https://library.regen.network/',
        },
      ],
    },
  ];

  return isHidden ? null : (
    <Footer
      footerItems={footerItems}
      iconLink={RegistryIconLink}
      linkComponent={Link}
      privacyUrl="https://www.regen.network/privacy-policy"
      termsUrl="https://www.regen.network/terms-service"
    />
  );
};

export { AppFooter };
