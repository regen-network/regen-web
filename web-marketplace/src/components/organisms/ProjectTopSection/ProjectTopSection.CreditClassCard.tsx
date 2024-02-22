import { getClassImageWithGreyDefault } from 'utils/image/classImage';

import { BlockContent } from 'web-components/src/components/block-content';
import CreditClassCard, {
  CreditClassCardItemType,
} from 'web-components/src/components/cards/CreditClassCard';
import { Account } from 'web-components/src/components/user/UserInfoCard';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

import { Link } from 'components/atoms';

import { ProjectMethodology } from './ProjectTopSection.utils';

type Props = {
  creditClassSanity?: AllCreditClassQuery['allCreditClass'][0] | undefined;
  creditClassMetadata?: CreditClassMetadataLD;
  onChainCreditClassId?: string;
  generationMethods?: CreditClassCardItemType[];
  creditTypeName?: string;
  creditTypeImage?: string | null;
  methodology?: ProjectMethodology;
  program?: Account;
};

export const ProjectTopSectionCreditClassCard: React.FC<Props> = ({
  creditClassSanity,
  creditClassMetadata,
  onChainCreditClassId,
  creditTypeName,
  creditTypeImage,
  generationMethods,
  methodology,
  program,
}) =>
  (creditClassSanity || creditClassMetadata) &&
  (creditClassSanity?.path || onChainCreditClassId) ? (
    <Link
      href={`/credit-classes/${
        creditClassSanity?.path || onChainCreditClassId
      }`}
    >
      <CreditClassCard
        title={
          creditClassMetadata?.['schema:name'] || (
            <BlockContent content={creditClassSanity?.nameRaw} />
          )
        }
        description={
          creditClassMetadata?.['schema:description'] || (
            <BlockContent content={creditClassSanity?.shortDescriptionRaw} />
          )
        }
        imgSrc={getClassImageWithGreyDefault({
          metadata: creditClassMetadata,
          sanityClass: creditClassSanity,
        })}
        type={{
          name: creditTypeName ?? '',
          icon: {
            src: creditTypeImage ?? '',
          },
        }}
        generationMethods={generationMethods}
        methodology={{
          text: methodology?.['schema:name'],
          href: methodology?.['schema:url'],
        }}
        program={program}
        sx={{ mt: [2, 4], py: [2, 6] }}
      />
    </Link>
  ) : null;
