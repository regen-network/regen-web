import React from 'react';
import Grid from '@mui/material/Grid';

import { BlockContent } from 'web-components/src/components/block-content';
import { Body, Title } from 'web-components/src/components/typography';

import {
  Maybe,
  Scalars,
  StepCardFieldsFragment,
} from 'generated/sanity-graphql';

import { WrappedStepCard } from '../atoms';

const StepCardsWithDescription: React.FC<
  React.PropsWithChildren<{
    descriptionRaw?: Maybe<Scalars['JSON']>;
    bottomDescription?: {
      title: string;
      body?: Maybe<Scalars['JSON']>;
    };
    stepCards?: Maybe<Array<Maybe<StepCardFieldsFragment>>>;
    openModal: (link: string) => void;
    className?: string;
  }>
> = ({
  stepCards,
  className,
  descriptionRaw,
  bottomDescription,
  openModal,
}) => {
  return (
    <Grid container justifyContent="center" className={className}>
      {descriptionRaw && (
        <Body as="div" size="xl" align="center" pb={8}>
          <BlockContent content={descriptionRaw} />
        </Body>
      )}
      <Grid container justifyContent="center" sx={{ maxWidth: 752 }}>
        {stepCards?.map((card, i) => (
          <WrappedStepCard
            key={i}
            stepNumber={i}
            stepCard={card}
            openModal={openModal}
          />
        ))}
      </Grid>
      {!!bottomDescription && (
        <>
          <Title align="center" variant="h3" mobileVariant="h4" mt={[16, 24]}>
            {bottomDescription.title}
          </Title>
          <Body as="div" size="xl" align="center" pt={[4, 10]}>
            <BlockContent content={bottomDescription.body} />
          </Body>
        </>
      )}
    </Grid>
  );
};

export { StepCardsWithDescription };
