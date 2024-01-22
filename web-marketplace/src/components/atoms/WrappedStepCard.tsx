import React from 'react';

import { BlockContent } from 'web-components/src/components/block-content';
import { StepCard } from 'web-components/src/components/cards/StepCard';

import { Maybe, StepCardFieldsFragment } from '../../generated/sanity-graphql';
import { onBtnClick } from '../../lib/button';

/**
 * StepCard wrapping content from Sanity
 */
const WrappedStepCard: React.FC<
  React.PropsWithChildren<{
    openModal: (link: string) => void;
    stepNumber: number;
    stepCard: Maybe<StepCardFieldsFragment>;
  }>
> = ({ openModal, stepNumber, stepCard }) => {
  if (!stepCard) {
    return null;
  }
  const {
    icon,
    faqs,
    tagName,
    isActive,
    title,
    descriptionRaw,
    button,
    videoSrc,
    image,
  } = stepCard;
  return (
    <StepCard
      icon={
        icon?.asset?.url ? (
          <img src={icon.asset.url} alt={title || ''} />
        ) : undefined
      }
      step={{
        tagName,
        title: title || '',
        description: <BlockContent content={descriptionRaw} />,
        faqs: faqs?.map(f => ({
          question: f?.question || '',
          answer: <BlockContent content={f?.answerRaw} />,
        })),
        imageSrc: image?.imageHref || image?.image?.asset?.url,
        videoSrc,
        imageAlt: image?.imageAlt || '',
        isActive: isActive || false,
        stepNumber: stepNumber + 1,
        btnText: button?.buttonText,
        onBtnClick: () => onBtnClick(openModal, button),
      }}
    />
  );
};

export { WrappedStepCard };
