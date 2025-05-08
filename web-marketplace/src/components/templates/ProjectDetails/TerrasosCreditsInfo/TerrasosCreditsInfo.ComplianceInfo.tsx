import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Grid } from '@mui/material';

import {
  BlockContent,
  SanityBlockContent,
} from 'web-components/src/components/block-content';
import { LinkType } from 'web-components/src/types/shared/linkType';

import { ProjectMetadataLD } from 'lib/db/types/json-ld';

import { MetaDetail } from 'components/molecules';

import { InfoTemplate } from './TerrasosCreditsInfo.InfoTemplate';

import ComplianceMarketIcon from 'assets/svgs/checkmarkList.svg';

type Props = {
  learnMoreLink: LinkType;
  description: SanityBlockContent;
  complianceCredits?: JSX.Element;
  projectMetadata?: ProjectMetadataLD;
};

const ComplianceInfo = ({
  learnMoreLink,
  description,
  complianceCredits,
  projectMetadata,
}: Props) => {
  const { _ } = useLingui();

  const region = projectMetadata?.['regen:region'];
  const department = projectMetadata?.['regen:administrativeArea'];
  const watershed = projectMetadata?.['regen:watershed'];
  const subWatershed = projectMetadata?.['regen:subWatershed'];
  const environmentalAuthority =
    projectMetadata?.['regen:environmentalAuthority'];
  const biomeType = projectMetadata?.['regen:biomeType'];

  return (
    <InfoTemplate
      upperContent={complianceCredits}
      title={_(msg`Compliance info`)}
      imgSrc={ComplianceMarketIcon}
      imgAlt={_(msg`Checkmark list`)}
      description={<BlockContent content={description} />}
      learnMoreLink={learnMoreLink}
    >
      <>
        <Grid container spacing={8}>
          <MetaDetail label={_(msg`region`)} value={region} bodySize="lg" />
          <MetaDetail
            label={_(msg`department`)}
            value={department}
            bodySize="lg"
          />
          <MetaDetail
            label={_(msg`environmental authority`)}
            value={environmentalAuthority}
            bodySize="lg"
          />
          <MetaDetail
            label={_(msg`watershed`)}
            value={watershed}
            bodySize="lg"
          />
          <MetaDetail
            label={_(msg`sub-watershed`)}
            value={subWatershed}
            bodySize="lg"
          />
          <MetaDetail label={_(msg`biome`)} value={biomeType} bodySize="lg" />
        </Grid>
      </>
    </InfoTemplate>
  );
};

export default ComplianceInfo;
