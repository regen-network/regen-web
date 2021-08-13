import React from 'react';
import { Footer, FooterItemProps as FooterItem } from 'web-components/lib/components/footer/footer-new';
import { RegistryIconLink } from '../atoms';

const AppFooter: React.FC = () => {
  const footerItems: [FooterItem, FooterItem, FooterItem] = [
    {
      title: 'Regen Registry',
      items: [
        {
          title: 'Projects',
          href: `/`,
        },
        {
          title: 'Credit Classes',
          href: `/`,
        },
        // {
        //   title: 'Methodologies',
        //   href: `/`,
        // },
      ],
    },
    {
      title: 'stakeholders',
      items: [
        {
          title: 'Buyers',
          href: `${process.env.REACT_APP_WEBSITE_URL}/buyers/`,
        },
        {
          title: 'Land Stewards',
          href: `${process.env.REACT_APP_WEBSITE_URL}/land-stewards/`,
        },
        // {
        //   title: 'Community',
        //   href: `${process.env.REACT_APP_WEBSITE_URL}/community/`,
        // },
        {
          title: 'Project Developers',
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
      title: 'program',
      items: [
        {
          title: 'Program Guides',
          href: 'https://regen-registry.s3.amazonaws.com/Regen+Registry+Program+Guide.pdf',
        },
        {
          title: 'Create a Credit Class',
          href: '/create-credit-class',
        },
        {
          title: 'Create a Methodology',
          href: '/create-methodology',
        },
      ],
    },
  ];

  return (
    <Footer
      footerItems={footerItems}
      iconLink={RegistryIconLink}
      apiUri={process.env.REACT_APP_API_URI}
      privacyUrl="https://www.regen.network/privacy-policy"
      termsUrl="https://www.regen.network/terms-service"
    />
  );
};

export { AppFooter };
