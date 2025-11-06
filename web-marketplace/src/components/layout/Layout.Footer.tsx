'use client';

import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { URL_REGISTRY_TERMS_SERVICE, URL_WEB_PRIVACY } from 'config/globals';
import { usePathname } from 'next/navigation';

import {
  Footer,
  FooterItemProps as FooterItem,
} from 'web-components/src/components/footer/footer-new';

import { HomeIconLink } from 'components/atoms/HomeIconLink';
import { Link } from 'components/atoms/Link';

export const LayoutFooter = () => {
  const { _ } = useLingui();
  const pathname = usePathname();
  const isHidden =
    /^\/project-pages$/.test(pathname) ||
    /^\/project\/[^\/]+\/buy$/.test(pathname);

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
          title: 'NCT',
          href: '/baskets/eco.uC.NCT',
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
        iconLink={HomeIconLink}
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
