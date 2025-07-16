import { BlockContent } from 'web-components/src/components/block-content';
import { Body, Title } from 'web-components/src/components/typography';

import { Maybe, TitleImageCustomBody } from 'generated/sanity-graphql';

import { SanityNextImage } from 'components/atoms/SanityNextImage';

type Props = {
  step: Maybe<Pick<TitleImageCustomBody, 'title' | 'bodyRaw' | 'image'>>;
};

export const Step = ({ step }: Props) => (
  <div
    className="mb-10 flex items-start gap-10 bg-grey-0 p-15 border border-solid border-grey-300 rounded-[5px]"
    key={step?.title}
  >
    <SanityNextImage
      className="w-[100px]"
      image={step?.image?.image}
      fallback={
        step?.image?.imageHref
          ? { src: step?.image?.imageHref, width: 100, height: 100 }
          : null
      }
      alt={step?.image?.imageAlt || ''}
    />
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
