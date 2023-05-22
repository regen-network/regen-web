import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { FaqSection } from '@/components/templates/faq/FaqSection/FaqSection';
import { FaqPageDocument, FaqPageQuery } from '@/generated/sanity-graphql';
import { sanityClient } from '@/lib/clients/sanityClient';
import { normalizeFaqCategories } from '@/lib/utils/normalizers/normalizeFaqCategories';

export default function FaqPage({
  faqPageData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const faqPage = faqPageData?.data.allFaqPage[0];
  const categories = normalizeFaqCategories({
    categories: faqPage?.categories,
  });
  const router = useRouter();
  const navigate = (path: string) => router.push(path);

  return (
    <>
      <NextSeo
        title="FAQ"
        description="Explore Regen Network’s frequently asked questions"
      />
      <FaqSection
        header={router.query.header as string}
        categories={categories}
        navigate={navigate}
      />
    </>
  );
}

export const getStaticProps = async () => {
  const faqPageData = await sanityClient.query<FaqPageQuery>({
    query: FaqPageDocument,
  });

  return {
    props: {
      faqPageData,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      '/faq/concept',
      '/faq/regeneration',
      '/faq/organization',
      '/faq/tech',
      '/faq/token',
      '/faq/regen%20registry',
    ],
    fallback: true,
  };
}
