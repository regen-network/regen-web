import * as React from 'react';
import {
  Title,
  Subtitle,
  Body,
  Label,
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
    <Body size="xl">Body size xl</Body>
    <Body size="lg">Body size lg</Body>
    <Body size="md">Body size md</Body>
    <Body size="sm">Body size sm</Body>
    <Body size="xs" mobileSize="xl">
      Body size xs (XL on mobile)
    </Body>
  </>
);

export const buttonText = (): JSX.Element => (
  <>
    <Label size="lg">Label size LG</Label>
    <Label>Label size md (default)</Label>
    <Label size="sm">Label size sm </Label>
    <Label size="xs">Label size xs </Label>
    <Label sx={{ color: 'secondary.main', fontWeight: 400 }}>
      Label with custom styles
    </Label>
  </>
);
