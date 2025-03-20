import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import InfoCard from 'web-components/src/components/molecules/InfoCard';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { getSanityImgSrc } from 'lib/imgSrc';
import { getBuyFlowChooseCreditsCardQuery } from 'lib/queries/react-query/sanity/getBuyFlowChooseCreditsCardQuery/getBuyFlowChooseCreditsCardQuery';

type ChooseCreditsCardProps = {
  className?: string;
};
export const ChooseCreditsFormCard = ({
  className,
}: ChooseCreditsCardProps) => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const { data: sanityCreditClassPageData } = useQuery(
    getBuyFlowChooseCreditsCardQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );
  const card =
    sanityCreditClassPageData?.allBuyFlowChooseCreditsCard?.[0]?.infoCard;

  return (
    <>
      {card && (
        <InfoCard
          title={card.title ?? ''}
          description={card.descriptionRaw ?? ''}
          image={{
            src: getSanityImgSrc(card.image),
            alt: card.image?.imageAlt ?? '',
          }}
          className={className}
        />
      )}
    </>
  );
};
