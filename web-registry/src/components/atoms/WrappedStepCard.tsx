import React from 'react';

import { StepCard } from 'web-components/lib/components/cards/StepCard';
import { BlockContent } from 'web-components/lib/components/block-content';
import { StepCardFieldsFragment, Maybe } from '../../generated/sanity-graphql';

const openLink = (url: string, blankTarget: boolean): void =>
  void window.open(url, blankTarget ? '_blank' : '', 'noopener');

/**
 * StepCard wrapping content from Sanity
 */
const WrappedStepCard: React.FC<{
  openModal: (link: string) => void;
  stepNumber: number;
  stepCard: Maybe<StepCardFieldsFragment>;
}> = ({ openModal, stepNumber, stepCard }) => {
  if (!stepCard) {
    return null;
  }
  const { icon, faqs, tagName, isActive, title, descriptionRaw, button, videoSrc, image } = stepCard;
  const href = button?.buttonLink?.buttonHref || button?.buttonLink?.buttonDoc?.href;
  return (
    <StepCard
      icon={icon?.asset?.url ? <img src={icon.asset.url} alt={title || ''} /> : undefined}
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
        onBtnClick: href
          ? button?.buttonModal
            ? () => openModal(href)
            : () => openLink(href, button?.buttonBlankTarget ? true : false)
          : undefined,
      }}
    />
  );
};

export { WrappedStepCard };
