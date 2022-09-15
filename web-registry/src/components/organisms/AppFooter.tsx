import React from 'react';
import { useLocation } from 'react-router-dom';

import {
  Footer,
  FooterItemProps as FooterItem,
} from 'web-components/lib/components/footer/footer-new';

import { URL_PRIVACY, URL_TERMS_SERVICE } from '../../globals';
import { Link, RegistryIconLink } from '../atoms';

const AppFooter: React.FC = () => {
  const { pathname } = useLocation();
  const isHidden = ['/project-pages'].some(route => pathname.startsWith(route));

  const footerItems: [FooterItem, FooterItem, FooterItem, FooterItem] = [
    {
      title: 'Explore',
      items: [
        {
          title: 'Projects',
          href: '/projects',
        },
        {
          title: 'Credit Classes',
          href: '/',
        },
      ],
    },
    {
      title: 'Trade',
      items: [
        {
          title: 'Storefront',
          href: `/storefront`,
        },
      ],
    },
    {
      title: 'Stats',
      items: [
        {
          title: 'Activity',
          href: '/stats/activity',
        },
      ],
    },
    {
      title: 'Learn More',
      items: [
        {
          title: 'Program Guide',
          href: 'https://library.regen.network/v/regen-registry-program-guide/',
        },
        {
          title: 'How-to Articles',
          href: 'https://guides.regen.network/',
        },
        {
          title: 'How-to Videos',
          href: 'https://www.youtube.com/playlist?list=PLtrLQfpXvAUxDUxhaqzPJiH__-LKtkIUz',
        },
      ],
    },
  ];

  return isHidden ? null : (
    <Footer
      footerItems={footerItems}
      iconLink={RegistryIconLink}
      linkComponent={Link}
      privacyUrl={URL_PRIVACY}
      termsUrl={URL_TERMS_SERVICE}
    />
  );
};

export { AppFooter };
