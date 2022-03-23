import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Footer,
  FooterItemProps as FooterItem,
} from 'web-components/lib/components/footer/footer-new';
import { RegistryIconLink, Link } from '../atoms';
import { chainId } from '../../lib/ledger';

const AppFooter: React.FC = () => {
  const { pathname } = useLocation();
  const isHidden = ['/project-pages'].some(route => pathname.startsWith(route));

  const footerItems: [FooterItem, FooterItem, FooterItem] = [
    {
      title: 'Registry App',
      items: [
        {
          title: 'Projects',
          href: '/#projects',
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
          href: 'https://library.regen.network/v/regen-registry-program-guide/',
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

  if (chainId) {
    footerItems[0].items.unshift({
      title: 'NCT',
      href: '/baskets/eco.uC.rNCT',
    });
    footerItems[0].items.push({
      title: 'Activity',
      href: '/stats/activity',
    });
  }

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
