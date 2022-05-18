import React from 'react';
import { Box } from '@mui/material';

import {
  Body,
  Label,
  Subtitle,
  Title,
} from 'web-components/lib/components/typography';
import { BlockContent } from 'web-components/lib/components/block-content';

import {
  ReviewSectionFieldsFragment,
  Maybe,
} from '../../generated/sanity-graphql';
import { SanityButton } from '../atoms';

const ReviewProcessInfo: React.FC<{
  reviewSection?: Maybe<ReviewSectionFieldsFragment>;
  openModal: (link: string) => void;
}> = props => {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: [4, 6],
      }}
    >
      {props.reviewSection?.disclaimerTop && (
        <Subtitle size="lg" color="info.dark">
          {props.reviewSection?.disclaimerTop}
        </Subtitle>
      )}
      <Title variant="h2" mobileVariant="h3" align="center">
        {props.reviewSection?.title}
      </Title>
      {props.reviewSection?.timespan && (
        <Label color="secondary.main">{props.reviewSection?.timespan}</Label>
      )}
      <Body as="div" size="xl" align="center">
        <BlockContent content={props.reviewSection?.descriptionRaw} />
      </Body>
      {props.reviewSection?.button?.buttonText && (
        <SanityButton
          size="large"
          btn={props.reviewSection.button}
          openModal={props.openModal}
        />
      )}
      {props.reviewSection?.disclaimerBottom && (
        <Body size="xs">{props.reviewSection?.disclaimerBottom}</Body>
      )}
    </Box>
  );
};

export { ReviewProcessInfo };
