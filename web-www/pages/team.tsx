import React from 'react';
import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import AdvisorSection from '@/components/templates/team/AdvisorSection';
import CoreTeamSection from '@/components/templates/team/CoreTeamSection';
import TeamTopSection from '@/components/templates/team/TeamTopSection/TeamTopSection';
import { TeamPageDocument, TeamPageQuery } from '@/generated/sanity-graphql';
import { sanityClient } from '@/lib/clients/sanityClient';

export default function ResourcesPage({
  teamData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const topSection = teamData.data.allTeamPage[0].topSection;
  const coreSection = teamData.data.allTeamPage[0].coreSection;
  const advisorSection = teamData.data.allTeamPage[0].advisorSection;

  return (
    <>
      <NextSeo
        description="We are developers, ecologists, scientists, and designers from all over the world, bound by our common purpose of planetary regeneration. Feel free to connect with us."
        title="Team"
        openGraph={{
          images: [
            { url: '/images/team/team-seo.jpg', width: 1000, height: 750 },
          ],
        }}
      />
      <TeamTopSection topSectionData={topSection} />
      <CoreTeamSection coreSectionData={coreSection} />
      <AdvisorSection advisorSectionData={advisorSection} />
    </>
  );
}

export const getStaticProps = async () => {
  const teamData = await sanityClient.query<TeamPageQuery>({
    query: TeamPageDocument,
  });

  return {
    props: { teamData },
  };
};
