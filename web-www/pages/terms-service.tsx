import { NextSeo } from 'next-seo';

import TermsService from '../mdx/terms-service.mdx';

import { MarkdownSection } from '@/components/organisms/MarkdownSection/MarkdowmSection';

export default function TermsServicePage() {
  return (
    <>
      <NextSeo
        title="Terms of Service"
        description="Regen Network aligns economics with ecology to drive regenerative land management."
      />
      <MarkdownSection title={'Terms of Service'}>
        <TermsService />
      </MarkdownSection>
    </>
  );
}
