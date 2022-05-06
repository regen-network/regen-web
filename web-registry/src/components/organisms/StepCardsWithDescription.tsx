import React from 'react';
import Grid from '@mui/material/Grid';

import { Body, Title } from 'web-components/lib/components/typography';
import { BlockContent } from 'web-components/lib/components/block-content';
import { WrappedStepCard } from '../atoms';
import {
  StepCardFieldsFragment,
  Maybe,
  Scalars,
} from '../../generated/sanity-graphql';

const StepCardsWithDescription: React.FC<{
  descriptionRaw?: Maybe<Scalars['JSON']>;
  bottomDescription?: {
    title: string;
    body?: Maybe<Scalars['JSON']>;
  };
  stepCards?: Maybe<Array<Maybe<StepCardFieldsFragment>>>;
  openModal: (link: string) => void;
  className?: string;
}> = ({
  stepCards,
  className,
  descriptionRaw,
  bottomDescription,
  openModal,
}) => {
  return (
    <Grid container justifyContent="center" className={className}>
      {descriptionRaw && (
        <Body size="xl" align="center" pb={8}>
          <BlockContent content={descriptionRaw} />
        </Body>
      )}
      <Grid container justifyContent="center" sx={{ maxWidth: 752 }}>
        {stepCards?.map((card, i) => (
          <WrappedStepCard
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
          <Body size="xl" align="center" pt={[4, 10]}>
            <BlockContent content={bottomDescription.body} />
          </Body>
        </>
      )}
    </Grid>
  );
};

export { StepCardsWithDescription };
