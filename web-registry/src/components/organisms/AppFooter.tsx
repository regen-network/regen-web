import React from 'react';
import Footer, { FooterItemProps as FooterItem } from 'web-components/lib/components/footer';

function AppFooter(): JSX.Element {
  const footerItems: [FooterItem, FooterItem, FooterItem] = [
    {
      title: 'get involved',
      items: [
        {
          title: 'Buyers',
          href: `${process.env.REACT_APP_WEBSITE_URL}/buyers/`,
        },
        {
          title: 'Land Stewards',
          href: `${process.env.REACT_APP_WEBSITE_URL}/land-stewards/`,
        },
        {
          title: 'Community',
          href: `${process.env.REACT_APP_WEBSITE_URL}/community/`,
        },
        {
          title: 'Developers',
          href: `${process.env.REACT_APP_WEBSITE_URL}/developers/`,
        },
        {
          title: 'Scientists',
          href: `${process.env.REACT_APP_WEBSITE_URL}/science/`,
        },
        {
          title: 'Validators',
          href: `${process.env.REACT_APP_WEBSITE_URL}/validators/`,
        },
      ],
    },
    {
      title: 'learn more',
      items: [
        {
          title: 'Case Studies',
          href: `${process.env.REACT_APP_WEBSITE_URL}/case-studies/`,
        },
        {
          title: 'Resources',
          href: `${process.env.REACT_APP_WEBSITE_URL}/resources/`,
        },
        {
          title: 'FAQ',
          href: `${process.env.REACT_APP_WEBSITE_URL}/faq/`,
        },
        {
          title: 'Team',
          href: `${process.env.REACT_APP_WEBSITE_URL}/team/`,
        },
        {
          title: 'Contact',
          href: `${process.env.REACT_APP_WEBSITE_URL}/contact/`,
        },
      ],
    },
    {
      title: 'regen',
      items: [
        {
          title: 'Partners',
          href: `${process.env.REACT_APP_WEBSITE_URL}/partners/`,
        },
        {
          title: 'Media',
          href: `${process.env.REACT_APP_WEBSITE_URL}/media/`,
        },
        {
          title: 'Careers',
          href: 'https://apply.workable.com/regen-network/',
          target: '_blank',
        },
        {
          title: 'Forum',
          href: 'https://forum.regen.network/',
          target: '_blank',
        },
        {
          title: 'Press Kit',
          href: `${process.env.REACT_APP_WEBSITE_URL}/press-kit/`,
        },
        {
          title: 'Invest',
          href: `${process.env.REACT_APP_WEBSITE_URL}/invest/`,
        },
      ],
    },
  ];

  return (
    <Footer
      footerItems={footerItems}
      apiUri={process.env.REACT_APP_API_URI}
      privacyUrl="https://www.regen.network/privacy-policy"
      termsUrl="https://www.regen.network/terms-service"
    />
  );
}

export { AppFooter };
