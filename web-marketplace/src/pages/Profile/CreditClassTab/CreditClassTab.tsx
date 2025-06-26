import { useNavigate, useParams } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import { ImageActionCard } from 'web-components/src/components/cards/ImageActionCard';
import { ProgramImageChildren } from 'web-components/src/components/cards/ProjectCard/ProjectCard.ImageChildren';

import WithLoader from 'components/atoms/WithLoader';

import { useMergedCreditClasses } from '../hooks/useMergedCreditClasses';
import { LEARN_MORE_BUTTON } from './CreditClassTab.constants';
import {
  extractDescription,
  extractImageSrc,
  extractTitle,
} from './CreditClassTab.utils';

export const CreditClassTab = () => {
  const navigate = useNavigate();
  const { accountAddressOrId } = useParams();
  const { i18n } = useLingui();

  const { creditClasses, programs, loading } =
    useMergedCreditClasses(accountAddressOrId);

  return (
    <WithLoader isLoading={loading}>
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-20">
          {creditClasses?.map((creditClass, index) => {
            const title = extractTitle(creditClass);
            const description = extractDescription(creditClass);
            const imageSrc = extractImageSrc(creditClass);
            const program = programs?.[index];
            <Grid item xs={12} md={6} lg={4} key={creditClass.id}>
            return (
              <div key={creditClass.path} className="w-full">
                <ImageActionCard
                  btnText={i18n._(LEARN_MORE_BUTTON)}
                  title={title}
                  description={
                    <div className="line-clamp-3 text-sm leading-relaxed overflow-hidden">
                      {description}
                    </div>
                  }
                  imgSrc={imageSrc ?? ''}
                  onClick={() =>
                    navigate(`/credit-classes/${creditClass.path}`)
                  }
                  {...(program && {
                    imageChildren: <ProgramImageChildren program={program} />,
                  })}
                  className="h-full"
                  draftText=""
                />
              </div>
            );
          })}
        </div>
      </>
    </WithLoader>
  );
};
