import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ButtonBase, Grid } from '@mui/material';

import {
  BlockContent,
  SanityBlockContent,
} from 'web-components/src/components/block-content';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { LinkType } from 'web-components/src/types/shared/linkType';

import { ProjectMetadataLD } from 'lib/db/types/json-ld';

import { MetaDetail } from 'components/molecules';

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
    <div className="px-30 pb-40 border-solid border border-sc-card-standard-stroke rounded-b-[10px] bg-card-standard-background">
      {!!complianceCredits && complianceCredits}
      <div>
        <div className="font-montserrat text-[32px] font-bold gap-[10px] flex items-center">
          {_(msg`Compliance info`)}
          <img
            src={ComplianceMarketIcon}
            alt={_(msg`Checkmark list`)}
            className="h-[50px] w-[50px]"
          />
        </div>
        <div className="my-10">
          <BlockContent content={description} />
        </div>
        <ButtonBase
          href={learnMoreLink.href}
          target="_blank"
          className="cursor-pointer font-montserrat text-sc-text-link font-extrabold text-[14px] tracking-[1px] uppercase mb-[30px]"
        >
          {learnMoreLink.text}
          <SmallArrowIcon sx={{ width: '7px', ml: '4px' }} />
        </ButtonBase>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] mt-4 justify-items-center sm:justify-items-start"></div>
      </div>
    </div>
  );
};

export default ComplianceInfo;
