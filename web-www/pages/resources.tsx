import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import LedgerSection from '@/components/templates/resources/LedgerSection/LedgerSection';
import RegistrySection from '@/components/templates/resources/RegistrySection/RegistrySection';
import TopSection from '@/components/templates/resources/TopSection/TopSection';
import {
  ResourcesPageDocument,
  ResourcesPageQuery,
} from '@/generated/sanity-graphql';
import { sanityClient } from '@/lib/clients/sanityClient';

export default function ResourcesPage({
  resourcesData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const resources = resourcesData.data.allResourcesPage[0];
  const ledgerSection = resources.ledgerSection;
  const registrySection = resources.registrySection;
  const topSection = resources.topSection;

  return (
    <>
      <NextSeo
        description="Learn more about the ins and outs of how the Regen Ledger and Regen Marketplace function."
        title="Resources"
        openGraph={{
          images: [
            {
              url: '/images/resources/resources-ledger-whitepaper-image.jpg',
              width: 548,
              height: 299,
            },
          ],
        }}
      />
      <TopSection topSectionData={topSection} />
      <RegistrySection registrySectionData={registrySection} />
      <LedgerSection ledgerSectionData={ledgerSection} />
    </>
  );
}

export const getStaticProps = async () => {
  const resourcesData = await sanityClient.query<ResourcesPageQuery>({
    query: ResourcesPageDocument,
  });

  return {
    props: { resourcesData },
  };
};
