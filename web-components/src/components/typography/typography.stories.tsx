import * as React from 'react';
import {
  Title,
  Subtitle,
  BodyText,
  ButtonText,
} from 'web-components/lib/components/typography';

export default {
  title: 'Typography',
  component: Title,
};

export const title = (): JSX.Element => (
  <>
    <Title variant="h1">Title H1</Title>
    <Title variant="h2">Title H2</Title>
    <Title variant="h3">Title H3</Title>
    <Title variant="h4">Title H4</Title>
    <Title variant="h5">Title H5</Title>
    <Title variant="h6" mobileVariant="h1">
      Title H6 - h1 on mobile
    </Title>
  </>
);

export const subtitle = (): JSX.Element => (
  <>
    <Subtitle size="xl">Subtitle size xl</Subtitle>
    <Subtitle size="lg">Subtitle size lg</Subtitle>
    <Subtitle size="md">Subtitle size md</Subtitle>
    <Subtitle size="sm">Subtitle size sm</Subtitle>
    <Subtitle size="xs" mobileSize="xl">
      Subtitle size xs (XL on mobile)
    </Subtitle>
  </>
);

export const body = (): JSX.Element => (
  <>
    <BodyText size="xl">BodyText size xl</BodyText>
    <BodyText size="lg">BodyText size lg</BodyText>
    <BodyText size="md">BodyText size md</BodyText>
    <BodyText size="sm">BodyText size sm</BodyText>
    <BodyText size="xs" mobileSize="xl">
      BodyText size xs (XL on mobile)
    </BodyText>
  </>
);

export const buttonText = (): JSX.Element => (
  <>
    <ButtonText size="lg">ButtonText size LG</ButtonText>
    <ButtonText>ButtonText size md (default)</ButtonText>
    <ButtonText size="sm">ButtonText size sm </ButtonText>
    <ButtonText size="xs">ButtonText size xs </ButtonText>
    <ButtonText sx={{ color: 'secondary.main', fontWeight: 400 }}>
      ButtonText with custom styles
    </ButtonText>
  </>
);
