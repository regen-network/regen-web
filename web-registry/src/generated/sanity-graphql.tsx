import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};



export type BasicStepCardSection = {
  __typename?: 'BasicStepCardSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  stepCards?: Maybe<Array<Maybe<StepCard>>>;
};

export type BasicStepCardSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type BasicStepCardSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type Block = {
  __typename?: 'Block';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<Span>>>;
  style?: Maybe<Scalars['String']>;
  list?: Maybe<Scalars['String']>;
};

export type BooleanFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['Boolean']>;
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['Boolean']>;
};

export type BottomBanner = {
  __typename?: 'BottomBanner';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  button?: Maybe<Button>;
};

export type BottomBannerFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  button?: Maybe<ButtonFilter>;
};

export type BottomBannerSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  button?: Maybe<ButtonSorting>;
};

export type Button = {
  __typename?: 'Button';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  buttonText?: Maybe<Scalars['String']>;
  buttonLink?: Maybe<Link>;
  buttonModal?: Maybe<Scalars['Boolean']>;
  buttonBlankTarget?: Maybe<Scalars['Boolean']>;
};

export type ButtonFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  buttonText?: Maybe<StringFilter>;
  buttonLink?: Maybe<LinkFilter>;
  buttonModal?: Maybe<BooleanFilter>;
  buttonBlankTarget?: Maybe<BooleanFilter>;
};

export type ButtonSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  buttonText?: Maybe<SortOrder>;
  buttonLink?: Maybe<LinkSorting>;
  buttonModal?: Maybe<SortOrder>;
  buttonBlankTarget?: Maybe<SortOrder>;
};

export type Buyer = {
  __typename?: 'Buyer';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  heroSection?: Maybe<HeroSection>;
  resources?: Maybe<Array<Maybe<Resource>>>;
  videos?: Maybe<Array<Maybe<Media>>>;
  projectsTitle?: Maybe<Scalars['String']>;
  ctaButton?: Maybe<Button>;
};

export type BuyerFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  heroSection?: Maybe<HeroSectionFilter>;
  projectsTitle?: Maybe<StringFilter>;
  ctaButton?: Maybe<ButtonFilter>;
};

export type BuyerSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  heroSection?: Maybe<HeroSectionSorting>;
  projectsTitle?: Maybe<SortOrder>;
  ctaButton?: Maybe<ButtonSorting>;
};

export type Card = {
  __typename?: 'Card';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  icon?: Maybe<Image>;
  tooltipRaw?: Maybe<Scalars['JSON']>;
};

export type CardFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  icon?: Maybe<ImageFilter>;
};

export type CardSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  icon?: Maybe<ImageSorting>;
};

export type ConnectSection = {
  __typename?: 'ConnectSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  links?: Maybe<Array<Maybe<ConnectSectionLink>>>;
};

export type ConnectSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type ConnectSectionLink = {
  __typename?: 'ConnectSectionLink';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  icon?: Maybe<Image>;
  href?: Maybe<Link>;
};

export type ConnectSectionLinkFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  icon?: Maybe<ImageFilter>;
  href?: Maybe<LinkFilter>;
};

export type ConnectSectionLinkSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  icon?: Maybe<ImageSorting>;
  href?: Maybe<LinkSorting>;
};

export type ConnectSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type CreateCreditClassPage = Document & {
  __typename?: 'CreateCreditClassPage';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  heroSection?: Maybe<HeroSection>;
  stepCardSection?: Maybe<StepCardSection>;
  creditTypeSection?: Maybe<CreditTypeSection>;
  outcomeSection?: Maybe<HeroSection>;
  outcomes?: Maybe<Array<Maybe<EcologicalOutcome>>>;
  resources?: Maybe<Array<Maybe<Resource>>>;
  bottomBanner?: Maybe<BottomBanner>;
  footerLink?: Maybe<Scalars['String']>;
  metadata?: Maybe<PageMetadata>;
};

export type CreateCreditClassPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  heroSection?: Maybe<HeroSectionFilter>;
  stepCardSection?: Maybe<StepCardSectionFilter>;
  creditTypeSection?: Maybe<CreditTypeSectionFilter>;
  outcomeSection?: Maybe<HeroSectionFilter>;
  bottomBanner?: Maybe<BottomBannerFilter>;
  footerLink?: Maybe<StringFilter>;
  metadata?: Maybe<PageMetadataFilter>;
};

export type CreateCreditClassPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  heroSection?: Maybe<HeroSectionSorting>;
  stepCardSection?: Maybe<StepCardSectionSorting>;
  creditTypeSection?: Maybe<CreditTypeSectionSorting>;
  outcomeSection?: Maybe<HeroSectionSorting>;
  bottomBanner?: Maybe<BottomBannerSorting>;
  footerLink?: Maybe<SortOrder>;
  metadata?: Maybe<PageMetadataSorting>;
};

export type CreateMethodologyPage = Document & {
  __typename?: 'CreateMethodologyPage';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  heroSection?: Maybe<HeroSection>;
  stepCardSection?: Maybe<StepCardSection>;
  outcomeSection?: Maybe<HeroSection>;
  outcomes?: Maybe<Array<Maybe<EcologicalOutcome>>>;
  resources?: Maybe<Array<Maybe<Resource>>>;
  peerReviewSection?: Maybe<BottomBanner>;
  createCreditClassSection?: Maybe<BottomBanner>;
  footerLink?: Maybe<Scalars['String']>;
  metadata?: Maybe<PageMetadata>;
};

export type CreateMethodologyPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  heroSection?: Maybe<HeroSectionFilter>;
  stepCardSection?: Maybe<StepCardSectionFilter>;
  outcomeSection?: Maybe<HeroSectionFilter>;
  peerReviewSection?: Maybe<BottomBannerFilter>;
  createCreditClassSection?: Maybe<BottomBannerFilter>;
  footerLink?: Maybe<StringFilter>;
  metadata?: Maybe<PageMetadataFilter>;
};

export type CreateMethodologyPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  heroSection?: Maybe<HeroSectionSorting>;
  stepCardSection?: Maybe<StepCardSectionSorting>;
  outcomeSection?: Maybe<HeroSectionSorting>;
  peerReviewSection?: Maybe<BottomBannerSorting>;
  createCreditClassSection?: Maybe<BottomBannerSorting>;
  footerLink?: Maybe<SortOrder>;
  metadata?: Maybe<PageMetadataSorting>;
};

export type CreateMethodologyStepCardSection = {
  __typename?: 'CreateMethodologyStepCardSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  mainDescriptionRaw?: Maybe<Scalars['JSON']>;
  bottomTitle?: Maybe<Scalars['String']>;
  bottomDescriptionRaw?: Maybe<Scalars['JSON']>;
  stepCards?: Maybe<Array<Maybe<StepCard>>>;
};

export type CreateMethodologyStepCardSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  bottomTitle?: Maybe<StringFilter>;
};

export type CreateMethodologyStepCardSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  bottomTitle?: Maybe<SortOrder>;
};

export type CreditClass = Document & {
  __typename?: 'CreditClass';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  nameRaw?: Maybe<Scalars['JSON']>;
  /** This will be used in the credit class page url: "/credit-classes/{path}" */
  path?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  shortDescriptionRaw?: Maybe<Scalars['JSON']>;
  ecologicalImpact?: Maybe<Array<Maybe<EcologicalImpactRelation>>>;
  overviewCards?: Maybe<Array<Maybe<Card>>>;
  sdgs?: Maybe<Array<Maybe<Sdg>>>;
  buyer?: Maybe<Buyer>;
  landSteward?: Maybe<LandSteward>;
};

export type CreditClassFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  path?: Maybe<StringFilter>;
  buyer?: Maybe<BuyerFilter>;
  landSteward?: Maybe<LandStewardFilter>;
};

export type CreditClassSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  path?: Maybe<SortOrder>;
  buyer?: Maybe<BuyerSorting>;
  landSteward?: Maybe<LandStewardSorting>;
};

export type CreditTypeSection = {
  __typename?: 'CreditTypeSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subtitleTop?: Maybe<Scalars['String']>;
  descriptionTopRaw?: Maybe<Scalars['JSON']>;
  subtitleBottom?: Maybe<Scalars['String']>;
  descriptionBottomRaw?: Maybe<Scalars['JSON']>;
  institutionalCards?: Maybe<Array<Maybe<Card>>>;
  flexCreditCards?: Maybe<Array<Maybe<Card>>>;
};

export type CreditTypeSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  subtitleTop?: Maybe<StringFilter>;
  subtitleBottom?: Maybe<StringFilter>;
};

export type CreditTypeSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  subtitleTop?: Maybe<SortOrder>;
  subtitleBottom?: Maybe<SortOrder>;
};

export type CustomImage = {
  __typename?: 'CustomImage';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  imageHref?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  imageAlt?: Maybe<Scalars['String']>;
};

export type CustomImageFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  imageHref?: Maybe<StringFilter>;
  image?: Maybe<ImageFilter>;
  imageAlt?: Maybe<StringFilter>;
};

export type CustomImageSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  imageHref?: Maybe<SortOrder>;
  image?: Maybe<ImageSorting>;
  imageAlt?: Maybe<SortOrder>;
};


export type DateFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['Date']>;
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['Date']>;
  /** Checks if the value is greater than the given input. */
  gt?: Maybe<Scalars['Date']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: Maybe<Scalars['Date']>;
  /** Checks if the value is lesser than the given input. */
  lt?: Maybe<Scalars['Date']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: Maybe<Scalars['Date']>;
};


export type DatetimeFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['DateTime']>;
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['DateTime']>;
  /** Checks if the value is greater than the given input. */
  gt?: Maybe<Scalars['DateTime']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: Maybe<Scalars['DateTime']>;
  /** Checks if the value is lesser than the given input. */
  lt?: Maybe<Scalars['DateTime']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: Maybe<Scalars['DateTime']>;
};

export type Doc = Document & {
  __typename?: 'Doc';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** Optional, e.g. "Monitoring", "Marketing", "Project Plan", etc. */
  type?: Maybe<Scalars['String']>;
};

export type DocFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  href?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  type?: Maybe<StringFilter>;
};

export type DocSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  href?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  type?: Maybe<SortOrder>;
};

/** A Sanity document */
export type Document = {
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
};

export type DocumentFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
};

export type DocumentSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
};

export type Documentation = {
  __typename?: 'Documentation';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  button?: Maybe<Button>;
  image?: Maybe<CustomImage>;
};

export type DocumentationFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  button?: Maybe<ButtonFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type DocumentationSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  button?: Maybe<ButtonSorting>;
  image?: Maybe<CustomImageSorting>;
};

export type DualImageSection = {
  __typename?: 'DualImageSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  left?: Maybe<ImageBoldTextLabel>;
  right?: Maybe<ImageBoldTextLabel>;
};

export type DualImageSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  left?: Maybe<ImageBoldTextLabelFilter>;
  right?: Maybe<ImageBoldTextLabelFilter>;
};

export type DualImageSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  left?: Maybe<ImageBoldTextLabelSorting>;
  right?: Maybe<ImageBoldTextLabelSorting>;
};

export type EcologicalImpact = Document & {
  __typename?: 'EcologicalImpact';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  image?: Maybe<CustomImage>;
};

export type EcologicalImpactFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type EcologicalImpactRelation = {
  __typename?: 'EcologicalImpactRelation';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  /** Select existing ecological impact from "Shared" content */
  ecologicalImpact?: Maybe<EcologicalImpact>;
};

export type EcologicalImpactRelationFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  primary?: Maybe<BooleanFilter>;
  ecologicalImpact?: Maybe<EcologicalImpactFilter>;
};

export type EcologicalImpactRelationSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  primary?: Maybe<SortOrder>;
};

export type EcologicalImpactSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
};

export type EcologicalOutcome = Document & {
  __typename?: 'EcologicalOutcome';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  image?: Maybe<CustomImage>;
};

export type EcologicalOutcomeFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type EcologicalOutcomeSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
};

export type Faq = Document & {
  __typename?: 'Faq';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  question?: Maybe<Scalars['String']>;
  answerRaw?: Maybe<Scalars['JSON']>;
};

export type FaqFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  question?: Maybe<StringFilter>;
};

export type FaqSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  question?: Maybe<SortOrder>;
};

export type File = {
  __typename?: 'File';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  asset?: Maybe<SanityFileAsset>;
};

export type FileFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  asset?: Maybe<SanityFileAssetFilter>;
};

export type FileSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
};

export type FloatFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['Float']>;
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['Float']>;
  /** Checks if the value is greater than the given input. */
  gt?: Maybe<Scalars['Float']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: Maybe<Scalars['Float']>;
  /** Checks if the value is lesser than the given input. */
  lt?: Maybe<Scalars['Float']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: Maybe<Scalars['Float']>;
};

export type FullStepCardSection = {
  __typename?: 'FullStepCardSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  preTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  stepCards?: Maybe<Array<Maybe<StepCard>>>;
};

export type FullStepCardSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  preTitle?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type FullStepCardSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  preTitle?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type Geopoint = {
  __typename?: 'Geopoint';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  alt?: Maybe<Scalars['Float']>;
};

export type GeopointFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  lat?: Maybe<FloatFilter>;
  lng?: Maybe<FloatFilter>;
  alt?: Maybe<FloatFilter>;
};

export type GeopointSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  lat?: Maybe<SortOrder>;
  lng?: Maybe<SortOrder>;
  alt?: Maybe<SortOrder>;
};

export type HeroSection = {
  __typename?: 'HeroSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
};

export type HeroSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type HeroSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type HomePage = Document & {
  __typename?: 'HomePage';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  heroSection?: Maybe<HeroSection>;
  bottomBanner?: Maybe<BottomBanner>;
};

export type HomePageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  heroSection?: Maybe<HeroSectionFilter>;
  bottomBanner?: Maybe<BottomBannerFilter>;
};

export type HomePageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  heroSection?: Maybe<HeroSectionSorting>;
  bottomBanner?: Maybe<BottomBannerSorting>;
};

export type IdFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['ID']>;
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['ID']>;
  /** Checks if the value matches the given word/words. */
  matches?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Scalars['ID']>>;
  nin?: Maybe<Array<Scalars['ID']>>;
};

export type Image = {
  __typename?: 'Image';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  asset?: Maybe<SanityImageAsset>;
  hotspot?: Maybe<SanityImageHotspot>;
  crop?: Maybe<SanityImageCrop>;
};

export type ImageBoldTextLabel = {
  __typename?: 'ImageBoldTextLabel';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  boldText?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
};

export type ImageBoldTextLabelFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  boldText?: Maybe<StringFilter>;
  label?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type ImageBoldTextLabelSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  boldText?: Maybe<SortOrder>;
  label?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
};

export type ImageFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  asset?: Maybe<SanityImageAssetFilter>;
  hotspot?: Maybe<SanityImageHotspotFilter>;
  crop?: Maybe<SanityImageCropFilter>;
};

export type ImageItemsSection = {
  __typename?: 'ImageItemsSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  imageCards?: Maybe<Array<Maybe<Card>>>;
};

export type ImageItemsSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type ImageItemsSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type ImageSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  hotspot?: Maybe<SanityImageHotspotSorting>;
  crop?: Maybe<SanityImageCropSorting>;
};

export type IntFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['Int']>;
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['Int']>;
  /** Checks if the value is greater than the given input. */
  gt?: Maybe<Scalars['Int']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: Maybe<Scalars['Int']>;
  /** Checks if the value is lesser than the given input. */
  lt?: Maybe<Scalars['Int']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: Maybe<Scalars['Int']>;
};


export type LandSteward = {
  __typename?: 'LandSteward';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  heroSection?: Maybe<HeroSection>;
  resources?: Maybe<Array<Maybe<Resource>>>;
  videos?: Maybe<Array<Maybe<Media>>>;
  projectsTitle?: Maybe<Scalars['String']>;
  ctaButton?: Maybe<Button>;
  featuredProjectIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  steps?: Maybe<Array<Maybe<FullStepCardSection>>>;
  connectSection?: Maybe<ConnectSection>;
};

export type LandStewardFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  heroSection?: Maybe<HeroSectionFilter>;
  projectsTitle?: Maybe<StringFilter>;
  ctaButton?: Maybe<ButtonFilter>;
  connectSection?: Maybe<ConnectSectionFilter>;
};

export type LandStewardSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  heroSection?: Maybe<HeroSectionSorting>;
  projectsTitle?: Maybe<SortOrder>;
  ctaButton?: Maybe<ButtonSorting>;
  connectSection?: Maybe<ConnectSectionSorting>;
};

export type LandStewardsPage = Document & {
  __typename?: 'LandStewardsPage';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  heroSection?: Maybe<HeroSection>;
  designedForFarmersSection?: Maybe<ImageItemsSection>;
  joinFarmersSection?: Maybe<DualImageSection>;
  practicesOutcomesSection?: Maybe<PracticesOutcomesSection>;
  footerLink?: Maybe<Scalars['String']>;
  metadata?: Maybe<PageMetadata>;
};

export type LandStewardsPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  heroSection?: Maybe<HeroSectionFilter>;
  designedForFarmersSection?: Maybe<ImageItemsSectionFilter>;
  joinFarmersSection?: Maybe<DualImageSectionFilter>;
  practicesOutcomesSection?: Maybe<PracticesOutcomesSectionFilter>;
  footerLink?: Maybe<StringFilter>;
  metadata?: Maybe<PageMetadataFilter>;
};

export type LandStewardsPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  heroSection?: Maybe<HeroSectionSorting>;
  designedForFarmersSection?: Maybe<ImageItemsSectionSorting>;
  joinFarmersSection?: Maybe<DualImageSectionSorting>;
  practicesOutcomesSection?: Maybe<PracticesOutcomesSectionSorting>;
  footerLink?: Maybe<SortOrder>;
  metadata?: Maybe<PageMetadataSorting>;
};

export type Link = {
  __typename?: 'Link';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  /** This can be a relative URL (starting with "/") or full URL */
  buttonHref?: Maybe<Scalars['String']>;
  /** Select an existing document from "Shared" content instead of providing a link */
  buttonDoc?: Maybe<Doc>;
};

export type LinkFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  buttonHref?: Maybe<StringFilter>;
  buttonDoc?: Maybe<DocFilter>;
};

export type LinkSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  buttonHref?: Maybe<SortOrder>;
};

export type Media = Document & {
  __typename?: 'Media';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  image?: Maybe<CustomImage>;
  href?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type MediaFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  author?: Maybe<StringFilter>;
  date?: Maybe<DateFilter>;
  image?: Maybe<CustomImageFilter>;
  href?: Maybe<StringFilter>;
  type?: Maybe<StringFilter>;
};

export type MediaSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  author?: Maybe<SortOrder>;
  date?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
  href?: Maybe<SortOrder>;
  type?: Maybe<SortOrder>;
};

export type Methodology = Document & {
  __typename?: 'Methodology';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  nameRaw?: Maybe<Scalars['JSON']>;
  /** This will be used in the methodology page url: "/methodologies/{path}" */
  path?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  steps?: Maybe<BasicStepCardSection>;
  documentation?: Maybe<Documentation>;
  ecologicalImpact?: Maybe<Array<Maybe<EcologicalImpactRelation>>>;
  resources?: Maybe<Array<Maybe<Resource>>>;
  bottomSection?: Maybe<HeroSection>;
};

export type MethodologyFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  path?: Maybe<StringFilter>;
  steps?: Maybe<BasicStepCardSectionFilter>;
  documentation?: Maybe<DocumentationFilter>;
  bottomSection?: Maybe<HeroSectionFilter>;
};

export type MethodologyReviewProcessPage = Document & {
  __typename?: 'MethodologyReviewProcessPage';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  heroSection?: Maybe<HeroSection>;
  internalReviewSection?: Maybe<ReviewSection>;
  externalReviewSection?: Maybe<ReviewSection>;
  bottomBanner?: Maybe<BottomBanner>;
  metadata?: Maybe<PageMetadata>;
};

export type MethodologyReviewProcessPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  heroSection?: Maybe<HeroSectionFilter>;
  internalReviewSection?: Maybe<ReviewSectionFilter>;
  externalReviewSection?: Maybe<ReviewSectionFilter>;
  bottomBanner?: Maybe<BottomBannerFilter>;
  metadata?: Maybe<PageMetadataFilter>;
};

export type MethodologyReviewProcessPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  heroSection?: Maybe<HeroSectionSorting>;
  internalReviewSection?: Maybe<ReviewSectionSorting>;
  externalReviewSection?: Maybe<ReviewSectionSorting>;
  bottomBanner?: Maybe<BottomBannerSorting>;
  metadata?: Maybe<PageMetadataSorting>;
};

export type MethodologySorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  path?: Maybe<SortOrder>;
  steps?: Maybe<BasicStepCardSectionSorting>;
  documentation?: Maybe<DocumentationSorting>;
  bottomSection?: Maybe<HeroSectionSorting>;
};

export type PageMetadata = {
  __typename?: 'PageMetadata';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  /** This description populates meta-tags on the webpage */
  description?: Maybe<Scalars['String']>;
  openGraphImage?: Maybe<Image>;
};

export type PageMetadataFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  openGraphImage?: Maybe<ImageFilter>;
};

export type PageMetadataSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  openGraphImage?: Maybe<ImageSorting>;
};

export type PracticesOutcomesSection = {
  __typename?: 'PracticesOutcomesSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  practices?: Maybe<ImageItemsSection>;
  outcomes?: Maybe<ImageItemsSection>;
};

export type PracticesOutcomesSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  note?: Maybe<StringFilter>;
  practices?: Maybe<ImageItemsSectionFilter>;
  outcomes?: Maybe<ImageItemsSectionFilter>;
};

export type PracticesOutcomesSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  note?: Maybe<SortOrder>;
  practices?: Maybe<ImageItemsSectionSorting>;
  outcomes?: Maybe<ImageItemsSectionSorting>;
};

export type Resource = Document & {
  __typename?: 'Resource';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  titleRaw?: Maybe<Scalars['JSON']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  image?: Maybe<CustomImage>;
  button?: Maybe<Button>;
  /** If not provided, the "last updated" date displayed will be the stored updated_at date of this Resource item or corresponding Document item */
  lastUpdated?: Maybe<Scalars['Date']>;
};

export type ResourceFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
  button?: Maybe<ButtonFilter>;
  lastUpdated?: Maybe<DateFilter>;
};

export type ResourceSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
  button?: Maybe<ButtonSorting>;
  lastUpdated?: Maybe<SortOrder>;
};

export type ReviewSection = {
  __typename?: 'ReviewSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  timespan?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  button?: Maybe<Button>;
  disclaimerTop?: Maybe<Scalars['String']>;
  disclaimerBottom?: Maybe<Scalars['String']>;
  stepCardsSubsections?: Maybe<Array<Maybe<BasicStepCardSection>>>;
};

export type ReviewSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  timespan?: Maybe<StringFilter>;
  button?: Maybe<ButtonFilter>;
  disclaimerTop?: Maybe<StringFilter>;
  disclaimerBottom?: Maybe<StringFilter>;
};

export type ReviewSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  timespan?: Maybe<SortOrder>;
  button?: Maybe<ButtonSorting>;
  disclaimerTop?: Maybe<SortOrder>;
  disclaimerBottom?: Maybe<SortOrder>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  Resource?: Maybe<Resource>;
  Faq?: Maybe<Faq>;
  Doc?: Maybe<Doc>;
  EcologicalImpact?: Maybe<EcologicalImpact>;
  Media?: Maybe<Media>;
  Sdg?: Maybe<Sdg>;
  EcologicalOutcome?: Maybe<EcologicalOutcome>;
  HomePage?: Maybe<HomePage>;
  CreateCreditClassPage?: Maybe<CreateCreditClassPage>;
  CreateMethodologyPage?: Maybe<CreateMethodologyPage>;
  MethodologyReviewProcessPage?: Maybe<MethodologyReviewProcessPage>;
  Methodology?: Maybe<Methodology>;
  CreditClass?: Maybe<CreditClass>;
  LandStewardsPage?: Maybe<LandStewardsPage>;
  SanityImageAsset?: Maybe<SanityImageAsset>;
  SanityFileAsset?: Maybe<SanityFileAsset>;
  Document?: Maybe<Document>;
  allResource: Array<Resource>;
  allFaq: Array<Faq>;
  allDoc: Array<Doc>;
  allEcologicalImpact: Array<EcologicalImpact>;
  allMedia: Array<Media>;
  allSdg: Array<Sdg>;
  allEcologicalOutcome: Array<EcologicalOutcome>;
  allHomePage: Array<HomePage>;
  allCreateCreditClassPage: Array<CreateCreditClassPage>;
  allCreateMethodologyPage: Array<CreateMethodologyPage>;
  allMethodologyReviewProcessPage: Array<MethodologyReviewProcessPage>;
  allMethodology: Array<Methodology>;
  allCreditClass: Array<CreditClass>;
  allLandStewardsPage: Array<LandStewardsPage>;
  allSanityImageAsset: Array<SanityImageAsset>;
  allSanityFileAsset: Array<SanityFileAsset>;
  allDocument: Array<Document>;
};


export type RootQueryResourceArgs = {
  id: Scalars['ID'];
};


export type RootQueryFaqArgs = {
  id: Scalars['ID'];
};


export type RootQueryDocArgs = {
  id: Scalars['ID'];
};


export type RootQueryEcologicalImpactArgs = {
  id: Scalars['ID'];
};


export type RootQueryMediaArgs = {
  id: Scalars['ID'];
};


export type RootQuerySdgArgs = {
  id: Scalars['ID'];
};


export type RootQueryEcologicalOutcomeArgs = {
  id: Scalars['ID'];
};


export type RootQueryHomePageArgs = {
  id: Scalars['ID'];
};


export type RootQueryCreateCreditClassPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryCreateMethodologyPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryMethodologyReviewProcessPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryMethodologyArgs = {
  id: Scalars['ID'];
};


export type RootQueryCreditClassArgs = {
  id: Scalars['ID'];
};


export type RootQueryLandStewardsPageArgs = {
  id: Scalars['ID'];
};


export type RootQuerySanityImageAssetArgs = {
  id: Scalars['ID'];
};


export type RootQuerySanityFileAssetArgs = {
  id: Scalars['ID'];
};


export type RootQueryDocumentArgs = {
  id: Scalars['ID'];
};


export type RootQueryAllResourceArgs = {
  where?: Maybe<ResourceFilter>;
  sort?: Maybe<Array<ResourceSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllFaqArgs = {
  where?: Maybe<FaqFilter>;
  sort?: Maybe<Array<FaqSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllDocArgs = {
  where?: Maybe<DocFilter>;
  sort?: Maybe<Array<DocSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllEcologicalImpactArgs = {
  where?: Maybe<EcologicalImpactFilter>;
  sort?: Maybe<Array<EcologicalImpactSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllMediaArgs = {
  where?: Maybe<MediaFilter>;
  sort?: Maybe<Array<MediaSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllSdgArgs = {
  where?: Maybe<SdgFilter>;
  sort?: Maybe<Array<SdgSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllEcologicalOutcomeArgs = {
  where?: Maybe<EcologicalOutcomeFilter>;
  sort?: Maybe<Array<EcologicalOutcomeSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllHomePageArgs = {
  where?: Maybe<HomePageFilter>;
  sort?: Maybe<Array<HomePageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllCreateCreditClassPageArgs = {
  where?: Maybe<CreateCreditClassPageFilter>;
  sort?: Maybe<Array<CreateCreditClassPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllCreateMethodologyPageArgs = {
  where?: Maybe<CreateMethodologyPageFilter>;
  sort?: Maybe<Array<CreateMethodologyPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllMethodologyReviewProcessPageArgs = {
  where?: Maybe<MethodologyReviewProcessPageFilter>;
  sort?: Maybe<Array<MethodologyReviewProcessPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllMethodologyArgs = {
  where?: Maybe<MethodologyFilter>;
  sort?: Maybe<Array<MethodologySorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllCreditClassArgs = {
  where?: Maybe<CreditClassFilter>;
  sort?: Maybe<Array<CreditClassSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllLandStewardsPageArgs = {
  where?: Maybe<LandStewardsPageFilter>;
  sort?: Maybe<Array<LandStewardsPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllSanityImageAssetArgs = {
  where?: Maybe<SanityImageAssetFilter>;
  sort?: Maybe<Array<SanityImageAssetSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllSanityFileAssetArgs = {
  where?: Maybe<SanityFileAssetFilter>;
  sort?: Maybe<Array<SanityFileAssetSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllDocumentArgs = {
  where?: Maybe<DocumentFilter>;
  sort?: Maybe<Array<DocumentSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type SanityAssetSourceData = {
  __typename?: 'SanityAssetSourceData';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  /** A canonical name for the source this asset is originating from */
  name?: Maybe<Scalars['String']>;
  /** The unique ID for the asset within the originating source so you can programatically find back to it */
  id?: Maybe<Scalars['String']>;
  /** A URL to find more information about this asset in the originating source */
  url?: Maybe<Scalars['String']>;
};

export type SanityAssetSourceDataFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  url?: Maybe<StringFilter>;
};

export type SanityAssetSourceDataSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  url?: Maybe<SortOrder>;
};

export type SanityFileAsset = Document & {
  __typename?: 'SanityFileAsset';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  originalFilename?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
  sha1hash?: Maybe<Scalars['String']>;
  extension?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  source?: Maybe<SanityAssetSourceData>;
};

export type SanityFileAssetFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  originalFilename?: Maybe<StringFilter>;
  label?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  altText?: Maybe<StringFilter>;
  sha1hash?: Maybe<StringFilter>;
  extension?: Maybe<StringFilter>;
  mimeType?: Maybe<StringFilter>;
  size?: Maybe<FloatFilter>;
  assetId?: Maybe<StringFilter>;
  path?: Maybe<StringFilter>;
  url?: Maybe<StringFilter>;
  source?: Maybe<SanityAssetSourceDataFilter>;
};

export type SanityFileAssetSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  originalFilename?: Maybe<SortOrder>;
  label?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  altText?: Maybe<SortOrder>;
  sha1hash?: Maybe<SortOrder>;
  extension?: Maybe<SortOrder>;
  mimeType?: Maybe<SortOrder>;
  size?: Maybe<SortOrder>;
  assetId?: Maybe<SortOrder>;
  path?: Maybe<SortOrder>;
  url?: Maybe<SortOrder>;
  source?: Maybe<SanityAssetSourceDataSorting>;
};

export type SanityImageAsset = Document & {
  __typename?: 'SanityImageAsset';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  originalFilename?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
  sha1hash?: Maybe<Scalars['String']>;
  extension?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  metadata?: Maybe<SanityImageMetadata>;
  source?: Maybe<SanityAssetSourceData>;
};

export type SanityImageAssetFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  originalFilename?: Maybe<StringFilter>;
  label?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  altText?: Maybe<StringFilter>;
  sha1hash?: Maybe<StringFilter>;
  extension?: Maybe<StringFilter>;
  mimeType?: Maybe<StringFilter>;
  size?: Maybe<FloatFilter>;
  assetId?: Maybe<StringFilter>;
  path?: Maybe<StringFilter>;
  url?: Maybe<StringFilter>;
  metadata?: Maybe<SanityImageMetadataFilter>;
  source?: Maybe<SanityAssetSourceDataFilter>;
};

export type SanityImageAssetSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  originalFilename?: Maybe<SortOrder>;
  label?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  altText?: Maybe<SortOrder>;
  sha1hash?: Maybe<SortOrder>;
  extension?: Maybe<SortOrder>;
  mimeType?: Maybe<SortOrder>;
  size?: Maybe<SortOrder>;
  assetId?: Maybe<SortOrder>;
  path?: Maybe<SortOrder>;
  url?: Maybe<SortOrder>;
  metadata?: Maybe<SanityImageMetadataSorting>;
  source?: Maybe<SanityAssetSourceDataSorting>;
};

export type SanityImageCrop = {
  __typename?: 'SanityImageCrop';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  top?: Maybe<Scalars['Float']>;
  bottom?: Maybe<Scalars['Float']>;
  left?: Maybe<Scalars['Float']>;
  right?: Maybe<Scalars['Float']>;
};

export type SanityImageCropFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  top?: Maybe<FloatFilter>;
  bottom?: Maybe<FloatFilter>;
  left?: Maybe<FloatFilter>;
  right?: Maybe<FloatFilter>;
};

export type SanityImageCropSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  top?: Maybe<SortOrder>;
  bottom?: Maybe<SortOrder>;
  left?: Maybe<SortOrder>;
  right?: Maybe<SortOrder>;
};

export type SanityImageDimensions = {
  __typename?: 'SanityImageDimensions';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type SanityImageDimensionsFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  height?: Maybe<FloatFilter>;
  width?: Maybe<FloatFilter>;
  aspectRatio?: Maybe<FloatFilter>;
};

export type SanityImageDimensionsSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  height?: Maybe<SortOrder>;
  width?: Maybe<SortOrder>;
  aspectRatio?: Maybe<SortOrder>;
};

export type SanityImageHotspot = {
  __typename?: 'SanityImageHotspot';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type SanityImageHotspotFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  x?: Maybe<FloatFilter>;
  y?: Maybe<FloatFilter>;
  height?: Maybe<FloatFilter>;
  width?: Maybe<FloatFilter>;
};

export type SanityImageHotspotSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  x?: Maybe<SortOrder>;
  y?: Maybe<SortOrder>;
  height?: Maybe<SortOrder>;
  width?: Maybe<SortOrder>;
};

export type SanityImageMetadata = {
  __typename?: 'SanityImageMetadata';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  location?: Maybe<Geopoint>;
  dimensions?: Maybe<SanityImageDimensions>;
  palette?: Maybe<SanityImagePalette>;
  lqip?: Maybe<Scalars['String']>;
  hasAlpha?: Maybe<Scalars['Boolean']>;
  isOpaque?: Maybe<Scalars['Boolean']>;
};

export type SanityImageMetadataFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  location?: Maybe<GeopointFilter>;
  dimensions?: Maybe<SanityImageDimensionsFilter>;
  palette?: Maybe<SanityImagePaletteFilter>;
  lqip?: Maybe<StringFilter>;
  hasAlpha?: Maybe<BooleanFilter>;
  isOpaque?: Maybe<BooleanFilter>;
};

export type SanityImageMetadataSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  location?: Maybe<GeopointSorting>;
  dimensions?: Maybe<SanityImageDimensionsSorting>;
  palette?: Maybe<SanityImagePaletteSorting>;
  lqip?: Maybe<SortOrder>;
  hasAlpha?: Maybe<SortOrder>;
  isOpaque?: Maybe<SortOrder>;
};

export type SanityImagePalette = {
  __typename?: 'SanityImagePalette';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  darkMuted?: Maybe<SanityImagePaletteSwatch>;
  lightVibrant?: Maybe<SanityImagePaletteSwatch>;
  darkVibrant?: Maybe<SanityImagePaletteSwatch>;
  vibrant?: Maybe<SanityImagePaletteSwatch>;
  dominant?: Maybe<SanityImagePaletteSwatch>;
  lightMuted?: Maybe<SanityImagePaletteSwatch>;
  muted?: Maybe<SanityImagePaletteSwatch>;
};

export type SanityImagePaletteFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  darkMuted?: Maybe<SanityImagePaletteSwatchFilter>;
  lightVibrant?: Maybe<SanityImagePaletteSwatchFilter>;
  darkVibrant?: Maybe<SanityImagePaletteSwatchFilter>;
  vibrant?: Maybe<SanityImagePaletteSwatchFilter>;
  dominant?: Maybe<SanityImagePaletteSwatchFilter>;
  lightMuted?: Maybe<SanityImagePaletteSwatchFilter>;
  muted?: Maybe<SanityImagePaletteSwatchFilter>;
};

export type SanityImagePaletteSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  darkMuted?: Maybe<SanityImagePaletteSwatchSorting>;
  lightVibrant?: Maybe<SanityImagePaletteSwatchSorting>;
  darkVibrant?: Maybe<SanityImagePaletteSwatchSorting>;
  vibrant?: Maybe<SanityImagePaletteSwatchSorting>;
  dominant?: Maybe<SanityImagePaletteSwatchSorting>;
  lightMuted?: Maybe<SanityImagePaletteSwatchSorting>;
  muted?: Maybe<SanityImagePaletteSwatchSorting>;
};

export type SanityImagePaletteSwatch = {
  __typename?: 'SanityImagePaletteSwatch';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  background?: Maybe<Scalars['String']>;
  foreground?: Maybe<Scalars['String']>;
  population?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
};

export type SanityImagePaletteSwatchFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  background?: Maybe<StringFilter>;
  foreground?: Maybe<StringFilter>;
  population?: Maybe<FloatFilter>;
  title?: Maybe<StringFilter>;
};

export type SanityImagePaletteSwatchSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  background?: Maybe<SortOrder>;
  foreground?: Maybe<SortOrder>;
  population?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type Sanity_DocumentFilter = {
  /** All documents referencing the given document ID. */
  references?: Maybe<Scalars['ID']>;
  /** All documents that are drafts. */
  is_draft?: Maybe<Scalars['Boolean']>;
};

export type Sdg = Document & {
  __typename?: 'Sdg';
  /** Document ID */
  _id?: Maybe<Scalars['ID']>;
  /** Document type */
  _type?: Maybe<Scalars['String']>;
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>;
  _key?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
};

export type SdgFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type SdgSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
};

export type Slug = {
  __typename?: 'Slug';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  current?: Maybe<Scalars['String']>;
};

export type SlugFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  current?: Maybe<StringFilter>;
};

export type SlugSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  current?: Maybe<SortOrder>;
};

export enum SortOrder {
  /** Sorts on the value in ascending order. */
  Asc = 'ASC',
  /** Sorts on the value in descending order. */
  Desc = 'DESC'
}

export type Span = {
  __typename?: 'Span';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  marks?: Maybe<Array<Maybe<Scalars['String']>>>;
  text?: Maybe<Scalars['String']>;
};

export type StepCard = {
  __typename?: 'StepCard';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  icon?: Maybe<Image>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  button?: Maybe<Button>;
  tagName?: Maybe<Scalars['String']>;
  faqs?: Maybe<Array<Maybe<Faq>>>;
  image?: Maybe<CustomImage>;
  videoSrc?: Maybe<Scalars['String']>;
};

export type StepCardFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  isActive?: Maybe<BooleanFilter>;
  icon?: Maybe<ImageFilter>;
  title?: Maybe<StringFilter>;
  button?: Maybe<ButtonFilter>;
  tagName?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
  videoSrc?: Maybe<StringFilter>;
};

export type StepCardSection = {
  __typename?: 'StepCardSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  stepCards?: Maybe<Array<Maybe<StepCard>>>;
};

export type StepCardSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type StepCardSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type StepCardSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  isActive?: Maybe<SortOrder>;
  icon?: Maybe<ImageSorting>;
  title?: Maybe<SortOrder>;
  button?: Maybe<ButtonSorting>;
  tagName?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
  videoSrc?: Maybe<SortOrder>;
};

export type StringFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['String']>;
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['String']>;
  /** Checks if the value matches the given word/words. */
  matches?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  nin?: Maybe<Array<Scalars['String']>>;
};

export type AllCreateCreditClassPageQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCreateCreditClassPageQuery = (
  { __typename?: 'RootQuery' }
  & { allCreateCreditClassPage: Array<(
    { __typename?: 'CreateCreditClassPage' }
    & Pick<CreateCreditClassPage, 'footerLink'>
    & { heroSection?: Maybe<(
      { __typename?: 'HeroSection' }
      & HeroSectionFieldsFragment
    )>, stepCardSection?: Maybe<(
      { __typename?: 'StepCardSection' }
      & Pick<StepCardSection, 'title' | 'descriptionRaw'>
      & { stepCards?: Maybe<Array<Maybe<(
        { __typename?: 'StepCard' }
        & StepCardFieldsFragment
      )>>> }
    )>, creditTypeSection?: Maybe<(
      { __typename?: 'CreditTypeSection' }
      & Pick<CreditTypeSection, 'title' | 'subtitleTop' | 'descriptionTopRaw' | 'subtitleBottom' | 'descriptionBottomRaw'>
      & { institutionalCards?: Maybe<Array<Maybe<(
        { __typename?: 'Card' }
        & CardFieldsFragment
      )>>>, flexCreditCards?: Maybe<Array<Maybe<(
        { __typename?: 'Card' }
        & CardFieldsFragment
      )>>> }
    )>, outcomeSection?: Maybe<(
      { __typename?: 'HeroSection' }
      & HeroSectionFieldsFragment
    )>, outcomes?: Maybe<Array<Maybe<(
      { __typename?: 'EcologicalOutcome' }
      & EcologicalOutcomeFieldsFragment
    )>>>, resources?: Maybe<Array<Maybe<(
      { __typename?: 'Resource' }
      & ResourceFieldsFragment
    )>>>, bottomBanner?: Maybe<(
      { __typename?: 'BottomBanner' }
      & BottomBannerFieldsFragment
    )>, metadata?: Maybe<(
      { __typename?: 'PageMetadata' }
      & PageMetadataFieldsFragment
    )> }
  )> }
);

export type AllCreateMethodologyPageQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCreateMethodologyPageQuery = (
  { __typename?: 'RootQuery' }
  & { allCreateMethodologyPage: Array<(
    { __typename?: 'CreateMethodologyPage' }
    & Pick<CreateMethodologyPage, 'footerLink'>
    & { heroSection?: Maybe<(
      { __typename?: 'HeroSection' }
      & HeroSectionFieldsFragment
    )>, stepCardSection?: Maybe<(
      { __typename?: 'StepCardSection' }
      & Pick<StepCardSection, 'title' | 'descriptionRaw'>
      & { stepCards?: Maybe<Array<Maybe<(
        { __typename?: 'StepCard' }
        & StepCardFieldsFragment
      )>>> }
    )>, outcomeSection?: Maybe<(
      { __typename?: 'HeroSection' }
      & HeroSectionFieldsFragment
    )>, outcomes?: Maybe<Array<Maybe<(
      { __typename?: 'EcologicalOutcome' }
      & EcologicalOutcomeFieldsFragment
    )>>>, resources?: Maybe<Array<Maybe<(
      { __typename?: 'Resource' }
      & ResourceFieldsFragment
    )>>>, peerReviewSection?: Maybe<(
      { __typename?: 'BottomBanner' }
      & BottomBannerFieldsFragment
    )>, createCreditClassSection?: Maybe<(
      { __typename?: 'BottomBanner' }
      & BottomBannerFieldsFragment
    )>, metadata?: Maybe<(
      { __typename?: 'PageMetadata' }
      & PageMetadataFieldsFragment
    )> }
  )> }
);

export type AllCreditClassQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCreditClassQuery = (
  { __typename?: 'RootQuery' }
  & { allCreditClass: Array<(
    { __typename?: 'CreditClass' }
    & Pick<CreditClass, 'path' | 'nameRaw' | 'descriptionRaw' | 'shortDescriptionRaw'>
    & { ecologicalImpact?: Maybe<Array<Maybe<(
      { __typename?: 'EcologicalImpactRelation' }
      & EcologicalImpactRelationFieldsFragment
    )>>>, overviewCards?: Maybe<Array<Maybe<(
      { __typename?: 'Card' }
      & CardFieldsFragment
    )>>>, sdgs?: Maybe<Array<Maybe<(
      { __typename?: 'Sdg' }
      & Pick<Sdg, 'title'>
      & { image?: Maybe<(
        { __typename?: 'CustomImage' }
        & CustomImageFieldsFragment
      )> }
    )>>>, buyer?: Maybe<(
      { __typename?: 'Buyer' }
      & Pick<Buyer, 'projectsTitle'>
      & { heroSection?: Maybe<(
        { __typename?: 'HeroSection' }
        & HeroSectionFieldsFragment
      )>, resources?: Maybe<Array<Maybe<(
        { __typename?: 'Resource' }
        & ResourceFieldsFragment
      )>>>, videos?: Maybe<Array<Maybe<(
        { __typename?: 'Media' }
        & MediaFieldsFragment
      )>>>, ctaButton?: Maybe<(
        { __typename?: 'Button' }
        & ButtonFieldsFragment
      )> }
    )>, landSteward?: Maybe<(
      { __typename?: 'LandSteward' }
      & Pick<LandSteward, 'projectsTitle' | 'featuredProjectIds'>
      & { heroSection?: Maybe<(
        { __typename?: 'HeroSection' }
        & HeroSectionFieldsFragment
      )>, resources?: Maybe<Array<Maybe<(
        { __typename?: 'Resource' }
        & ResourceFieldsFragment
      )>>>, videos?: Maybe<Array<Maybe<(
        { __typename?: 'Media' }
        & MediaFieldsFragment
      )>>>, ctaButton?: Maybe<(
        { __typename?: 'Button' }
        & ButtonFieldsFragment
      )>, steps?: Maybe<Array<Maybe<(
        { __typename?: 'FullStepCardSection' }
        & Pick<FullStepCardSection, 'preTitle' | 'title' | 'descriptionRaw'>
        & { stepCards?: Maybe<Array<Maybe<(
          { __typename?: 'StepCard' }
          & StepCardFieldsFragment
        )>>> }
      )>>>, connectSection?: Maybe<(
        { __typename?: 'ConnectSection' }
        & Pick<ConnectSection, 'title'>
        & { links?: Maybe<Array<Maybe<(
          { __typename?: 'ConnectSectionLink' }
          & Pick<ConnectSectionLink, 'name' | 'descriptionRaw'>
          & { icon?: Maybe<(
            { __typename?: 'Image' }
            & { asset?: Maybe<(
              { __typename?: 'SanityImageAsset' }
              & Pick<SanityImageAsset, 'url'>
            )> }
          )>, href?: Maybe<(
            { __typename?: 'Link' }
            & LinkFieldsFragment
          )> }
        )>>> }
      )> }
    )> }
  )> }
);

export type AllHomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type AllHomePageQuery = (
  { __typename?: 'RootQuery' }
  & { allHomePage: Array<(
    { __typename?: 'HomePage' }
    & { heroSection?: Maybe<(
      { __typename?: 'HeroSection' }
      & HeroSectionFieldsFragment
    )>, bottomBanner?: Maybe<(
      { __typename?: 'BottomBanner' }
      & BottomBannerFieldsFragment
    )> }
  )> }
);

export type AllLandStewardsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type AllLandStewardsPageQuery = (
  { __typename?: 'RootQuery' }
  & { allLandStewardsPage: Array<(
    { __typename?: 'LandStewardsPage' }
    & Pick<LandStewardsPage, 'footerLink'>
    & { heroSection?: Maybe<(
      { __typename?: 'HeroSection' }
      & HeroSectionFieldsFragment
    )>, designedForFarmersSection?: Maybe<(
      { __typename?: 'ImageItemsSection' }
      & Pick<ImageItemsSection, 'title'>
      & { imageCards?: Maybe<Array<Maybe<(
        { __typename?: 'Card' }
        & CardFieldsFragment
      )>>> }
    )>, joinFarmersSection?: Maybe<(
      { __typename?: 'DualImageSection' }
      & Pick<DualImageSection, 'title'>
      & { left?: Maybe<(
        { __typename?: 'ImageBoldTextLabel' }
        & ImageBoldTextLabelFieldsFragment
      )>, right?: Maybe<(
        { __typename?: 'ImageBoldTextLabel' }
        & ImageBoldTextLabelFieldsFragment
      )> }
    )>, practicesOutcomesSection?: Maybe<(
      { __typename?: 'PracticesOutcomesSection' }
      & Pick<PracticesOutcomesSection, 'title' | 'note'>
      & { practices?: Maybe<(
        { __typename?: 'ImageItemsSection' }
        & Pick<ImageItemsSection, 'title'>
        & { imageCards?: Maybe<Array<Maybe<(
          { __typename?: 'Card' }
          & CardFieldsFragment
        )>>> }
      )>, outcomes?: Maybe<(
        { __typename?: 'ImageItemsSection' }
        & Pick<ImageItemsSection, 'title'>
        & { imageCards?: Maybe<Array<Maybe<(
          { __typename?: 'Card' }
          & CardFieldsFragment
        )>>> }
      )> }
    )>, metadata?: Maybe<(
      { __typename?: 'PageMetadata' }
      & PageMetadataFieldsFragment
    )> }
  )> }
);

export type AllMethodologyQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMethodologyQuery = (
  { __typename?: 'RootQuery' }
  & { allMethodology: Array<(
    { __typename?: 'Methodology' }
    & Pick<Methodology, 'path' | 'nameRaw' | 'descriptionRaw'>
    & { steps?: Maybe<(
      { __typename?: 'BasicStepCardSection' }
      & BasicStepCardSectionFieldsFragment
    )>, documentation?: Maybe<(
      { __typename?: 'Documentation' }
      & Pick<Documentation, 'title'>
      & { button?: Maybe<(
        { __typename?: 'Button' }
        & ButtonFieldsFragment
      )>, image?: Maybe<(
        { __typename?: 'CustomImage' }
        & CustomImageFieldsFragment
      )> }
    )>, ecologicalImpact?: Maybe<Array<Maybe<(
      { __typename?: 'EcologicalImpactRelation' }
      & EcologicalImpactRelationFieldsFragment
    )>>>, resources?: Maybe<Array<Maybe<(
      { __typename?: 'Resource' }
      & ResourceFieldsFragment
    )>>>, bottomSection?: Maybe<(
      { __typename?: 'HeroSection' }
      & HeroSectionFieldsFragment
    )> }
  )> }
);

export type ReviewSectionFieldsFragment = (
  { __typename?: 'ReviewSection' }
  & Pick<ReviewSection, 'title' | 'timespan' | 'descriptionRaw' | 'disclaimerTop' | 'disclaimerBottom'>
  & { button?: Maybe<(
    { __typename?: 'Button' }
    & ButtonFieldsFragment
  )>, stepCardsSubsections?: Maybe<Array<Maybe<(
    { __typename?: 'BasicStepCardSection' }
    & BasicStepCardSectionFieldsFragment
  )>>> }
);

export type AllMethodologyReviewProcessPageQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMethodologyReviewProcessPageQuery = (
  { __typename?: 'RootQuery' }
  & { allMethodologyReviewProcessPage: Array<(
    { __typename?: 'MethodologyReviewProcessPage' }
    & { heroSection?: Maybe<(
      { __typename?: 'HeroSection' }
      & HeroSectionFieldsFragment
    )>, internalReviewSection?: Maybe<(
      { __typename?: 'ReviewSection' }
      & ReviewSectionFieldsFragment
    )>, externalReviewSection?: Maybe<(
      { __typename?: 'ReviewSection' }
      & ReviewSectionFieldsFragment
    )>, bottomBanner?: Maybe<(
      { __typename?: 'BottomBanner' }
      & BottomBannerFieldsFragment
    )>, metadata?: Maybe<(
      { __typename?: 'PageMetadata' }
      & PageMetadataFieldsFragment
    )> }
  )> }
);

export type BasicStepCardSectionFieldsFragment = (
  { __typename?: 'BasicStepCardSection' }
  & Pick<BasicStepCardSection, 'title'>
  & { stepCards?: Maybe<Array<Maybe<(
    { __typename?: 'StepCard' }
    & StepCardFieldsFragment
  )>>> }
);

export type BottomBannerFieldsFragment = (
  { __typename?: 'BottomBanner' }
  & Pick<BottomBanner, 'title' | 'descriptionRaw'>
  & { button?: Maybe<(
    { __typename?: 'Button' }
    & ButtonFieldsFragment
  )> }
);

export type ButtonFieldsFragment = (
  { __typename?: 'Button' }
  & Pick<Button, 'buttonText' | 'buttonModal' | 'buttonBlankTarget'>
  & { buttonLink?: Maybe<(
    { __typename?: 'Link' }
    & LinkFieldsFragment
  )> }
);

export type CardFieldsFragment = (
  { __typename?: 'Card' }
  & Pick<Card, 'title' | 'descriptionRaw'>
  & { icon?: Maybe<(
    { __typename?: 'Image' }
    & { asset?: Maybe<(
      { __typename?: 'SanityImageAsset' }
      & Pick<SanityImageAsset, 'url'>
    )> }
  )> }
);

export type CustomImageFieldsFragment = (
  { __typename?: 'CustomImage' }
  & Pick<CustomImage, 'imageAlt' | 'imageHref'>
  & { image?: Maybe<(
    { __typename?: 'Image' }
    & { asset?: Maybe<(
      { __typename?: 'SanityImageAsset' }
      & Pick<SanityImageAsset, 'altText' | 'url'>
    )> }
  )> }
);

export type EcologicalImpactRelationFieldsFragment = (
  { __typename?: 'EcologicalImpactRelation' }
  & Pick<EcologicalImpactRelation, 'primary'>
  & { ecologicalImpact?: Maybe<(
    { __typename?: 'EcologicalImpact' }
    & Pick<EcologicalImpact, 'name' | 'descriptionRaw'>
    & { image?: Maybe<(
      { __typename?: 'CustomImage' }
      & CustomImageFieldsFragment
    )> }
  )> }
);

export type EcologicalOutcomeFieldsFragment = (
  { __typename?: 'EcologicalOutcome' }
  & Pick<EcologicalOutcome, 'title' | 'descriptionRaw'>
  & { image?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
  )> }
);

export type HeroSectionFieldsFragment = (
  { __typename?: 'HeroSection' }
  & Pick<HeroSection, 'title' | 'descriptionRaw'>
);

export type ImageBoldTextLabelFieldsFragment = (
  { __typename?: 'ImageBoldTextLabel' }
  & Pick<ImageBoldTextLabel, 'boldText' | 'label'>
  & { image?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
  )> }
);

export type LinkFieldsFragment = (
  { __typename?: 'Link' }
  & Pick<Link, 'buttonHref'>
  & { buttonDoc?: Maybe<(
    { __typename?: 'Doc' }
    & Pick<Doc, 'href'>
  )> }
);

export type MediaFieldsFragment = (
  { __typename?: 'Media' }
  & Pick<Media, 'title' | 'author' | 'date' | 'href' | 'type'>
  & { image?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
  )> }
);

export type PageMetadataFieldsFragment = (
  { __typename?: 'PageMetadata' }
  & Pick<PageMetadata, 'description'>
  & { openGraphImage?: Maybe<(
    { __typename?: 'Image' }
    & { asset?: Maybe<(
      { __typename?: 'SanityImageAsset' }
      & Pick<SanityImageAsset, 'url'>
    )> }
  )> }
);

export type ResourceFieldsFragment = (
  { __typename?: 'Resource' }
  & Pick<Resource, '_updatedAt' | 'titleRaw' | 'descriptionRaw' | 'lastUpdated'>
  & { image?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
  )>, button?: Maybe<(
    { __typename?: 'Button' }
    & ButtonFieldsFragment
  )> }
);

export type StepCardFieldsFragment = (
  { __typename?: 'StepCard' }
  & Pick<StepCard, 'isActive' | 'title' | 'descriptionRaw' | 'tagName' | 'videoSrc'>
  & { icon?: Maybe<(
    { __typename?: 'Image' }
    & { asset?: Maybe<(
      { __typename?: 'SanityImageAsset' }
      & Pick<SanityImageAsset, 'url'>
    )> }
  )>, button?: Maybe<(
    { __typename?: 'Button' }
    & ButtonFieldsFragment
  )>, faqs?: Maybe<Array<Maybe<(
    { __typename?: 'Faq' }
    & Pick<Faq, 'question' | 'answerRaw'>
  )>>>, image?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
  )> }
);

export const LinkFieldsFragmentDoc = gql`
    fragment linkFields on Link {
  buttonHref
  buttonDoc {
    href
  }
}
    `;
export const ButtonFieldsFragmentDoc = gql`
    fragment buttonFields on Button {
  buttonText
  buttonLink {
    ...linkFields
  }
  buttonModal
  buttonBlankTarget
}
    ${LinkFieldsFragmentDoc}`;
export const CustomImageFieldsFragmentDoc = gql`
    fragment customImageFields on CustomImage {
  imageAlt
  imageHref
  image {
    asset {
      altText
      url
    }
  }
}
    `;
export const StepCardFieldsFragmentDoc = gql`
    fragment stepCardFields on StepCard {
  isActive
  icon {
    asset {
      url
    }
  }
  title
  descriptionRaw
  button {
    ...buttonFields
  }
  tagName
  faqs {
    question
    answerRaw
  }
  image {
    ...customImageFields
  }
  videoSrc
}
    ${ButtonFieldsFragmentDoc}
${CustomImageFieldsFragmentDoc}`;
export const BasicStepCardSectionFieldsFragmentDoc = gql`
    fragment basicStepCardSectionFields on BasicStepCardSection {
  title
  stepCards {
    ...stepCardFields
  }
}
    ${StepCardFieldsFragmentDoc}`;
export const ReviewSectionFieldsFragmentDoc = gql`
    fragment reviewSectionFields on ReviewSection {
  title
  timespan
  descriptionRaw
  button {
    ...buttonFields
  }
  disclaimerTop
  disclaimerBottom
  stepCardsSubsections {
    ...basicStepCardSectionFields
  }
}
    ${ButtonFieldsFragmentDoc}
${BasicStepCardSectionFieldsFragmentDoc}`;
export const BottomBannerFieldsFragmentDoc = gql`
    fragment bottomBannerFields on BottomBanner {
  title
  descriptionRaw
  button {
    ...buttonFields
  }
}
    ${ButtonFieldsFragmentDoc}`;
export const CardFieldsFragmentDoc = gql`
    fragment cardFields on Card {
  title
  descriptionRaw
  icon {
    asset {
      url
    }
  }
}
    `;
export const EcologicalImpactRelationFieldsFragmentDoc = gql`
    fragment ecologicalImpactRelationFields on EcologicalImpactRelation {
  primary
  ecologicalImpact {
    name
    descriptionRaw
    image {
      ...customImageFields
    }
  }
}
    ${CustomImageFieldsFragmentDoc}`;
export const EcologicalOutcomeFieldsFragmentDoc = gql`
    fragment ecologicalOutcomeFields on EcologicalOutcome {
  title
  descriptionRaw
  image {
    ...customImageFields
  }
}
    ${CustomImageFieldsFragmentDoc}`;
export const HeroSectionFieldsFragmentDoc = gql`
    fragment heroSectionFields on HeroSection {
  title
  descriptionRaw
}
    `;
export const ImageBoldTextLabelFieldsFragmentDoc = gql`
    fragment imageBoldTextLabelFields on ImageBoldTextLabel {
  boldText
  label
  image {
    ...customImageFields
  }
}
    ${CustomImageFieldsFragmentDoc}`;
export const MediaFieldsFragmentDoc = gql`
    fragment mediaFields on Media {
  title
  author
  date
  image {
    ...customImageFields
  }
  href
  type
}
    ${CustomImageFieldsFragmentDoc}`;
export const PageMetadataFieldsFragmentDoc = gql`
    fragment pageMetadataFields on PageMetadata {
  description
  openGraphImage {
    asset {
      url
    }
  }
}
    `;
export const ResourceFieldsFragmentDoc = gql`
    fragment resourceFields on Resource {
  _updatedAt
  titleRaw
  descriptionRaw
  image {
    ...customImageFields
  }
  button {
    ...buttonFields
  }
  lastUpdated
}
    ${CustomImageFieldsFragmentDoc}
${ButtonFieldsFragmentDoc}`;
export const AllCreateCreditClassPageDocument = gql`
    query allCreateCreditClassPage {
  allCreateCreditClassPage {
    heroSection {
      ...heroSectionFields
    }
    stepCardSection {
      title
      descriptionRaw
      stepCards {
        ...stepCardFields
      }
    }
    creditTypeSection {
      title
      subtitleTop
      descriptionTopRaw
      subtitleBottom
      descriptionBottomRaw
      institutionalCards {
        ...cardFields
      }
      flexCreditCards {
        ...cardFields
      }
    }
    outcomeSection {
      ...heroSectionFields
    }
    outcomes {
      ...ecologicalOutcomeFields
    }
    resources {
      ...resourceFields
    }
    bottomBanner {
      ...bottomBannerFields
    }
    footerLink
    metadata {
      ...pageMetadataFields
    }
  }
}
    ${HeroSectionFieldsFragmentDoc}
${StepCardFieldsFragmentDoc}
${CardFieldsFragmentDoc}
${EcologicalOutcomeFieldsFragmentDoc}
${ResourceFieldsFragmentDoc}
${BottomBannerFieldsFragmentDoc}
${PageMetadataFieldsFragmentDoc}`;

/**
 * __useAllCreateCreditClassPageQuery__
 *
 * To run a query within a React component, call `useAllCreateCreditClassPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCreateCreditClassPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCreateCreditClassPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCreateCreditClassPageQuery(baseOptions?: Apollo.QueryHookOptions<AllCreateCreditClassPageQuery, AllCreateCreditClassPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCreateCreditClassPageQuery, AllCreateCreditClassPageQueryVariables>(AllCreateCreditClassPageDocument, options);
      }
export function useAllCreateCreditClassPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCreateCreditClassPageQuery, AllCreateCreditClassPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCreateCreditClassPageQuery, AllCreateCreditClassPageQueryVariables>(AllCreateCreditClassPageDocument, options);
        }
export type AllCreateCreditClassPageQueryHookResult = ReturnType<typeof useAllCreateCreditClassPageQuery>;
export type AllCreateCreditClassPageLazyQueryHookResult = ReturnType<typeof useAllCreateCreditClassPageLazyQuery>;
export type AllCreateCreditClassPageQueryResult = Apollo.QueryResult<AllCreateCreditClassPageQuery, AllCreateCreditClassPageQueryVariables>;
export const AllCreateMethodologyPageDocument = gql`
    query allCreateMethodologyPage {
  allCreateMethodologyPage {
    heroSection {
      ...heroSectionFields
    }
    stepCardSection {
      title
      descriptionRaw
      stepCards {
        ...stepCardFields
      }
    }
    outcomeSection {
      ...heroSectionFields
    }
    outcomes {
      ...ecologicalOutcomeFields
    }
    resources {
      ...resourceFields
    }
    peerReviewSection {
      ...bottomBannerFields
    }
    createCreditClassSection {
      ...bottomBannerFields
    }
    footerLink
    metadata {
      ...pageMetadataFields
    }
  }
}
    ${HeroSectionFieldsFragmentDoc}
${StepCardFieldsFragmentDoc}
${EcologicalOutcomeFieldsFragmentDoc}
${ResourceFieldsFragmentDoc}
${BottomBannerFieldsFragmentDoc}
${PageMetadataFieldsFragmentDoc}`;

/**
 * __useAllCreateMethodologyPageQuery__
 *
 * To run a query within a React component, call `useAllCreateMethodologyPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCreateMethodologyPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCreateMethodologyPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCreateMethodologyPageQuery(baseOptions?: Apollo.QueryHookOptions<AllCreateMethodologyPageQuery, AllCreateMethodologyPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCreateMethodologyPageQuery, AllCreateMethodologyPageQueryVariables>(AllCreateMethodologyPageDocument, options);
      }
export function useAllCreateMethodologyPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCreateMethodologyPageQuery, AllCreateMethodologyPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCreateMethodologyPageQuery, AllCreateMethodologyPageQueryVariables>(AllCreateMethodologyPageDocument, options);
        }
export type AllCreateMethodologyPageQueryHookResult = ReturnType<typeof useAllCreateMethodologyPageQuery>;
export type AllCreateMethodologyPageLazyQueryHookResult = ReturnType<typeof useAllCreateMethodologyPageLazyQuery>;
export type AllCreateMethodologyPageQueryResult = Apollo.QueryResult<AllCreateMethodologyPageQuery, AllCreateMethodologyPageQueryVariables>;
export const AllCreditClassDocument = gql`
    query allCreditClass {
  allCreditClass {
    path
    nameRaw
    descriptionRaw
    shortDescriptionRaw
    ecologicalImpact {
      ...ecologicalImpactRelationFields
    }
    overviewCards {
      ...cardFields
    }
    sdgs {
      title
      image {
        ...customImageFields
      }
    }
    buyer {
      heroSection {
        ...heroSectionFields
      }
      resources {
        ...resourceFields
      }
      videos {
        ...mediaFields
      }
      projectsTitle
      ctaButton {
        ...buttonFields
      }
    }
    landSteward {
      heroSection {
        ...heroSectionFields
      }
      resources {
        ...resourceFields
      }
      videos {
        ...mediaFields
      }
      projectsTitle
      ctaButton {
        ...buttonFields
      }
      featuredProjectIds
      steps {
        preTitle
        title
        descriptionRaw
        stepCards {
          ...stepCardFields
        }
      }
      connectSection {
        title
        links {
          name
          descriptionRaw
          icon {
            asset {
              url
            }
          }
          href {
            ...linkFields
          }
        }
      }
    }
  }
}
    ${EcologicalImpactRelationFieldsFragmentDoc}
${CardFieldsFragmentDoc}
${CustomImageFieldsFragmentDoc}
${HeroSectionFieldsFragmentDoc}
${ResourceFieldsFragmentDoc}
${MediaFieldsFragmentDoc}
${ButtonFieldsFragmentDoc}
${StepCardFieldsFragmentDoc}
${LinkFieldsFragmentDoc}`;

/**
 * __useAllCreditClassQuery__
 *
 * To run a query within a React component, call `useAllCreditClassQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCreditClassQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCreditClassQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCreditClassQuery(baseOptions?: Apollo.QueryHookOptions<AllCreditClassQuery, AllCreditClassQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCreditClassQuery, AllCreditClassQueryVariables>(AllCreditClassDocument, options);
      }
export function useAllCreditClassLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCreditClassQuery, AllCreditClassQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCreditClassQuery, AllCreditClassQueryVariables>(AllCreditClassDocument, options);
        }
export type AllCreditClassQueryHookResult = ReturnType<typeof useAllCreditClassQuery>;
export type AllCreditClassLazyQueryHookResult = ReturnType<typeof useAllCreditClassLazyQuery>;
export type AllCreditClassQueryResult = Apollo.QueryResult<AllCreditClassQuery, AllCreditClassQueryVariables>;
export const AllHomePageDocument = gql`
    query allHomePage {
  allHomePage {
    heroSection {
      ...heroSectionFields
    }
    bottomBanner {
      ...bottomBannerFields
    }
  }
}
    ${HeroSectionFieldsFragmentDoc}
${BottomBannerFieldsFragmentDoc}`;

/**
 * __useAllHomePageQuery__
 *
 * To run a query within a React component, call `useAllHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllHomePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllHomePageQuery(baseOptions?: Apollo.QueryHookOptions<AllHomePageQuery, AllHomePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllHomePageQuery, AllHomePageQueryVariables>(AllHomePageDocument, options);
      }
export function useAllHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllHomePageQuery, AllHomePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllHomePageQuery, AllHomePageQueryVariables>(AllHomePageDocument, options);
        }
export type AllHomePageQueryHookResult = ReturnType<typeof useAllHomePageQuery>;
export type AllHomePageLazyQueryHookResult = ReturnType<typeof useAllHomePageLazyQuery>;
export type AllHomePageQueryResult = Apollo.QueryResult<AllHomePageQuery, AllHomePageQueryVariables>;
export const AllLandStewardsPageDocument = gql`
    query allLandStewardsPage {
  allLandStewardsPage {
    heroSection {
      ...heroSectionFields
    }
    designedForFarmersSection {
      title
      imageCards {
        ...cardFields
      }
    }
    joinFarmersSection {
      title
      left {
        ...imageBoldTextLabelFields
      }
      right {
        ...imageBoldTextLabelFields
      }
    }
    practicesOutcomesSection {
      title
      note
      practices {
        title
        imageCards {
          ...cardFields
        }
      }
      outcomes {
        title
        imageCards {
          ...cardFields
        }
      }
    }
    footerLink
    metadata {
      ...pageMetadataFields
    }
  }
}
    ${HeroSectionFieldsFragmentDoc}
${CardFieldsFragmentDoc}
${ImageBoldTextLabelFieldsFragmentDoc}
${PageMetadataFieldsFragmentDoc}`;

/**
 * __useAllLandStewardsPageQuery__
 *
 * To run a query within a React component, call `useAllLandStewardsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllLandStewardsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllLandStewardsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllLandStewardsPageQuery(baseOptions?: Apollo.QueryHookOptions<AllLandStewardsPageQuery, AllLandStewardsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllLandStewardsPageQuery, AllLandStewardsPageQueryVariables>(AllLandStewardsPageDocument, options);
      }
export function useAllLandStewardsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllLandStewardsPageQuery, AllLandStewardsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllLandStewardsPageQuery, AllLandStewardsPageQueryVariables>(AllLandStewardsPageDocument, options);
        }
export type AllLandStewardsPageQueryHookResult = ReturnType<typeof useAllLandStewardsPageQuery>;
export type AllLandStewardsPageLazyQueryHookResult = ReturnType<typeof useAllLandStewardsPageLazyQuery>;
export type AllLandStewardsPageQueryResult = Apollo.QueryResult<AllLandStewardsPageQuery, AllLandStewardsPageQueryVariables>;
export const AllMethodologyDocument = gql`
    query allMethodology {
  allMethodology {
    path
    nameRaw
    descriptionRaw
    steps {
      ...basicStepCardSectionFields
    }
    documentation {
      title
      button {
        ...buttonFields
      }
      image {
        ...customImageFields
      }
    }
    ecologicalImpact {
      ...ecologicalImpactRelationFields
    }
    resources {
      ...resourceFields
    }
    bottomSection {
      ...heroSectionFields
    }
  }
}
    ${BasicStepCardSectionFieldsFragmentDoc}
${ButtonFieldsFragmentDoc}
${CustomImageFieldsFragmentDoc}
${EcologicalImpactRelationFieldsFragmentDoc}
${ResourceFieldsFragmentDoc}
${HeroSectionFieldsFragmentDoc}`;

/**
 * __useAllMethodologyQuery__
 *
 * To run a query within a React component, call `useAllMethodologyQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllMethodologyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllMethodologyQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllMethodologyQuery(baseOptions?: Apollo.QueryHookOptions<AllMethodologyQuery, AllMethodologyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllMethodologyQuery, AllMethodologyQueryVariables>(AllMethodologyDocument, options);
      }
export function useAllMethodologyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllMethodologyQuery, AllMethodologyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllMethodologyQuery, AllMethodologyQueryVariables>(AllMethodologyDocument, options);
        }
export type AllMethodologyQueryHookResult = ReturnType<typeof useAllMethodologyQuery>;
export type AllMethodologyLazyQueryHookResult = ReturnType<typeof useAllMethodologyLazyQuery>;
export type AllMethodologyQueryResult = Apollo.QueryResult<AllMethodologyQuery, AllMethodologyQueryVariables>;
export const AllMethodologyReviewProcessPageDocument = gql`
    query allMethodologyReviewProcessPage {
  allMethodologyReviewProcessPage {
    heroSection {
      ...heroSectionFields
    }
    internalReviewSection {
      ...reviewSectionFields
    }
    externalReviewSection {
      ...reviewSectionFields
    }
    bottomBanner {
      ...bottomBannerFields
    }
    metadata {
      ...pageMetadataFields
    }
  }
}
    ${HeroSectionFieldsFragmentDoc}
${ReviewSectionFieldsFragmentDoc}
${BottomBannerFieldsFragmentDoc}
${PageMetadataFieldsFragmentDoc}`;

/**
 * __useAllMethodologyReviewProcessPageQuery__
 *
 * To run a query within a React component, call `useAllMethodologyReviewProcessPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllMethodologyReviewProcessPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllMethodologyReviewProcessPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllMethodologyReviewProcessPageQuery(baseOptions?: Apollo.QueryHookOptions<AllMethodologyReviewProcessPageQuery, AllMethodologyReviewProcessPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllMethodologyReviewProcessPageQuery, AllMethodologyReviewProcessPageQueryVariables>(AllMethodologyReviewProcessPageDocument, options);
      }
export function useAllMethodologyReviewProcessPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllMethodologyReviewProcessPageQuery, AllMethodologyReviewProcessPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllMethodologyReviewProcessPageQuery, AllMethodologyReviewProcessPageQueryVariables>(AllMethodologyReviewProcessPageDocument, options);
        }
export type AllMethodologyReviewProcessPageQueryHookResult = ReturnType<typeof useAllMethodologyReviewProcessPageQuery>;
export type AllMethodologyReviewProcessPageLazyQueryHookResult = ReturnType<typeof useAllMethodologyReviewProcessPageLazyQuery>;
export type AllMethodologyReviewProcessPageQueryResult = Apollo.QueryResult<AllMethodologyReviewProcessPageQuery, AllMethodologyReviewProcessPageQueryVariables>;