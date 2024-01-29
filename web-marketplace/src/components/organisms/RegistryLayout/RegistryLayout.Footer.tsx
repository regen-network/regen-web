import React from 'react';
import { useLocation } from 'react-router-dom';
import { URL_REGISTRY_TERMS_SERVICE, URL_WEB_PRIVACY } from 'config/globals';

import {
  Footer,
  FooterItemProps as FooterItem,
} from 'web-components/src/components/footer/footer-new';

import { Link, RegistryIconLink } from 'components/atoms';

const RegistryLayoutFooter: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { pathname } = useLocation();
  const isHidden = ['/project-pages'].some(route => pathname.startsWith(route));

  const footerItems: [FooterItem, FooterItem, FooterItem, FooterItem] = [
    {
      title: 'Explore',
      items: [
        {
          title: 'Projects',
          href: '/projects/1',
        },
        {
          title: 'Credit Classes',
          href: '/#credit-classes',
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
        {
          title: 'Ecocredit batches',
          href: '/ecocredit-batches/1',
        },
      ],
    },
    {
      title: 'Learn More',
      items: [
        {
          title: 'Program Guide',
          href: 'https://registry.regen.network/v/regen-registry-program-guide/',
        },
        {
          title: 'How-to Articles',
          href: 'https://guides.regen.network/guides/regen-marketplace/',
        },
        {
          title: 'How-to Videos',
          href: 'https://www.youtube.com/playlist?list=PLtrLQfpXvAUxDUxhaqzPJiH__-LKtkIUz',
        },
        {
          title: 'Support',
          href: 'https://discord.com/channels/684494798358315010/1016745508590596116',
        },
      ],
    },
  ];

  return isHidden ? null : (
    <footer>
      <Footer
        footerItems={footerItems}
        iconLink={RegistryIconLink}
        linkComponent={Link}
        privacyUrl={URL_WEB_PRIVACY}
        termsUrl={URL_REGISTRY_TERMS_SERVICE}
      />
    </footer>
  );
};

export { RegistryLayoutFooter };
