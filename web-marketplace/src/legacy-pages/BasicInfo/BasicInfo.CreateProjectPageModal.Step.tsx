import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';

import { BlockContent } from 'web-components/src/components/block-content';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { TextButton } from 'web-components/src/components/buttons/TextButton';
import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import { Body, Title } from 'web-components/src/components/typography';

import {
  AllCreateProjectPageQuery,
  Maybe,
  TitleImageCustomBody,
} from 'generated/sanity-graphql';
import { configuredSanityClient } from 'lib/clients/sanity';

type Props = {
  step: Maybe<Pick<TitleImageCustomBody, 'title' | 'bodyRaw' | 'image'>>;
};

export const Step = ({ step }: Props) => {
  const imgSrc = step?.image?.image?.asset?.url ?? step?.image?.imageHref;
  return (
    <div
      className="mb-10 flex items-start gap-10 bg-grey-0 p-15 border border-solid border-grey-300 rounded-[5px]"
      key={step?.title}
    >
      {imgSrc && (
        <Image
          className="w-[100px]"
          width={step?.image?.image?.asset?.metadata?.dimensions?.width || 100}
          height={
            step?.image?.image?.asset?.metadata?.dimensions?.height || 100
          }
          src={imgSrc}
          alt={step?.image?.imageAlt || ''}
        />
      )}
      <div>
        <Title variant="h4" className="pb-10 text-base">{step?.title}</Title>
        <Body size="sm">
          <BlockContent content={step?.bodyRaw} />
        </Body>
      </div>
    </div>
  );
};
