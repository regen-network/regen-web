import { NextSeo } from 'next-seo';

import PrivacyPolicy from '../mdx/privacy-policy.mdx';

import { MarkdownSection } from '@/components/organisms/MarkdownSection/MarkdowmSection';

export default function PrivacyPolicyPage() {
  return (
    <>
      <NextSeo
        title="Privacy Policy"
        description="Regen Network aligns economics with ecology to drive regenerative land management."
      />
      <MarkdownSection title={'Privacy Policy'}>
        <PrivacyPolicy />
      </MarkdownSection>
    </>
  );
}
