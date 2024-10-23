import React from 'react';
import { useLocation } from 'react-router-dom';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { URL_REGISTRY_TERMS_SERVICE, URL_WEB_PRIVACY } from 'config/globals';

import {
  Footer,
  FooterItemProps as FooterItem,
} from 'web-components/src/components/footer/footer-new';

import { Link, RegistryIconLink } from 'components/atoms';

const RegistryLayoutFooter: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();
  const { pathname } = useLocation();
  const isHidden = ['/project-pages'].some(route => pathname.startsWith(route));

  const footerItems: [FooterItem, FooterItem, FooterItem, FooterItem] = [
    {
      title: _(msg`Explore`),
      items: [
        {
          title: _(msg`Projects`),
          href: '/projects/1',
        },
        {
          title: _(msg`Credit Classes`),
          href: '/#credit-classes',
        },
      ],
    },
    {
      title: _(msg`Trade`),
      items: [
        {
          title: _(msg`Storefront`),
          href: `/storefront`,
        },
      ],
    },
    {
      title: _(msg`Stats`),
      items: [
        {
          title: _(msg`Activity`),
          href: '/stats/activity',
        },
        {
          title: _(msg`Ecocredit batches`),
          href: '/ecocredit-batches/1',
        },
      ],
    },
    {
      title: _(msg`Learn More`),
      items: [
        {
          title: _(msg`Program Guide`),
          href: 'https://handbook.regen.network/regen-registry-overview/program-rules-and-requirements',
        },
        {
          title: _(msg`How-to Articles`),
          href: 'https://guides.regen.network/guides/regen-marketplace/',
        },
        {
          title: _(msg`How-to Videos`),
          href: 'https://www.youtube.com/playlist?list=PLtrLQfpXvAUxDUxhaqzPJiH__-LKtkIUz',
        },
        {
          title: _(msg`Support`),
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
        regenText={
          <Trans>
            A project of{' '}
            <Link
              href="https://www.regen.network"
              sx={{ color: 'secondary.main' }}
            >
              Regen Network
              <br /> Development, PBC
            </Link>
          </Trans>
        }
        dataProviderText={_(msg`Regen Data Provider`)}
        termsText={_(msg`Terms`)}
        privacyText={_(msg`Privacy`)}
        joinText={_(msg`join the community`)}
      />
    </footer>
  );
};

export { RegistryLayoutFooter };
