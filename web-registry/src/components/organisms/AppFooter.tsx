import React from 'react';
import {
  Footer,
  FooterItemProps as FooterItem,
} from 'web-components/lib/components/footer/footer-new';
import { RegistryIconLink, Link } from '../atoms';

const AppFooter: React.FC = () => {
  const footerItems: [FooterItem, FooterItem, FooterItem] = [
    {
      title: 'Regen Registry',
      items: [
        {
          title: 'Carbon<i>Plus</i> Grasslands Credit Class',
          href: '/credit-classes/carbonplus-grasslands',
        },
        {
          title: 'Carbon<i>Plus</i> Grasslands Methodology',
          href: '/methodologies/carbonplus-grasslands',
        },
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
      ],
    },
    {
      title: 'program',
      items: [
        {
          title: 'Program Guide',
          href:
            'https://regen-registry.s3.amazonaws.com/Regen+Registry+Program+Guide.pdf',
        },
        {
          title: 'Create a Methodology',
          href: '/create-methodology',
        },
        {
          title: 'Methodology Review Process',
          href: '/methodology-review-process',
        },
      ],
    },
  ];

  return (
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
