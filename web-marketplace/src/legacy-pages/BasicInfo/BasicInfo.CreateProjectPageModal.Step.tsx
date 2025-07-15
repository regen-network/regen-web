import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';

import { BlockContent } from 'web-components/src/components/block-content';
import { Body, Title } from 'web-components/src/components/typography';

import { Maybe, TitleImageCustomBody } from 'generated/sanity-graphql';
import { configuredSanityClient } from 'lib/clients/sanity';

type Props = {
  step: Maybe<Pick<TitleImageCustomBody, 'title' | 'bodyRaw' | 'image'>>;
};

export const Step = ({ step }: Props) => {
  const imageProps = useNextSanityImage(
    configuredSanityClient,
    step?.image?.image || null,
  ) ?? { src: step?.image?.imageHref, width: 100, height: 100 };
  const { src, ...restImageProps } = imageProps;

  return (
    <div
      className="mb-10 flex items-start gap-10 bg-grey-0 p-15 border border-solid border-grey-300 rounded-[5px]"
      key={step?.title}
    >
      {src && (
        <Image
          className="w-[100px]"
          src={src}
          alt={step?.image?.imageAlt || ''}
          {...restImageProps}
        />
      )}
      <div>
        <Title variant="h4" className="pb-10 text-base">
          {step?.title}
        </Title>
        <Body size="sm">
          <BlockContent content={step?.bodyRaw} />
        </Body>
      </div>
    </div>
  );
};
