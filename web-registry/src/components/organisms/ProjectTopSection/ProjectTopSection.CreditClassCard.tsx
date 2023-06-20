import { BlockContent } from 'web-components/lib/components/block-content';
import CreditClassCard from 'web-components/lib/components/cards/CreditClassCard';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { getSanityImgSrc } from 'lib/imgSrc';

import { Link } from 'components/atoms';

import { ProjectMethodology } from './ProjectTopSection.utils';

type Props = {
  creditClassSanity?: AllCreditClassQuery['allCreditClass'][0] | undefined;
  creditClassMetadata?: CreditClassMetadataLD;
  onChainCreditClassId?: string;
  generationMethod?: string;
  creditTypeName?: string;
  creditTypeImage?: string | null;
  methodology?: ProjectMethodology;
};

export const ProjectTopSectionCreditClassCard: React.FC<Props> = ({
  creditClassSanity,
  creditClassMetadata,
  onChainCreditClassId,
  creditTypeName,
  creditTypeImage,
  generationMethod,
  methodology,
}) =>
  creditClassSanity || creditClassMetadata ? (
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
        imgSrc={
          creditClassMetadata?.['schema:image'] ||
          getSanityImgSrc(creditClassSanity?.image)
        }
        type={{
          name: creditTypeName ?? '',
          icon: {
            src: creditTypeImage ?? '',
          },
        }}
        generationMethod={{
          name: generationMethod ?? '',
          icon: {
            src:
              creditClassSanity?.creditGenerationMethod?.image?.asset?.url ??
              '',
          },
        }}
        methodology={{
          text: methodology?.['schema:name'],
          href: methodology?.['schema:url'],
        }}
        sx={{ mt: [2, 4], py: [2, 6] }}
      />
    </Link>
  ) : null;
