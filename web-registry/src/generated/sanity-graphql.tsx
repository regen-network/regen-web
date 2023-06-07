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



export type ActionCard = {
  __typename?: 'ActionCard';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  button?: Maybe<Button>;
  noteRaw?: Maybe<Scalars['JSON']>;
  image?: Maybe<CustomImage>;
};

export type ActionCardFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  button?: Maybe<ButtonFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type ActionCardSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  button?: Maybe<ButtonSorting>;
  image?: Maybe<CustomImageSorting>;
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

export type BasketDetailsPage = Document & {
  __typename?: 'BasketDetailsPage';
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
  /** This content will appear at the bottom of the Basket Details page */
  gettingStartedResourcesCard?: Maybe<GettingStartedResourcesCard>;
};

export type BasketDetailsPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  gettingStartedResourcesCard?: Maybe<GettingStartedResourcesCardFilter>;
};

export type BasketDetailsPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
};

export type Block = {
  __typename?: 'Block';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<Span>>>;
  style?: Maybe<Scalars['String']>;
  list?: Maybe<Scalars['String']>;
};

export type BlogPost = {
  __typename?: 'BlogPost';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  image?: Maybe<CustomImage>;
  url?: Maybe<Scalars['String']>;
};

export type BlogPostFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
  url?: Maybe<StringFilter>;
};

export type BlogPostSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
  url?: Maybe<SortOrder>;
};

export type BlogSection = {
  __typename?: 'BlogSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<BlogPost>>>;
};

export type BlogSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
};

export type BlogSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
};

export type BodyGreenTextWithPopover = {
  __typename?: 'BodyGreenTextWithPopover';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  green?: Maybe<Scalars['String']>;
  middle?: Maybe<Scalars['String']>;
  popover?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
};

export type BodyGreenTextWithPopoverFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  green?: Maybe<StringFilter>;
  middle?: Maybe<StringFilter>;
  popover?: Maybe<StringFilter>;
  end?: Maybe<StringFilter>;
};

export type BodyGreenTextWithPopoverSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  green?: Maybe<SortOrder>;
  middle?: Maybe<SortOrder>;
  popover?: Maybe<SortOrder>;
  end?: Maybe<SortOrder>;
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
  secondButton?: Maybe<Button>;
  image?: Maybe<CustomImage>;
};

export type BottomBannerFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  button?: Maybe<ButtonFilter>;
  secondButton?: Maybe<ButtonFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type BottomBannerSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  button?: Maybe<ButtonSorting>;
  secondButton?: Maybe<ButtonSorting>;
  image?: Maybe<CustomImageSorting>;
};

export type BridgePage = Document & {
  __typename?: 'BridgePage';
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
  /** This content will appear at the bottom of the Bridge page (on both /ecocredits/bridge and /ecocredits/accounts/{addr}/bridge) */
  gettingStartedResourcesCard?: Maybe<GettingStartedResourcesCard>;
};

export type BridgePageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  gettingStartedResourcesCard?: Maybe<GettingStartedResourcesCardFilter>;
};

export type BridgePageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
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

export type BuyModal = Document & {
  __typename?: 'BuyModal';
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
  infoCard?: Maybe<InfoCard>;
};

export type BuyModalFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  infoCard?: Maybe<InfoCardFilter>;
};

export type BuyModalOptions = Document & {
  __typename?: 'BuyModalOptions';
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
  cards?: Maybe<Array<Maybe<ActionCard>>>;
};

export type BuyModalOptionsFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type BuyModalOptionsSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type BuyModalSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  infoCard?: Maybe<InfoCardSorting>;
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

export type BuyersFeaturedProjectCardsSection = {
  __typename?: 'BuyersFeaturedProjectCardsSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  backgroundImage?: Maybe<CustomImage>;
  cards?: Maybe<Array<Maybe<FeaturedProjectCard>>>;
};

export type BuyersFeaturedProjectCardsSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  backgroundImage?: Maybe<CustomImageFilter>;
};

export type BuyersFeaturedProjectCardsSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  backgroundImage?: Maybe<CustomImageSorting>;
};

export type BuyersPage = Document & {
  __typename?: 'BuyersPage';
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
  ecologicalCreditsSection?: Maybe<ImageItemsSection>;
  imageGridSection?: Maybe<ImageGridSection>;
  ecologicalCreditCardsSection?: Maybe<EcologicalCreditCardsSection>;
  featuredProjectCardsSection?: Maybe<BuyersFeaturedProjectCardsSection>;
  quoteSection?: Maybe<BuyersQuoteSection>;
  partnersSection?: Maybe<BuyersPartnersSection>;
  contactSection?: Maybe<BottomBanner>;
  footerButtonText?: Maybe<Scalars['String']>;
  metadata?: Maybe<PageMetadata>;
};

export type BuyersPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  heroSection?: Maybe<HeroSectionFilter>;
  ecologicalCreditsSection?: Maybe<ImageItemsSectionFilter>;
  imageGridSection?: Maybe<ImageGridSectionFilter>;
  ecologicalCreditCardsSection?: Maybe<EcologicalCreditCardsSectionFilter>;
  featuredProjectCardsSection?: Maybe<BuyersFeaturedProjectCardsSectionFilter>;
  quoteSection?: Maybe<BuyersQuoteSectionFilter>;
  partnersSection?: Maybe<BuyersPartnersSectionFilter>;
  contactSection?: Maybe<BottomBannerFilter>;
  footerButtonText?: Maybe<StringFilter>;
  metadata?: Maybe<PageMetadataFilter>;
};

export type BuyersPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  heroSection?: Maybe<HeroSectionSorting>;
  ecologicalCreditsSection?: Maybe<ImageItemsSectionSorting>;
  imageGridSection?: Maybe<ImageGridSectionSorting>;
  ecologicalCreditCardsSection?: Maybe<EcologicalCreditCardsSectionSorting>;
  featuredProjectCardsSection?: Maybe<BuyersFeaturedProjectCardsSectionSorting>;
  quoteSection?: Maybe<BuyersQuoteSectionSorting>;
  partnersSection?: Maybe<BuyersPartnersSectionSorting>;
  contactSection?: Maybe<BottomBannerSorting>;
  footerButtonText?: Maybe<SortOrder>;
  metadata?: Maybe<PageMetadataSorting>;
};

export type BuyersPartnersSection = {
  __typename?: 'BuyersPartnersSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  partners?: Maybe<Array<Maybe<Partner>>>;
};

export type BuyersPartnersSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type BuyersPartnersSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type BuyersQuoteSection = {
  __typename?: 'BuyersQuoteSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  backgroundImage?: Maybe<CustomImage>;
  quoteText?: Maybe<BuyersQuoteText>;
  person?: Maybe<Person>;
  logo?: Maybe<Image>;
};

export type BuyersQuoteSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  backgroundImage?: Maybe<CustomImageFilter>;
  quoteText?: Maybe<BuyersQuoteTextFilter>;
  person?: Maybe<PersonFilter>;
  logo?: Maybe<ImageFilter>;
};

export type BuyersQuoteSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  backgroundImage?: Maybe<CustomImageSorting>;
  quoteText?: Maybe<BuyersQuoteTextSorting>;
  logo?: Maybe<ImageSorting>;
};

export type BuyersQuoteText = {
  __typename?: 'BuyersQuoteText';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  /** This part has a green gradient */
  quoteFirstPart?: Maybe<Scalars['String']>;
  quoteMiddlePart?: Maybe<Scalars['String']>;
  /** This part has a green gradient */
  quoteLastPart?: Maybe<Scalars['String']>;
};

export type BuyersQuoteTextFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  quoteFirstPart?: Maybe<StringFilter>;
  quoteMiddlePart?: Maybe<StringFilter>;
  quoteLastPart?: Maybe<StringFilter>;
};

export type BuyersQuoteTextSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  quoteFirstPart?: Maybe<SortOrder>;
  quoteMiddlePart?: Maybe<SortOrder>;
  quoteLastPart?: Maybe<SortOrder>;
};

export type CallToAction = {
  __typename?: 'CallToAction';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  header?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  linkText?: Maybe<Scalars['String']>;
  linkUrl?: Maybe<Scalars['String']>;
};

export type CallToActionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  caption?: Maybe<StringFilter>;
  image?: Maybe<ImageFilter>;
  header?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  linkText?: Maybe<StringFilter>;
  linkUrl?: Maybe<StringFilter>;
};

export type CallToActionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  caption?: Maybe<SortOrder>;
  image?: Maybe<ImageSorting>;
  header?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  linkText?: Maybe<SortOrder>;
  linkUrl?: Maybe<SortOrder>;
};

export type CarbonPlusSection = {
  __typename?: 'CarbonPlusSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  smallHeaderFeatured?: Maybe<Scalars['String']>;
  smallHeaderCreditName?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  linkText?: Maybe<Scalars['String']>;
  linkUrl?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
};

export type CarbonPlusSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  smallHeaderFeatured?: Maybe<StringFilter>;
  smallHeaderCreditName?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  linkText?: Maybe<StringFilter>;
  linkUrl?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type CarbonPlusSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  smallHeaderFeatured?: Maybe<SortOrder>;
  smallHeaderCreditName?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  linkText?: Maybe<SortOrder>;
  linkUrl?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
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

export type CaseStudiesAboutSection = {
  __typename?: 'CaseStudiesAboutSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  practice?: Maybe<Scalars['String']>;
  biome?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};

export type CaseStudiesAboutSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  practice?: Maybe<StringFilter>;
  biome?: Maybe<StringFilter>;
  region?: Maybe<StringFilter>;
};

export type CaseStudiesAboutSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  practice?: Maybe<SortOrder>;
  biome?: Maybe<SortOrder>;
  region?: Maybe<SortOrder>;
};

export type CaseStudiesApproachSection = {
  __typename?: 'CaseStudiesApproachSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  subheader?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  results?: Maybe<Scalars['String']>;
  next?: Maybe<Scalars['String']>;
};

export type CaseStudiesApproachSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  subheader?: Maybe<StringFilter>;
  details?: Maybe<StringFilter>;
  results?: Maybe<StringFilter>;
  next?: Maybe<StringFilter>;
};

export type CaseStudiesApproachSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  subheader?: Maybe<SortOrder>;
  details?: Maybe<SortOrder>;
  results?: Maybe<SortOrder>;
  next?: Maybe<SortOrder>;
};

export type CaseStudiesContextSection = {
  __typename?: 'CaseStudiesContextSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  challenges?: Maybe<Scalars['String']>;
};

export type CaseStudiesContextSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  challenges?: Maybe<StringFilter>;
};

export type CaseStudiesContextSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  challenges?: Maybe<SortOrder>;
};

export type CaseStudiesFundingSection = {
  __typename?: 'CaseStudiesFundingSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  headerRaw?: Maybe<Scalars['JSON']>;
  details?: Maybe<Scalars['String']>;
  results?: Maybe<Scalars['String']>;
  next?: Maybe<Scalars['String']>;
};

export type CaseStudiesFundingSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  details?: Maybe<StringFilter>;
  results?: Maybe<StringFilter>;
  next?: Maybe<StringFilter>;
};

export type CaseStudiesFundingSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  details?: Maybe<SortOrder>;
  results?: Maybe<SortOrder>;
  next?: Maybe<SortOrder>;
};

export type CaseStudiesListSection = {
  __typename?: 'CaseStudiesListSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  view?: Maybe<Scalars['String']>;
};

export type CaseStudiesListSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  view?: Maybe<StringFilter>;
};

export type CaseStudiesListSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  view?: Maybe<SortOrder>;
};

export type CaseStudiesPage = Document & {
  __typename?: 'CaseStudiesPage';
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
  topSection?: Maybe<TitleBody>;
  listSection?: Maybe<CaseStudiesListSection>;
  aboutSection?: Maybe<CaseStudiesAboutSection>;
  contextSection?: Maybe<CaseStudiesContextSection>;
  approachSection?: Maybe<CaseStudiesApproachSection>;
  fundingSection?: Maybe<CaseStudiesFundingSection>;
  caseStudies?: Maybe<Array<Maybe<CaseStudyPage>>>;
  conclusionSectionHeader?: Maybe<Scalars['String']>;
};

export type CaseStudiesPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  topSection?: Maybe<TitleBodyFilter>;
  listSection?: Maybe<CaseStudiesListSectionFilter>;
  aboutSection?: Maybe<CaseStudiesAboutSectionFilter>;
  contextSection?: Maybe<CaseStudiesContextSectionFilter>;
  approachSection?: Maybe<CaseStudiesApproachSectionFilter>;
  fundingSection?: Maybe<CaseStudiesFundingSectionFilter>;
  conclusionSectionHeader?: Maybe<StringFilter>;
};

export type CaseStudiesPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  topSection?: Maybe<TitleBodySorting>;
  listSection?: Maybe<CaseStudiesListSectionSorting>;
  aboutSection?: Maybe<CaseStudiesAboutSectionSorting>;
  contextSection?: Maybe<CaseStudiesContextSectionSorting>;
  approachSection?: Maybe<CaseStudiesApproachSectionSorting>;
  fundingSection?: Maybe<CaseStudiesFundingSectionSorting>;
  conclusionSectionHeader?: Maybe<SortOrder>;
};

export type CaseStudyAboutSection = {
  __typename?: 'CaseStudyAboutSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  aboutRaw?: Maybe<Scalars['JSON']>;
  mapImage?: Maybe<CustomImage>;
  aboutImage?: Maybe<CustomImage>;
  practice?: Maybe<Scalars['String']>;
  biome?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  lineRotate?: Maybe<Scalars['String']>;
  lineWidth?: Maybe<Scalars['String']>;
};

export type CaseStudyAboutSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  mapImage?: Maybe<CustomImageFilter>;
  aboutImage?: Maybe<CustomImageFilter>;
  practice?: Maybe<StringFilter>;
  biome?: Maybe<StringFilter>;
  region?: Maybe<StringFilter>;
  lineRotate?: Maybe<StringFilter>;
  lineWidth?: Maybe<StringFilter>;
};

export type CaseStudyAboutSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  mapImage?: Maybe<CustomImageSorting>;
  aboutImage?: Maybe<CustomImageSorting>;
  practice?: Maybe<SortOrder>;
  biome?: Maybe<SortOrder>;
  region?: Maybe<SortOrder>;
  lineRotate?: Maybe<SortOrder>;
  lineWidth?: Maybe<SortOrder>;
};

export type CaseStudyApproachSection = {
  __typename?: 'CaseStudyApproachSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  detailsRaw?: Maybe<Scalars['JSON']>;
  resultsRaw?: Maybe<Scalars['JSON']>;
  nextRaw?: Maybe<Scalars['JSON']>;
  figureImage?: Maybe<CustomImage>;
  figureTitleRaw?: Maybe<Scalars['JSON']>;
};

export type CaseStudyApproachSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  figureImage?: Maybe<CustomImageFilter>;
};

export type CaseStudyApproachSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  figureImage?: Maybe<CustomImageSorting>;
};

export type CaseStudyBottomSection = {
  __typename?: 'CaseStudyBottomSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  background?: Maybe<CustomImage>;
  quote?: Maybe<Scalars['String']>;
  personName?: Maybe<Scalars['String']>;
  personImage?: Maybe<CustomImage>;
  personRole?: Maybe<Scalars['String']>;
};

export type CaseStudyBottomSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  background?: Maybe<CustomImageFilter>;
  quote?: Maybe<StringFilter>;
  personName?: Maybe<StringFilter>;
  personImage?: Maybe<CustomImageFilter>;
  personRole?: Maybe<StringFilter>;
};

export type CaseStudyBottomSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  background?: Maybe<CustomImageSorting>;
  quote?: Maybe<SortOrder>;
  personName?: Maybe<SortOrder>;
  personImage?: Maybe<CustomImageSorting>;
  personRole?: Maybe<SortOrder>;
};

export type CaseStudyConclusionSection = {
  __typename?: 'CaseStudyConclusionSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  images?: Maybe<Array<Maybe<ImageWithTitle>>>;
};

export type CaseStudyConclusionSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
};

export type CaseStudyConclusionSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
};

export type CaseStudyContextSection = {
  __typename?: 'CaseStudyContextSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  challenges?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CaseStudyContextSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type CaseStudyContextSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
};

export type CaseStudyFigure = {
  __typename?: 'CaseStudyFigure';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
  spacing?: Maybe<Scalars['String']>;
};

export type CaseStudyFigureFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
  spacing?: Maybe<StringFilter>;
};

export type CaseStudyFigureSection = {
  __typename?: 'CaseStudyFigureSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  background?: Maybe<CustomImage>;
  figures?: Maybe<Array<Maybe<CaseStudyFigure>>>;
};

export type CaseStudyFigureSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  background?: Maybe<CustomImageFilter>;
};

export type CaseStudyFigureSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  background?: Maybe<CustomImageSorting>;
};

export type CaseStudyFigureSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
  spacing?: Maybe<SortOrder>;
};

export type CaseStudyFundingSection = {
  __typename?: 'CaseStudyFundingSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
  detailsRaw?: Maybe<Scalars['JSON']>;
  resultsRaw?: Maybe<Scalars['JSON']>;
  nextRaw?: Maybe<Scalars['JSON']>;
};

export type CaseStudyFundingSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type CaseStudyFundingSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
};

export type CaseStudyPage = Document & {
  __typename?: 'CaseStudyPage';
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
  slug?: Maybe<Slug>;
  cardImage?: Maybe<CustomImage>;
  background?: Maybe<CustomImage>;
  description?: Maybe<Scalars['String']>;
  aboutSection?: Maybe<CaseStudyAboutSection>;
  contextSection?: Maybe<CaseStudyContextSection>;
  approachSection?: Maybe<CaseStudyApproachSection>;
  figureSection?: Maybe<CaseStudyFigureSection>;
  fundingSection?: Maybe<CaseStudyFundingSection>;
  conclusionSection?: Maybe<CaseStudyConclusionSection>;
  bottomSection?: Maybe<CaseStudyBottomSection>;
};

export type CaseStudyPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  slug?: Maybe<SlugFilter>;
  cardImage?: Maybe<CustomImageFilter>;
  background?: Maybe<CustomImageFilter>;
  description?: Maybe<StringFilter>;
  aboutSection?: Maybe<CaseStudyAboutSectionFilter>;
  contextSection?: Maybe<CaseStudyContextSectionFilter>;
  approachSection?: Maybe<CaseStudyApproachSectionFilter>;
  figureSection?: Maybe<CaseStudyFigureSectionFilter>;
  fundingSection?: Maybe<CaseStudyFundingSectionFilter>;
  conclusionSection?: Maybe<CaseStudyConclusionSectionFilter>;
  bottomSection?: Maybe<CaseStudyBottomSectionFilter>;
};

export type CaseStudyPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  slug?: Maybe<SlugSorting>;
  cardImage?: Maybe<CustomImageSorting>;
  background?: Maybe<CustomImageSorting>;
  description?: Maybe<SortOrder>;
  aboutSection?: Maybe<CaseStudyAboutSectionSorting>;
  contextSection?: Maybe<CaseStudyContextSectionSorting>;
  approachSection?: Maybe<CaseStudyApproachSectionSorting>;
  figureSection?: Maybe<CaseStudyFigureSectionSorting>;
  fundingSection?: Maybe<CaseStudyFundingSectionSorting>;
  conclusionSection?: Maybe<CaseStudyConclusionSectionSorting>;
  bottomSection?: Maybe<CaseStudyBottomSectionSorting>;
};

export type Claim = Document & {
  __typename?: 'Claim';
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
  description?: Maybe<Scalars['String']>;
};

export type ClaimFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
};

export type ClaimSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
};

export type ClimateSection = {
  __typename?: 'ClimateSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  solution?: Maybe<TitleBody>;
  problem?: Maybe<TitleBody>;
};

export type ClimateSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  image?: Maybe<ImageFilter>;
  solution?: Maybe<TitleBodyFilter>;
  problem?: Maybe<TitleBodyFilter>;
};

export type ClimateSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  image?: Maybe<ImageSorting>;
  solution?: Maybe<TitleBodySorting>;
  problem?: Maybe<TitleBodySorting>;
};

export type CommunityCollaborateSection = {
  __typename?: 'CommunityCollaborateSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  titleBody?: Maybe<TitleCustomBody>;
  cards?: Maybe<Array<Maybe<ResourcesCard>>>;
};

export type CommunityCollaborateSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  titleBody?: Maybe<TitleCustomBodyFilter>;
};

export type CommunityCollaborateSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  titleBody?: Maybe<TitleCustomBodySorting>;
};

export type CommunityCollectiveSection = {
  __typename?: 'CommunityCollectiveSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  bodyRaw?: Maybe<Scalars['JSON']>;
  buttonText?: Maybe<Scalars['String']>;
  signupFormUrl?: Maybe<Scalars['String']>;
};

export type CommunityCollectiveSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  buttonText?: Maybe<StringFilter>;
  signupFormUrl?: Maybe<StringFilter>;
};

export type CommunityCollectiveSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  buttonText?: Maybe<SortOrder>;
  signupFormUrl?: Maybe<SortOrder>;
};

export type CommunityConnectSection = {
  __typename?: 'CommunityConnectSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  telegramSubLabel?: Maybe<Scalars['String']>;
  telegramUrl?: Maybe<Scalars['String']>;
  twitterSubLabel?: Maybe<Scalars['String']>;
  twitterUrl?: Maybe<Scalars['String']>;
  discordSubLabel?: Maybe<Scalars['String']>;
  discordUrl?: Maybe<Scalars['String']>;
};

export type CommunityConnectSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  telegramSubLabel?: Maybe<StringFilter>;
  telegramUrl?: Maybe<StringFilter>;
  twitterSubLabel?: Maybe<StringFilter>;
  twitterUrl?: Maybe<StringFilter>;
  discordSubLabel?: Maybe<StringFilter>;
  discordUrl?: Maybe<StringFilter>;
};

export type CommunityConnectSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  telegramSubLabel?: Maybe<SortOrder>;
  telegramUrl?: Maybe<SortOrder>;
  twitterSubLabel?: Maybe<SortOrder>;
  twitterUrl?: Maybe<SortOrder>;
  discordSubLabel?: Maybe<SortOrder>;
  discordUrl?: Maybe<SortOrder>;
};

export type CommunityGoToSection = {
  __typename?: 'CommunityGoToSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  blogButtonText?: Maybe<Scalars['String']>;
  discussionButtonHref?: Maybe<Scalars['String']>;
  discussionButtonText?: Maybe<Scalars['String']>;
  discussionLabel?: Maybe<Scalars['String']>;
  blogLabel?: Maybe<Scalars['String']>;
  videoButtonHref?: Maybe<Scalars['String']>;
  videoLabel?: Maybe<Scalars['String']>;
  videoButtonText?: Maybe<Scalars['String']>;
  blogButtonHref?: Maybe<Scalars['String']>;
};

export type CommunityGoToSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  blogButtonText?: Maybe<StringFilter>;
  discussionButtonHref?: Maybe<StringFilter>;
  discussionButtonText?: Maybe<StringFilter>;
  discussionLabel?: Maybe<StringFilter>;
  blogLabel?: Maybe<StringFilter>;
  videoButtonHref?: Maybe<StringFilter>;
  videoLabel?: Maybe<StringFilter>;
  videoButtonText?: Maybe<StringFilter>;
  blogButtonHref?: Maybe<StringFilter>;
};

export type CommunityGoToSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  blogButtonText?: Maybe<SortOrder>;
  discussionButtonHref?: Maybe<SortOrder>;
  discussionButtonText?: Maybe<SortOrder>;
  discussionLabel?: Maybe<SortOrder>;
  blogLabel?: Maybe<SortOrder>;
  videoButtonHref?: Maybe<SortOrder>;
  videoLabel?: Maybe<SortOrder>;
  videoButtonText?: Maybe<SortOrder>;
  blogButtonHref?: Maybe<SortOrder>;
};

export type CommunityPage = Document & {
  __typename?: 'CommunityPage';
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
  topSection?: Maybe<TitleBody>;
  connectSection?: Maybe<CommunityConnectSection>;
  goToSection?: Maybe<CommunityGoToSection>;
  collectiveSection?: Maybe<CommunityCollectiveSection>;
  collaborateSection?: Maybe<CommunityCollaborateSection>;
};

export type CommunityPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  topSection?: Maybe<TitleBodyFilter>;
  connectSection?: Maybe<CommunityConnectSectionFilter>;
  goToSection?: Maybe<CommunityGoToSectionFilter>;
  collectiveSection?: Maybe<CommunityCollectiveSectionFilter>;
  collaborateSection?: Maybe<CommunityCollaborateSectionFilter>;
};

export type CommunityPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  topSection?: Maybe<TitleBodySorting>;
  connectSection?: Maybe<CommunityConnectSectionSorting>;
  goToSection?: Maybe<CommunityGoToSectionSorting>;
  collectiveSection?: Maybe<CommunityCollectiveSectionSorting>;
  collaborateSection?: Maybe<CommunityCollaborateSectionSorting>;
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

export type ContactPage = Document & {
  __typename?: 'ContactPage';
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
  header?: Maybe<Scalars['String']>;
  bodyRaw?: Maybe<Scalars['JSON']>;
  formRequestTypes?: Maybe<Array<Maybe<RequestType>>>;
  messageForPartnersRaw?: Maybe<Scalars['JSON']>;
  location?: Maybe<TitleImageCustomBody>;
  email?: Maybe<TitleCustomBody>;
  faq?: Maybe<TitleImage>;
};

export type ContactPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  location?: Maybe<TitleImageCustomBodyFilter>;
  email?: Maybe<TitleCustomBodyFilter>;
  faq?: Maybe<TitleImageFilter>;
};

export type ContactPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  location?: Maybe<TitleImageCustomBodySorting>;
  email?: Maybe<TitleCustomBodySorting>;
  faq?: Maybe<TitleImageSorting>;
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

export type CredibilityCard = Document & {
  __typename?: 'CredibilityCard';
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
  icon?: Maybe<Image>;
};

export type CredibilityCardFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  icon?: Maybe<ImageFilter>;
};

export type CredibilityCardSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  icon?: Maybe<ImageSorting>;
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
  iri?: Maybe<Slug>;
  /** This will be used in the credit class page url: "/credit-classes/{path}", it can be a generic handle or an on chain credit class id */
  path?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  shortDescriptionRaw?: Maybe<Scalars['JSON']>;
  ecologicalImpact?: Maybe<Array<Maybe<EcologicalImpactRelation>>>;
  overviewCards?: Maybe<Array<Maybe<Card>>>;
  sdgs?: Maybe<Array<Maybe<Sdg>>>;
  buyer?: Maybe<Buyer>;
  landSteward?: Maybe<LandSteward>;
  icon?: Maybe<Image>;
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
  iri?: Maybe<SlugFilter>;
  path?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
  buyer?: Maybe<BuyerFilter>;
  landSteward?: Maybe<LandStewardFilter>;
  icon?: Maybe<ImageFilter>;
};

export type CreditClassSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  iri?: Maybe<SlugSorting>;
  path?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
  buyer?: Maybe<BuyerSorting>;
  landSteward?: Maybe<LandStewardSorting>;
  icon?: Maybe<ImageSorting>;
};

export type CreditInfos = {
  __typename?: 'CreditInfos';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['String']>;
};

export type CreditInfosFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  country?: Maybe<StringFilter>;
  price?: Maybe<StringFilter>;
  count?: Maybe<StringFilter>;
};

export type CreditInfosSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  country?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
  count?: Maybe<SortOrder>;
};

export type CreditType = Document & {
  __typename?: 'CreditType';
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
  image?: Maybe<Image>;
};

export type CreditTypeFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  image?: Maybe<ImageFilter>;
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

export type CreditTypeSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  image?: Maybe<ImageSorting>;
};

export type CrossDatasetReference = {
  __typename?: 'CrossDatasetReference';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _ref?: Maybe<Scalars['String']>;
  _weak?: Maybe<Scalars['Boolean']>;
  _dataset?: Maybe<Scalars['String']>;
  _projectId?: Maybe<Scalars['String']>;
};

export type CrossDatasetReferenceFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  _ref?: Maybe<StringFilter>;
  _weak?: Maybe<BooleanFilter>;
  _dataset?: Maybe<StringFilter>;
  _projectId?: Maybe<StringFilter>;
};

export type CrossDatasetReferenceSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _ref?: Maybe<SortOrder>;
  _weak?: Maybe<SortOrder>;
  _dataset?: Maybe<SortOrder>;
  _projectId?: Maybe<SortOrder>;
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

export type DevApproachSection = {
  __typename?: 'DevApproachSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  bodyRaw?: Maybe<Scalars['JSON']>;
};

export type DevApproachSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  caption?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
};

export type DevApproachSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  caption?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
};

export type DevCareersSection = {
  __typename?: 'DevCareersSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  bodyRaw?: Maybe<Scalars['JSON']>;
  button?: Maybe<Button>;
};

export type DevCareersSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  caption?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  button?: Maybe<ButtonFilter>;
};

export type DevCareersSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  caption?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  button?: Maybe<ButtonSorting>;
};

export type DevLedgerSection = {
  __typename?: 'DevLedgerSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  cosmosImage?: Maybe<Image>;
  header?: Maybe<Scalars['String']>;
  bodyRaw?: Maybe<Scalars['JSON']>;
};

export type DevLedgerSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  cosmosImage?: Maybe<ImageFilter>;
  header?: Maybe<StringFilter>;
};

export type DevLedgerSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  cosmosImage?: Maybe<ImageSorting>;
  header?: Maybe<SortOrder>;
};

export type DevOpenAgSection = {
  __typename?: 'DevOpenAgSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  header?: Maybe<Scalars['String']>;
  bodyRaw?: Maybe<Scalars['JSON']>;
};

export type DevOpenAgSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  image?: Maybe<ImageFilter>;
  header?: Maybe<StringFilter>;
};

export type DevOpenAgSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  image?: Maybe<ImageSorting>;
  header?: Maybe<SortOrder>;
};

export type DevTestnetSection = {
  __typename?: 'DevTestnetSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  rightColumnLabel?: Maybe<Scalars['String']>;
  rightColumnContentRaw?: Maybe<Scalars['JSON']>;
  leftColumnLabel?: Maybe<Scalars['String']>;
  leftColumnContentRaw?: Maybe<Scalars['JSON']>;
  button?: Maybe<Button>;
  address?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type DevTestnetSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  rightColumnLabel?: Maybe<StringFilter>;
  leftColumnLabel?: Maybe<StringFilter>;
  button?: Maybe<ButtonFilter>;
  address?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
};

export type DevTestnetSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  rightColumnLabel?: Maybe<SortOrder>;
  leftColumnLabel?: Maybe<SortOrder>;
  button?: Maybe<ButtonSorting>;
  address?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
};

export type DevelopersPage = Document & {
  __typename?: 'DevelopersPage';
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
  topSection?: Maybe<TitleBody>;
  approachSection?: Maybe<DevApproachSection>;
  involvedSectionHeader?: Maybe<Scalars['String']>;
  ledgerSection?: Maybe<DevLedgerSection>;
  openAgSection?: Maybe<DevOpenAgSection>;
  connectSectionHeader?: Maybe<Scalars['String']>;
  careersSection?: Maybe<DevCareersSection>;
};

export type DevelopersPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  topSection?: Maybe<TitleBodyFilter>;
  approachSection?: Maybe<DevApproachSectionFilter>;
  involvedSectionHeader?: Maybe<StringFilter>;
  ledgerSection?: Maybe<DevLedgerSectionFilter>;
  openAgSection?: Maybe<DevOpenAgSectionFilter>;
  connectSectionHeader?: Maybe<StringFilter>;
  careersSection?: Maybe<DevCareersSectionFilter>;
};

export type DevelopersPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  topSection?: Maybe<TitleBodySorting>;
  approachSection?: Maybe<DevApproachSectionSorting>;
  involvedSectionHeader?: Maybe<SortOrder>;
  ledgerSection?: Maybe<DevLedgerSectionSorting>;
  openAgSection?: Maybe<DevOpenAgSectionSorting>;
  connectSectionHeader?: Maybe<SortOrder>;
  careersSection?: Maybe<DevCareersSectionSorting>;
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
  /** Optional */
  date?: Maybe<Scalars['Date']>;
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
  date?: Maybe<DateFilter>;
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
  date?: Maybe<SortOrder>;
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

export type EcologicalCreditCard = Document & {
  __typename?: 'EcologicalCreditCard';
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
  description?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
  type?: Maybe<CreditType>;
  creditInfos?: Maybe<CreditInfos>;
  offsetMethods?: Maybe<Array<Maybe<OffsetMethod>>>;
  projectActivities?: Maybe<Array<Maybe<ProjectActivity>>>;
  button?: Maybe<Button>;
};

export type EcologicalCreditCardFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
  type?: Maybe<CreditTypeFilter>;
  creditInfos?: Maybe<CreditInfosFilter>;
  button?: Maybe<ButtonFilter>;
};

export type EcologicalCreditCardSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
  creditInfos?: Maybe<CreditInfosSorting>;
  button?: Maybe<ButtonSorting>;
};

export type EcologicalCreditCardsSection = {
  __typename?: 'EcologicalCreditCardsSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  cards?: Maybe<Array<Maybe<EcologicalCreditCard>>>;
};

export type EcologicalCreditCardsSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type EcologicalCreditCardsSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
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
  iri?: Maybe<Slug>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  image?: Maybe<CustomImage>;
  sdgs?: Maybe<Array<Maybe<Sdg>>>;
  standard?: Maybe<CustomImage>;
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
  iri?: Maybe<SlugFilter>;
  image?: Maybe<CustomImageFilter>;
  standard?: Maybe<CustomImageFilter>;
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
  iri?: Maybe<SlugSorting>;
  image?: Maybe<CustomImageSorting>;
  standard?: Maybe<CustomImageSorting>;
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

export type FaqCategory = {
  __typename?: 'FaqCategory';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  questions?: Maybe<Array<Maybe<Faq>>>;
};

export type FaqCategoryFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
};

export type FaqCategorySorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
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

export type FaqPage = Document & {
  __typename?: 'FaqPage';
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
  categories?: Maybe<Array<Maybe<FaqCategory>>>;
};

export type FaqPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
};

export type FaqPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
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

export type FeaturedProjectCard = Document & {
  __typename?: 'FeaturedProjectCard';
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
  project?: Maybe<Project>;
  creditClass?: Maybe<CreditClass>;
};

export type FeaturedProjectCardFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  project?: Maybe<ProjectFilter>;
  creditClass?: Maybe<CreditClassFilter>;
};

export type FeaturedProjectCardSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
};

export type FeaturedSection = Document & {
  __typename?: 'FeaturedSection';
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
  header?: Maybe<Scalars['String']>;
  titleRaw?: Maybe<Scalars['JSON']>;
  button?: Maybe<Button>;
  image?: Maybe<CustomImage>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
};

export type FeaturedSectionFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  button?: Maybe<ButtonFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type FeaturedSectionSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  button?: Maybe<ButtonSorting>;
  image?: Maybe<CustomImageSorting>;
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

export type FundCallToAction = {
  __typename?: 'FundCallToAction';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  header?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
};

export type FundCallToActionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  image?: Maybe<ImageFilter>;
  header?: Maybe<StringFilter>;
};

export type FundCallToActionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  image?: Maybe<ImageSorting>;
  header?: Maybe<SortOrder>;
};

export type FundPage = Document & {
  __typename?: 'FundPage';
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
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  topSection?: Maybe<TitleCustomBody>;
  foldSection?: Maybe<TitleCustomBody>;
  thesisSection?: Maybe<TitleCustomBody>;
  callsToAction?: Maybe<Array<Maybe<FundCallToAction>>>;
};

export type FundPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  seoTitle?: Maybe<StringFilter>;
  seoDescription?: Maybe<StringFilter>;
  topSection?: Maybe<TitleCustomBodyFilter>;
  foldSection?: Maybe<TitleCustomBodyFilter>;
  thesisSection?: Maybe<TitleCustomBodyFilter>;
};

export type FundPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  seoTitle?: Maybe<SortOrder>;
  seoDescription?: Maybe<SortOrder>;
  topSection?: Maybe<TitleCustomBodySorting>;
  foldSection?: Maybe<TitleCustomBodySorting>;
  thesisSection?: Maybe<TitleCustomBodySorting>;
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

export type GettingStartedResourcesCard = Document & {
  __typename?: 'GettingStartedResourcesCard';
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
  header?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  image?: Maybe<CustomImage>;
  mobileImage?: Maybe<CustomImage>;
  links?: Maybe<Array<Maybe<Button>>>;
};

export type GettingStartedResourcesCardFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
  mobileImage?: Maybe<CustomImageFilter>;
};

export type GettingStartedResourcesCardSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
  mobileImage?: Maybe<CustomImageSorting>;
};

export type GettingStartedResourcesSection = Document & {
  __typename?: 'GettingStartedResourcesSection';
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
  header?: Maybe<Scalars['String']>;
  resourcesCards?: Maybe<Array<Maybe<GettingStartedResourcesCard>>>;
};

export type GettingStartedResourcesSectionFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
};

export type GettingStartedResourcesSectionSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
};

export type HeroSection = {
  __typename?: 'HeroSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  backgroundImage?: Maybe<CustomImage>;
  /** (Optional) If any text is underlined in the description, it will show this message when hovered */
  tooltipText?: Maybe<Scalars['String']>;
};

export type HeroSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  backgroundImage?: Maybe<CustomImageFilter>;
  tooltipText?: Maybe<StringFilter>;
};

export type HeroSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  backgroundImage?: Maybe<CustomImageSorting>;
  tooltipText?: Maybe<SortOrder>;
};

export type HomeFoldSection = {
  __typename?: 'HomeFoldSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
};

export type HomeFoldSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  body?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type HomeFoldSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  body?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
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
  seo?: Maybe<Seo>;
  heroSection?: Maybe<HomePageTopSection>;
  projectsSection?: Maybe<TitleCustomBody>;
  creditClassesSection?: Maybe<TitleCustomBody>;
  gettingStartedResourcesSection?: Maybe<GettingStartedResourcesSection>;
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
  seo?: Maybe<SeoFilter>;
  heroSection?: Maybe<HomePageTopSectionFilter>;
  projectsSection?: Maybe<TitleCustomBodyFilter>;
  creditClassesSection?: Maybe<TitleCustomBodyFilter>;
  gettingStartedResourcesSection?: Maybe<GettingStartedResourcesSectionFilter>;
  bottomBanner?: Maybe<BottomBannerFilter>;
};

export type HomePageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  seo?: Maybe<SeoSorting>;
  heroSection?: Maybe<HomePageTopSectionSorting>;
  projectsSection?: Maybe<TitleCustomBodySorting>;
  creditClassesSection?: Maybe<TitleCustomBodySorting>;
  bottomBanner?: Maybe<BottomBannerSorting>;
};

export type HomePageTopSection = {
  __typename?: 'HomePageTopSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  bodyRaw?: Maybe<Scalars['JSON']>;
  button?: Maybe<Button>;
  background?: Maybe<CustomImage>;
  icon?: Maybe<CustomImage>;
};

export type HomePageTopSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  button?: Maybe<ButtonFilter>;
  background?: Maybe<CustomImageFilter>;
  icon?: Maybe<CustomImageFilter>;
};

export type HomePageTopSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  button?: Maybe<ButtonSorting>;
  background?: Maybe<CustomImageSorting>;
  icon?: Maybe<CustomImageSorting>;
};

export type HomePageWeb = Document & {
  __typename?: 'HomePageWeb';
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
  homeFoldSection?: Maybe<HomeFoldSection>;
  carbonPlusSection?: Maybe<CarbonPlusSection>;
  marketplaceSection?: Maybe<MarketplaceSection>;
  homeWebPartnersSection?: Maybe<HomeWebPartnersSection>;
  homeWebEcologicalCreditCardsSection?: Maybe<HomeWebEcologicalCreditCardsSection>;
  homeWebStatsSection?: Maybe<HomeWebStatsSection>;
  bannerTextSection?: Maybe<TitleImageCustomBody>;
  climateSection?: Maybe<ClimateSection>;
  ledgerDescription?: Maybe<Scalars['String']>;
  valuesSection?: Maybe<HomeValuesSection>;
};

export type HomePageWebFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  homeFoldSection?: Maybe<HomeFoldSectionFilter>;
  carbonPlusSection?: Maybe<CarbonPlusSectionFilter>;
  marketplaceSection?: Maybe<MarketplaceSectionFilter>;
  homeWebPartnersSection?: Maybe<HomeWebPartnersSectionFilter>;
  homeWebEcologicalCreditCardsSection?: Maybe<HomeWebEcologicalCreditCardsSectionFilter>;
  homeWebStatsSection?: Maybe<HomeWebStatsSectionFilter>;
  bannerTextSection?: Maybe<TitleImageCustomBodyFilter>;
  climateSection?: Maybe<ClimateSectionFilter>;
  ledgerDescription?: Maybe<StringFilter>;
  valuesSection?: Maybe<HomeValuesSectionFilter>;
};

export type HomePageWebSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  homeFoldSection?: Maybe<HomeFoldSectionSorting>;
  carbonPlusSection?: Maybe<CarbonPlusSectionSorting>;
  marketplaceSection?: Maybe<MarketplaceSectionSorting>;
  homeWebPartnersSection?: Maybe<HomeWebPartnersSectionSorting>;
  homeWebEcologicalCreditCardsSection?: Maybe<HomeWebEcologicalCreditCardsSectionSorting>;
  homeWebStatsSection?: Maybe<HomeWebStatsSectionSorting>;
  bannerTextSection?: Maybe<TitleImageCustomBodySorting>;
  climateSection?: Maybe<ClimateSectionSorting>;
  ledgerDescription?: Maybe<SortOrder>;
  valuesSection?: Maybe<HomeValuesSectionSorting>;
};

export type HomeValuesSection = {
  __typename?: 'HomeValuesSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  imageItems?: Maybe<Array<Maybe<ValuesImageItem>>>;
};

export type HomeValuesSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
};

export type HomeValuesSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
};

export type HomeWebEcologicalCreditCardsSection = {
  __typename?: 'HomeWebEcologicalCreditCardsSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  cards?: Maybe<Array<Maybe<EcologicalCreditCard>>>;
};

export type HomeWebEcologicalCreditCardsSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type HomeWebEcologicalCreditCardsSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type HomeWebPartnersSection = {
  __typename?: 'HomeWebPartnersSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  partners?: Maybe<Array<Maybe<Partner>>>;
};

export type HomeWebPartnersSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type HomeWebPartnersSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type HomeWebStatsSection = {
  __typename?: 'HomeWebStatsSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  cards?: Maybe<Array<Maybe<StatCard>>>;
};

export type HomeWebStatsSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  label?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type HomeWebStatsSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  label?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
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

export type ImageCustomBody = {
  __typename?: 'ImageCustomBody';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
  bodyRaw?: Maybe<Scalars['JSON']>;
};

export type ImageCustomBodyFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type ImageCustomBodySorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
};

export type ImageFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  asset?: Maybe<SanityImageAssetFilter>;
  hotspot?: Maybe<SanityImageHotspotFilter>;
  crop?: Maybe<SanityImageCropFilter>;
};

export type ImageGridItem = Document & {
  __typename?: 'ImageGridItem';
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
  header?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  image?: Maybe<CustomImage>;
  button?: Maybe<Button>;
};

export type ImageGridItemFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
  button?: Maybe<ButtonFilter>;
};

export type ImageGridItemSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
  button?: Maybe<ButtonSorting>;
};

export type ImageGridSection = {
  __typename?: 'ImageGridSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  backgroundImage?: Maybe<CustomImage>;
  items?: Maybe<Array<Maybe<ImageGridItem>>>;
};

export type ImageGridSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  backgroundImage?: Maybe<CustomImageFilter>;
};

export type ImageGridSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  backgroundImage?: Maybe<CustomImageSorting>;
};

export type ImageItemsSection = {
  __typename?: 'ImageItemsSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  imageCards?: Maybe<Array<Maybe<Card>>>;
};

export type ImageItemsSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
};

export type ImageItemsSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
};

export type ImageLink = {
  __typename?: 'ImageLink';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  link?: Maybe<Link>;
  image?: Maybe<CustomImage>;
};

export type ImageLinkFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  link?: Maybe<LinkFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type ImageLinkSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  link?: Maybe<LinkSorting>;
  image?: Maybe<CustomImageSorting>;
};

export type ImageSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  hotspot?: Maybe<SanityImageHotspotSorting>;
  crop?: Maybe<SanityImageCropSorting>;
};

export type ImageWithTitle = {
  __typename?: 'ImageWithTitle';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
};

export type ImageWithTitleFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type ImageWithTitleSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
};

export type InfoCard = {
  __typename?: 'InfoCard';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  image?: Maybe<CustomImage>;
};

export type InfoCardFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type InfoCardSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
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


export type LabeledTextLinkable = {
  __typename?: 'LabeledTextLinkable';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  link?: Maybe<Link>;
};

export type LabeledTextLinkableFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  label?: Maybe<StringFilter>;
  text?: Maybe<StringFilter>;
  link?: Maybe<LinkFilter>;
};

export type LabeledTextLinkableSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  label?: Maybe<SortOrder>;
  text?: Maybe<SortOrder>;
  link?: Maybe<LinkSorting>;
};

export type LandManagementPractice = Document & {
  __typename?: 'LandManagementPractice';
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
  icon?: Maybe<Image>;
};

export type LandManagementPracticeFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  icon?: Maybe<ImageFilter>;
};

export type LandManagementPracticeSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  icon?: Maybe<ImageSorting>;
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
  timelineSection?: Maybe<TimelineSection>;
  featuredSection?: Maybe<FeaturedSection>;
  moreQuestionsSection?: Maybe<BottomBanner>;
  footerButton?: Maybe<Button>;
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
  timelineSection?: Maybe<TimelineSectionFilter>;
  featuredSection?: Maybe<FeaturedSectionFilter>;
  moreQuestionsSection?: Maybe<BottomBannerFilter>;
  footerButton?: Maybe<ButtonFilter>;
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
  timelineSection?: Maybe<TimelineSectionSorting>;
  moreQuestionsSection?: Maybe<BottomBannerSorting>;
  footerButton?: Maybe<ButtonSorting>;
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

export type MainnetActionItem = {
  __typename?: 'MainnetActionItem';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  linkText?: Maybe<Scalars['String']>;
  linkUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<CustomImage>;
};

export type MainnetActionItemFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  linkText?: Maybe<StringFilter>;
  linkUrl?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  icon?: Maybe<CustomImageFilter>;
};

export type MainnetActionItemSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  linkText?: Maybe<SortOrder>;
  linkUrl?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  icon?: Maybe<CustomImageSorting>;
};

export type MainnetInfoItem = {
  __typename?: 'MainnetInfoItem';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  icon?: Maybe<CustomImage>;
  gitLink?: Maybe<Scalars['String']>;
};

export type MainnetInfoItemFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  icon?: Maybe<CustomImageFilter>;
  gitLink?: Maybe<StringFilter>;
};

export type MainnetInfoItemSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  icon?: Maybe<CustomImageSorting>;
  gitLink?: Maybe<SortOrder>;
};

export type MainnetLaunchInfoSection = {
  __typename?: 'MainnetLaunchInfoSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
  cardTitle?: Maybe<Scalars['String']>;
  cardBodyRaw?: Maybe<Scalars['JSON']>;
  actionItems?: Maybe<Array<Maybe<MainnetActionItem>>>;
};

export type MainnetLaunchInfoSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
  cardTitle?: Maybe<StringFilter>;
};

export type MainnetLaunchInfoSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
  cardTitle?: Maybe<SortOrder>;
};

export type MainnetPage = Document & {
  __typename?: 'MainnetPage';
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
  launchDate?: Maybe<Scalars['DateTime']>;
  seoDescription?: Maybe<Scalars['String']>;
  livecastLink?: Maybe<Scalars['String']>;
  topSection?: Maybe<TitleBody>;
  launchInfoSection?: Maybe<MainnetLaunchInfoSection>;
  whatsNextSection?: Maybe<MainnetWhatsNextSection>;
  mediaItems?: Maybe<Array<Maybe<Media>>>;
};

export type MainnetPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  launchDate?: Maybe<DatetimeFilter>;
  seoDescription?: Maybe<StringFilter>;
  livecastLink?: Maybe<StringFilter>;
  topSection?: Maybe<TitleBodyFilter>;
  launchInfoSection?: Maybe<MainnetLaunchInfoSectionFilter>;
  whatsNextSection?: Maybe<MainnetWhatsNextSectionFilter>;
};

export type MainnetPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  launchDate?: Maybe<SortOrder>;
  seoDescription?: Maybe<SortOrder>;
  livecastLink?: Maybe<SortOrder>;
  topSection?: Maybe<TitleBodySorting>;
  launchInfoSection?: Maybe<MainnetLaunchInfoSectionSorting>;
  whatsNextSection?: Maybe<MainnetWhatsNextSectionSorting>;
};

export type MainnetWhatsNextSection = {
  __typename?: 'MainnetWhatsNextSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  infoItems?: Maybe<Array<Maybe<MainnetInfoItem>>>;
};

export type MainnetWhatsNextSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type MainnetWhatsNextSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type MarketplaceSection = {
  __typename?: 'MarketplaceSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  tooltip?: Maybe<Scalars['String']>;
  body?: Maybe<BodyGreenTextWithPopover>;
  callToActions?: Maybe<Array<Maybe<CallToAction>>>;
};

export type MarketplaceSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  tooltip?: Maybe<StringFilter>;
  body?: Maybe<BodyGreenTextWithPopoverFilter>;
};

export type MarketplaceSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  tooltip?: Maybe<SortOrder>;
  body?: Maybe<BodyGreenTextWithPopoverSorting>;
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

export type NameTitleImage = {
  __typename?: 'NameTitleImage';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
};

export type NameTitleImageFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type NameTitleImageSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
};

export type NctLedgerSection = {
  __typename?: 'NctLedgerSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  icon?: Maybe<Image>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  bodyRaw?: Maybe<Scalars['JSON']>;
  button?: Maybe<Button>;
};

export type NctLedgerSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  icon?: Maybe<ImageFilter>;
  title?: Maybe<StringFilter>;
  subtitle?: Maybe<StringFilter>;
  button?: Maybe<ButtonFilter>;
};

export type NctLedgerSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  icon?: Maybe<ImageSorting>;
  title?: Maybe<SortOrder>;
  subtitle?: Maybe<SortOrder>;
  button?: Maybe<ButtonSorting>;
};

export type NctOverviewSection = {
  __typename?: 'NctOverviewSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  background?: Maybe<Image>;
  titleIcon?: Maybe<Image>;
  button?: Maybe<Button>;
  bodyRaw?: Maybe<Scalars['JSON']>;
  items?: Maybe<Array<Maybe<LabeledTextLinkable>>>;
};

export type NctOverviewSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  background?: Maybe<ImageFilter>;
  titleIcon?: Maybe<ImageFilter>;
  button?: Maybe<ButtonFilter>;
};

export type NctOverviewSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  background?: Maybe<ImageSorting>;
  titleIcon?: Maybe<ImageSorting>;
  button?: Maybe<ButtonSorting>;
};

export type NctPage = Document & {
  __typename?: 'NctPage';
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
  seo?: Maybe<Seo>;
  /** date of the NCT Liquidity pool launch for countdown timer (NOTE: not currently used) */
  launchDate?: Maybe<Scalars['Date']>;
  topSection?: Maybe<TitleImageCustomBody>;
  overviewSection?: Maybe<NctOverviewSection>;
  tokenSection?: Maybe<NctTokenSection>;
  banner?: Maybe<TitleImageCustomBody>;
  marketplaceSection?: Maybe<TitleImageCustomBody>;
  ledgerSection?: Maybe<NctLedgerSection>;
  mediaItems?: Maybe<Array<Maybe<Media>>>;
};

export type NctPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  seo?: Maybe<SeoFilter>;
  launchDate?: Maybe<DateFilter>;
  topSection?: Maybe<TitleImageCustomBodyFilter>;
  overviewSection?: Maybe<NctOverviewSectionFilter>;
  tokenSection?: Maybe<NctTokenSectionFilter>;
  banner?: Maybe<TitleImageCustomBodyFilter>;
  marketplaceSection?: Maybe<TitleImageCustomBodyFilter>;
  ledgerSection?: Maybe<NctLedgerSectionFilter>;
};

export type NctPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  seo?: Maybe<SeoSorting>;
  launchDate?: Maybe<SortOrder>;
  topSection?: Maybe<TitleImageCustomBodySorting>;
  overviewSection?: Maybe<NctOverviewSectionSorting>;
  tokenSection?: Maybe<NctTokenSectionSorting>;
  banner?: Maybe<TitleImageCustomBodySorting>;
  marketplaceSection?: Maybe<TitleImageCustomBodySorting>;
  ledgerSection?: Maybe<NctLedgerSectionSorting>;
};

export type NctTokenSection = {
  __typename?: 'NctTokenSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  cardImage?: Maybe<CustomImage>;
  cardTitle?: Maybe<Scalars['String']>;
  cardSubtitle?: Maybe<Scalars['String']>;
  cardBodyRaw?: Maybe<Scalars['JSON']>;
  cardButton?: Maybe<Button>;
  detailImage?: Maybe<CustomImage>;
  detailTitle?: Maybe<Scalars['String']>;
  detailSubtitle?: Maybe<Scalars['String']>;
  detailBodyRaw?: Maybe<Scalars['JSON']>;
  detailButton1?: Maybe<Button>;
  detailButton2?: Maybe<Button>;
};

export type NctTokenSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  cardImage?: Maybe<CustomImageFilter>;
  cardTitle?: Maybe<StringFilter>;
  cardSubtitle?: Maybe<StringFilter>;
  cardButton?: Maybe<ButtonFilter>;
  detailImage?: Maybe<CustomImageFilter>;
  detailTitle?: Maybe<StringFilter>;
  detailSubtitle?: Maybe<StringFilter>;
  detailButton1?: Maybe<ButtonFilter>;
  detailButton2?: Maybe<ButtonFilter>;
};

export type NctTokenSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  cardImage?: Maybe<CustomImageSorting>;
  cardTitle?: Maybe<SortOrder>;
  cardSubtitle?: Maybe<SortOrder>;
  cardButton?: Maybe<ButtonSorting>;
  detailImage?: Maybe<CustomImageSorting>;
  detailTitle?: Maybe<SortOrder>;
  detailSubtitle?: Maybe<SortOrder>;
  detailButton1?: Maybe<ButtonSorting>;
  detailButton2?: Maybe<ButtonSorting>;
};

export type OffsetMethod = Document & {
  __typename?: 'OffsetMethod';
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
  icon?: Maybe<Image>;
};

export type OffsetMethodFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  icon?: Maybe<ImageFilter>;
};

export type OffsetMethodSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  icon?: Maybe<ImageSorting>;
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

export type Partner = Document & {
  __typename?: 'Partner';
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
  logo?: Maybe<Image>;
};

export type PartnerFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  logo?: Maybe<ImageFilter>;
};

export type PartnerLogo = {
  __typename?: 'PartnerLogo';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  link?: Maybe<Scalars['String']>;
};

export type PartnerLogoFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  image?: Maybe<ImageFilter>;
  link?: Maybe<StringFilter>;
};

export type PartnerLogoSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  image?: Maybe<ImageSorting>;
  link?: Maybe<SortOrder>;
};

export type PartnerSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  logo?: Maybe<ImageSorting>;
};

export type PartnersPage = Document & {
  __typename?: 'PartnersPage';
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
  header?: Maybe<Scalars['String']>;
  contactHeader?: Maybe<Scalars['String']>;
  contactBodyRaw?: Maybe<Scalars['JSON']>;
  partners?: Maybe<Array<Maybe<PartnerLogo>>>;
};

export type PartnersPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  contactHeader?: Maybe<StringFilter>;
};

export type PartnersPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  contactHeader?: Maybe<SortOrder>;
};

export type Person = Document & {
  __typename?: 'Person';
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
  role?: Maybe<Scalars['String']>;
};

export type PersonFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  role?: Maybe<StringFilter>;
};

export type PersonSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  role?: Maybe<SortOrder>;
};

export type PracticesOutcomesSection = {
  __typename?: 'PracticesOutcomesSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  /** (optional) */
  note?: Maybe<Scalars['String']>;
  practices?: Maybe<Array<Maybe<LandManagementPractice>>>;
  outcomes?: Maybe<Array<Maybe<EcologicalOutcome>>>;
};

export type PracticesOutcomesSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  note?: Maybe<StringFilter>;
};

export type PracticesOutcomesSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  note?: Maybe<SortOrder>;
};

export type PresskitAwardsSection = {
  __typename?: 'PresskitAwardsSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<TitleImageLink>>>;
};

export type PresskitAwardsSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
};

export type PresskitAwardsSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
};

export type PresskitFeaturedSection = {
  __typename?: 'PresskitFeaturedSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  articles?: Maybe<Array<Maybe<Media>>>;
};

export type PresskitFeaturedSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
};

export type PresskitFeaturedSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
};

export type PresskitLogosSection = {
  __typename?: 'PresskitLogosSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  buttonText?: Maybe<Scalars['String']>;
  buttonLink?: Maybe<Scalars['String']>;
};

export type PresskitLogosSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  buttonText?: Maybe<StringFilter>;
  buttonLink?: Maybe<StringFilter>;
};

export type PresskitLogosSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  buttonText?: Maybe<SortOrder>;
  buttonLink?: Maybe<SortOrder>;
};

export type PresskitPage = Document & {
  __typename?: 'PresskitPage';
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
  topSection?: Maybe<TitleBody>;
  titleDescriptionSection?: Maybe<TitleCustomBody>;
  enableSection?: Maybe<TitleImageCustomBody>;
  timelineSection?: Maybe<PresskitTimelineSection>;
  teamSection?: Maybe<PresskitTeamSection>;
  featuredSection?: Maybe<PresskitFeaturedSection>;
  awardsSection?: Maybe<PresskitAwardsSection>;
  logosSection?: Maybe<PresskitLogosSection>;
  connectSectionHeader?: Maybe<Scalars['String']>;
  photosSection?: Maybe<PresskitPhotosSection>;
};

export type PresskitPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  topSection?: Maybe<TitleBodyFilter>;
  titleDescriptionSection?: Maybe<TitleCustomBodyFilter>;
  enableSection?: Maybe<TitleImageCustomBodyFilter>;
  timelineSection?: Maybe<PresskitTimelineSectionFilter>;
  teamSection?: Maybe<PresskitTeamSectionFilter>;
  featuredSection?: Maybe<PresskitFeaturedSectionFilter>;
  awardsSection?: Maybe<PresskitAwardsSectionFilter>;
  logosSection?: Maybe<PresskitLogosSectionFilter>;
  connectSectionHeader?: Maybe<StringFilter>;
  photosSection?: Maybe<PresskitPhotosSectionFilter>;
};

export type PresskitPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  topSection?: Maybe<TitleBodySorting>;
  titleDescriptionSection?: Maybe<TitleCustomBodySorting>;
  enableSection?: Maybe<TitleImageCustomBodySorting>;
  timelineSection?: Maybe<PresskitTimelineSectionSorting>;
  teamSection?: Maybe<PresskitTeamSectionSorting>;
  featuredSection?: Maybe<PresskitFeaturedSectionSorting>;
  awardsSection?: Maybe<PresskitAwardsSectionSorting>;
  logosSection?: Maybe<PresskitLogosSectionSorting>;
  connectSectionHeader?: Maybe<SortOrder>;
  photosSection?: Maybe<PresskitPhotosSectionSorting>;
};

export type PresskitPhotosSection = {
  __typename?: 'PresskitPhotosSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Maybe<Image>>>;
};

export type PresskitPhotosSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
};

export type PresskitPhotosSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
};

export type PresskitTeamSection = {
  __typename?: 'PresskitTeamSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  buttonText?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<RegenTeamMember>>>;
};

export type PresskitTeamSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  buttonText?: Maybe<StringFilter>;
};

export type PresskitTeamSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  buttonText?: Maybe<SortOrder>;
};

export type PresskitTimelineItem = {
  __typename?: 'PresskitTimelineItem';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type PresskitTimelineItemFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  date?: Maybe<StringFilter>;
  summary?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
};

export type PresskitTimelineItemSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  date?: Maybe<SortOrder>;
  summary?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
};

export type PresskitTimelineSection = {
  __typename?: 'PresskitTimelineSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  completedItemIndex?: Maybe<Scalars['Float']>;
  items?: Maybe<Array<Maybe<PresskitTimelineItem>>>;
};

export type PresskitTimelineSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  completedItemIndex?: Maybe<FloatFilter>;
};

export type PresskitTimelineSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  completedItemIndex?: Maybe<SortOrder>;
};

export type Project = Document & {
  __typename?: 'Project';
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
  /** optional project name to make it easier to track projects already added to the list */
  projectName?: Maybe<Scalars['String']>;
  /** on-chain project id */
  projectId?: Maybe<Scalars['String']>;
  credibilityCards?: Maybe<Array<Maybe<ProjectDetailsCard>>>;
};

export type ProjectActivity = Document & {
  __typename?: 'ProjectActivity';
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
  icon?: Maybe<Image>;
};

export type ProjectActivityFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  icon?: Maybe<ImageFilter>;
};

export type ProjectActivitySorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  icon?: Maybe<ImageSorting>;
};

export type ProjectDetailsCard = {
  __typename?: 'ProjectDetailsCard';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  credibilityCard?: Maybe<CredibilityCard>;
  claims?: Maybe<Array<Maybe<Claim>>>;
};

export type ProjectDetailsCardFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  credibilityCard?: Maybe<CredibilityCardFilter>;
};

export type ProjectDetailsCardSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
};

export type ProjectDetailsSection = {
  __typename?: 'ProjectDetailsSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
};

export type ProjectDetailsSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  label?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type ProjectDetailsSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  label?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type ProjectFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  projectName?: Maybe<StringFilter>;
  projectId?: Maybe<StringFilter>;
};

export type ProjectPage = Document & {
  __typename?: 'ProjectPage';
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
  /** This content will appear on all project pages */
  gettingStartedResourcesSection?: Maybe<GettingStartedResourcesSection>;
  projectDetailsSection?: Maybe<ProjectDetailsSection>;
};

export type ProjectPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  gettingStartedResourcesSection?: Maybe<GettingStartedResourcesSectionFilter>;
  projectDetailsSection?: Maybe<ProjectDetailsSectionFilter>;
};

export type ProjectPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  projectDetailsSection?: Maybe<ProjectDetailsSectionSorting>;
};

export type ProjectSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  projectName?: Maybe<SortOrder>;
  projectId?: Maybe<SortOrder>;
};

export type ProjectsPage = Document & {
  __typename?: 'ProjectsPage';
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
  gettingStartedResourcesSection?: Maybe<GettingStartedResourcesSection>;
};

export type ProjectsPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  gettingStartedResourcesSection?: Maybe<GettingStartedResourcesSectionFilter>;
};

export type ProjectsPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
};

export type RegenTeamMember = Document & {
  __typename?: 'RegenTeamMember';
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
  title?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  linkedinUrl?: Maybe<Scalars['String']>;
  twitterUrl?: Maybe<Scalars['String']>;
  githubUrl?: Maybe<Scalars['String']>;
};

export type RegenTeamMemberFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  image?: Maybe<ImageFilter>;
  linkedinUrl?: Maybe<StringFilter>;
  twitterUrl?: Maybe<StringFilter>;
  githubUrl?: Maybe<StringFilter>;
};

export type RegenTeamMemberSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  image?: Maybe<ImageSorting>;
  linkedinUrl?: Maybe<SortOrder>;
  twitterUrl?: Maybe<SortOrder>;
  githubUrl?: Maybe<SortOrder>;
};

export type RequestType = {
  __typename?: 'RequestType';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type RequestTypeFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  label?: Maybe<StringFilter>;
  value?: Maybe<StringFilter>;
};

export type RequestTypeSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  label?: Maybe<SortOrder>;
  value?: Maybe<SortOrder>;
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

export type ResourcesCard = {
  __typename?: 'ResourcesCard';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  buttonText?: Maybe<Scalars['String']>;
  /** optional */
  updated?: Maybe<Scalars['String']>;
  buttonHref?: Maybe<Scalars['String']>;
};

export type ResourcesCardFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
  title?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  buttonText?: Maybe<StringFilter>;
  updated?: Maybe<StringFilter>;
  buttonHref?: Maybe<StringFilter>;
};

export type ResourcesCardSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
  title?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  buttonText?: Maybe<SortOrder>;
  updated?: Maybe<SortOrder>;
  buttonHref?: Maybe<SortOrder>;
};

export type ResourcesLedgerSection = {
  __typename?: 'ResourcesLedgerSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  cards?: Maybe<Array<Maybe<Resource>>>;
};

export type ResourcesLedgerSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
};

export type ResourcesLedgerSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
};

export type ResourcesPage = Document & {
  __typename?: 'ResourcesPage';
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
  topSection?: Maybe<TitleBody>;
  registrySection?: Maybe<ResourcesRegistrySection>;
  ledgerSection?: Maybe<ResourcesLedgerSection>;
};

export type ResourcesPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  topSection?: Maybe<TitleBodyFilter>;
  registrySection?: Maybe<ResourcesRegistrySectionFilter>;
  ledgerSection?: Maybe<ResourcesLedgerSectionFilter>;
};

export type ResourcesPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  topSection?: Maybe<TitleBodySorting>;
  registrySection?: Maybe<ResourcesRegistrySectionSorting>;
  ledgerSection?: Maybe<ResourcesLedgerSectionSorting>;
};

export type ResourcesRegistrySection = {
  __typename?: 'ResourcesRegistrySection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  documentTableTitle?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<Maybe<Doc>>>;
  subsections?: Maybe<Array<Maybe<ResourcesRegistrySubSection>>>;
};

export type ResourcesRegistrySectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  documentTableTitle?: Maybe<StringFilter>;
};

export type ResourcesRegistrySectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  documentTableTitle?: Maybe<SortOrder>;
};

export type ResourcesRegistrySubSection = {
  __typename?: 'ResourcesRegistrySubSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  cards?: Maybe<Array<Maybe<Resource>>>;
};

export type ResourcesRegistrySubSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type ResourcesRegistrySubSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
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
  BasketDetailsPage?: Maybe<BasketDetailsPage>;
  BridgePage?: Maybe<BridgePage>;
  BuyModal?: Maybe<BuyModal>;
  BuyModalOptions?: Maybe<BuyModalOptions>;
  BuyersPage?: Maybe<BuyersPage>;
  CaseStudiesPage?: Maybe<CaseStudiesPage>;
  CaseStudyPage?: Maybe<CaseStudyPage>;
  Claim?: Maybe<Claim>;
  CredibilityCard?: Maybe<CredibilityCard>;
  CommunityPage?: Maybe<CommunityPage>;
  ContactPage?: Maybe<ContactPage>;
  CreateCreditClassPage?: Maybe<CreateCreditClassPage>;
  CreateMethodologyPage?: Maybe<CreateMethodologyPage>;
  CreditClass?: Maybe<CreditClass>;
  CreditType?: Maybe<CreditType>;
  DevelopersPage?: Maybe<DevelopersPage>;
  Doc?: Maybe<Doc>;
  EcologicalImpact?: Maybe<EcologicalImpact>;
  EcologicalOutcome?: Maybe<EcologicalOutcome>;
  EcologicalCreditCard?: Maybe<EcologicalCreditCard>;
  Faq?: Maybe<Faq>;
  FaqPage?: Maybe<FaqPage>;
  FeaturedSection?: Maybe<FeaturedSection>;
  FeaturedProjectCard?: Maybe<FeaturedProjectCard>;
  FundPage?: Maybe<FundPage>;
  GettingStartedResourcesCard?: Maybe<GettingStartedResourcesCard>;
  GettingStartedResourcesSection?: Maybe<GettingStartedResourcesSection>;
  HomePage?: Maybe<HomePage>;
  HomePageWeb?: Maybe<HomePageWeb>;
  ImageGridItem?: Maybe<ImageGridItem>;
  LandManagementPractice?: Maybe<LandManagementPractice>;
  LandStewardsPage?: Maybe<LandStewardsPage>;
  MainnetPage?: Maybe<MainnetPage>;
  Media?: Maybe<Media>;
  Methodology?: Maybe<Methodology>;
  MethodologyReviewProcessPage?: Maybe<MethodologyReviewProcessPage>;
  NctPage?: Maybe<NctPage>;
  OffsetMethod?: Maybe<OffsetMethod>;
  Partner?: Maybe<Partner>;
  PartnersPage?: Maybe<PartnersPage>;
  Person?: Maybe<Person>;
  PresskitPage?: Maybe<PresskitPage>;
  Project?: Maybe<Project>;
  ProjectActivity?: Maybe<ProjectActivity>;
  ProjectPage?: Maybe<ProjectPage>;
  ProjectsPage?: Maybe<ProjectsPage>;
  RegenTeamMember?: Maybe<RegenTeamMember>;
  Resource?: Maybe<Resource>;
  ResourcesPage?: Maybe<ResourcesPage>;
  SciencePage?: Maybe<SciencePage>;
  Sdg?: Maybe<Sdg>;
  SharedSections?: Maybe<SharedSections>;
  SoldOutProjects?: Maybe<SoldOutProjects>;
  StatCard?: Maybe<StatCard>;
  Tag?: Maybe<Tag>;
  TeamPage?: Maybe<TeamPage>;
  TokenPage?: Maybe<TokenPage>;
  ValidatorsPage?: Maybe<ValidatorsPage>;
  WalletAddressRegistrationPage?: Maybe<WalletAddressRegistrationPage>;
  SanityImageAsset?: Maybe<SanityImageAsset>;
  SanityFileAsset?: Maybe<SanityFileAsset>;
  Document?: Maybe<Document>;
  allBasketDetailsPage: Array<BasketDetailsPage>;
  allBridgePage: Array<BridgePage>;
  allBuyModal: Array<BuyModal>;
  allBuyModalOptions: Array<BuyModalOptions>;
  allBuyersPage: Array<BuyersPage>;
  allCaseStudiesPage: Array<CaseStudiesPage>;
  allCaseStudyPage: Array<CaseStudyPage>;
  allClaim: Array<Claim>;
  allCredibilityCard: Array<CredibilityCard>;
  allCommunityPage: Array<CommunityPage>;
  allContactPage: Array<ContactPage>;
  allCreateCreditClassPage: Array<CreateCreditClassPage>;
  allCreateMethodologyPage: Array<CreateMethodologyPage>;
  allCreditClass: Array<CreditClass>;
  allCreditType: Array<CreditType>;
  allDevelopersPage: Array<DevelopersPage>;
  allDoc: Array<Doc>;
  allEcologicalImpact: Array<EcologicalImpact>;
  allEcologicalOutcome: Array<EcologicalOutcome>;
  allEcologicalCreditCard: Array<EcologicalCreditCard>;
  allFaq: Array<Faq>;
  allFaqPage: Array<FaqPage>;
  allFeaturedSection: Array<FeaturedSection>;
  allFeaturedProjectCard: Array<FeaturedProjectCard>;
  allFundPage: Array<FundPage>;
  allGettingStartedResourcesCard: Array<GettingStartedResourcesCard>;
  allGettingStartedResourcesSection: Array<GettingStartedResourcesSection>;
  allHomePage: Array<HomePage>;
  allHomePageWeb: Array<HomePageWeb>;
  allImageGridItem: Array<ImageGridItem>;
  allLandManagementPractice: Array<LandManagementPractice>;
  allLandStewardsPage: Array<LandStewardsPage>;
  allMainnetPage: Array<MainnetPage>;
  allMedia: Array<Media>;
  allMethodology: Array<Methodology>;
  allMethodologyReviewProcessPage: Array<MethodologyReviewProcessPage>;
  allNctPage: Array<NctPage>;
  allOffsetMethod: Array<OffsetMethod>;
  allPartner: Array<Partner>;
  allPartnersPage: Array<PartnersPage>;
  allPerson: Array<Person>;
  allPresskitPage: Array<PresskitPage>;
  allProject: Array<Project>;
  allProjectActivity: Array<ProjectActivity>;
  allProjectPage: Array<ProjectPage>;
  allProjectsPage: Array<ProjectsPage>;
  allRegenTeamMember: Array<RegenTeamMember>;
  allResource: Array<Resource>;
  allResourcesPage: Array<ResourcesPage>;
  allSciencePage: Array<SciencePage>;
  allSdg: Array<Sdg>;
  allSharedSections: Array<SharedSections>;
  allSoldOutProjects: Array<SoldOutProjects>;
  allStatCard: Array<StatCard>;
  allTag: Array<Tag>;
  allTeamPage: Array<TeamPage>;
  allTokenPage: Array<TokenPage>;
  allValidatorsPage: Array<ValidatorsPage>;
  allWalletAddressRegistrationPage: Array<WalletAddressRegistrationPage>;
  allSanityImageAsset: Array<SanityImageAsset>;
  allSanityFileAsset: Array<SanityFileAsset>;
  allDocument: Array<Document>;
};


export type RootQueryBasketDetailsPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryBridgePageArgs = {
  id: Scalars['ID'];
};


export type RootQueryBuyModalArgs = {
  id: Scalars['ID'];
};


export type RootQueryBuyModalOptionsArgs = {
  id: Scalars['ID'];
};


export type RootQueryBuyersPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryCaseStudiesPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryCaseStudyPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryClaimArgs = {
  id: Scalars['ID'];
};


export type RootQueryCredibilityCardArgs = {
  id: Scalars['ID'];
};


export type RootQueryCommunityPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryContactPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryCreateCreditClassPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryCreateMethodologyPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryCreditClassArgs = {
  id: Scalars['ID'];
};


export type RootQueryCreditTypeArgs = {
  id: Scalars['ID'];
};


export type RootQueryDevelopersPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryDocArgs = {
  id: Scalars['ID'];
};


export type RootQueryEcologicalImpactArgs = {
  id: Scalars['ID'];
};


export type RootQueryEcologicalOutcomeArgs = {
  id: Scalars['ID'];
};


export type RootQueryEcologicalCreditCardArgs = {
  id: Scalars['ID'];
};


export type RootQueryFaqArgs = {
  id: Scalars['ID'];
};


export type RootQueryFaqPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryFeaturedSectionArgs = {
  id: Scalars['ID'];
};


export type RootQueryFeaturedProjectCardArgs = {
  id: Scalars['ID'];
};


export type RootQueryFundPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryGettingStartedResourcesCardArgs = {
  id: Scalars['ID'];
};


export type RootQueryGettingStartedResourcesSectionArgs = {
  id: Scalars['ID'];
};


export type RootQueryHomePageArgs = {
  id: Scalars['ID'];
};


export type RootQueryHomePageWebArgs = {
  id: Scalars['ID'];
};


export type RootQueryImageGridItemArgs = {
  id: Scalars['ID'];
};


export type RootQueryLandManagementPracticeArgs = {
  id: Scalars['ID'];
};


export type RootQueryLandStewardsPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryMainnetPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryMediaArgs = {
  id: Scalars['ID'];
};


export type RootQueryMethodologyArgs = {
  id: Scalars['ID'];
};


export type RootQueryMethodologyReviewProcessPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryNctPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryOffsetMethodArgs = {
  id: Scalars['ID'];
};


export type RootQueryPartnerArgs = {
  id: Scalars['ID'];
};


export type RootQueryPartnersPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryPersonArgs = {
  id: Scalars['ID'];
};


export type RootQueryPresskitPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryProjectArgs = {
  id: Scalars['ID'];
};


export type RootQueryProjectActivityArgs = {
  id: Scalars['ID'];
};


export type RootQueryProjectPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryProjectsPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryRegenTeamMemberArgs = {
  id: Scalars['ID'];
};


export type RootQueryResourceArgs = {
  id: Scalars['ID'];
};


export type RootQueryResourcesPageArgs = {
  id: Scalars['ID'];
};


export type RootQuerySciencePageArgs = {
  id: Scalars['ID'];
};


export type RootQuerySdgArgs = {
  id: Scalars['ID'];
};


export type RootQuerySharedSectionsArgs = {
  id: Scalars['ID'];
};


export type RootQuerySoldOutProjectsArgs = {
  id: Scalars['ID'];
};


export type RootQueryStatCardArgs = {
  id: Scalars['ID'];
};


export type RootQueryTagArgs = {
  id: Scalars['ID'];
};


export type RootQueryTeamPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryTokenPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryValidatorsPageArgs = {
  id: Scalars['ID'];
};


export type RootQueryWalletAddressRegistrationPageArgs = {
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


export type RootQueryAllBasketDetailsPageArgs = {
  where?: Maybe<BasketDetailsPageFilter>;
  sort?: Maybe<Array<BasketDetailsPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllBridgePageArgs = {
  where?: Maybe<BridgePageFilter>;
  sort?: Maybe<Array<BridgePageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllBuyModalArgs = {
  where?: Maybe<BuyModalFilter>;
  sort?: Maybe<Array<BuyModalSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllBuyModalOptionsArgs = {
  where?: Maybe<BuyModalOptionsFilter>;
  sort?: Maybe<Array<BuyModalOptionsSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllBuyersPageArgs = {
  where?: Maybe<BuyersPageFilter>;
  sort?: Maybe<Array<BuyersPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllCaseStudiesPageArgs = {
  where?: Maybe<CaseStudiesPageFilter>;
  sort?: Maybe<Array<CaseStudiesPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllCaseStudyPageArgs = {
  where?: Maybe<CaseStudyPageFilter>;
  sort?: Maybe<Array<CaseStudyPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllClaimArgs = {
  where?: Maybe<ClaimFilter>;
  sort?: Maybe<Array<ClaimSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllCredibilityCardArgs = {
  where?: Maybe<CredibilityCardFilter>;
  sort?: Maybe<Array<CredibilityCardSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllCommunityPageArgs = {
  where?: Maybe<CommunityPageFilter>;
  sort?: Maybe<Array<CommunityPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllContactPageArgs = {
  where?: Maybe<ContactPageFilter>;
  sort?: Maybe<Array<ContactPageSorting>>;
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


export type RootQueryAllCreditClassArgs = {
  where?: Maybe<CreditClassFilter>;
  sort?: Maybe<Array<CreditClassSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllCreditTypeArgs = {
  where?: Maybe<CreditTypeFilter>;
  sort?: Maybe<Array<CreditTypeSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllDevelopersPageArgs = {
  where?: Maybe<DevelopersPageFilter>;
  sort?: Maybe<Array<DevelopersPageSorting>>;
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


export type RootQueryAllEcologicalOutcomeArgs = {
  where?: Maybe<EcologicalOutcomeFilter>;
  sort?: Maybe<Array<EcologicalOutcomeSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllEcologicalCreditCardArgs = {
  where?: Maybe<EcologicalCreditCardFilter>;
  sort?: Maybe<Array<EcologicalCreditCardSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllFaqArgs = {
  where?: Maybe<FaqFilter>;
  sort?: Maybe<Array<FaqSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllFaqPageArgs = {
  where?: Maybe<FaqPageFilter>;
  sort?: Maybe<Array<FaqPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllFeaturedSectionArgs = {
  where?: Maybe<FeaturedSectionFilter>;
  sort?: Maybe<Array<FeaturedSectionSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllFeaturedProjectCardArgs = {
  where?: Maybe<FeaturedProjectCardFilter>;
  sort?: Maybe<Array<FeaturedProjectCardSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllFundPageArgs = {
  where?: Maybe<FundPageFilter>;
  sort?: Maybe<Array<FundPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllGettingStartedResourcesCardArgs = {
  where?: Maybe<GettingStartedResourcesCardFilter>;
  sort?: Maybe<Array<GettingStartedResourcesCardSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllGettingStartedResourcesSectionArgs = {
  where?: Maybe<GettingStartedResourcesSectionFilter>;
  sort?: Maybe<Array<GettingStartedResourcesSectionSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllHomePageArgs = {
  where?: Maybe<HomePageFilter>;
  sort?: Maybe<Array<HomePageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllHomePageWebArgs = {
  where?: Maybe<HomePageWebFilter>;
  sort?: Maybe<Array<HomePageWebSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllImageGridItemArgs = {
  where?: Maybe<ImageGridItemFilter>;
  sort?: Maybe<Array<ImageGridItemSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllLandManagementPracticeArgs = {
  where?: Maybe<LandManagementPracticeFilter>;
  sort?: Maybe<Array<LandManagementPracticeSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllLandStewardsPageArgs = {
  where?: Maybe<LandStewardsPageFilter>;
  sort?: Maybe<Array<LandStewardsPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllMainnetPageArgs = {
  where?: Maybe<MainnetPageFilter>;
  sort?: Maybe<Array<MainnetPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllMediaArgs = {
  where?: Maybe<MediaFilter>;
  sort?: Maybe<Array<MediaSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllMethodologyArgs = {
  where?: Maybe<MethodologyFilter>;
  sort?: Maybe<Array<MethodologySorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllMethodologyReviewProcessPageArgs = {
  where?: Maybe<MethodologyReviewProcessPageFilter>;
  sort?: Maybe<Array<MethodologyReviewProcessPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllNctPageArgs = {
  where?: Maybe<NctPageFilter>;
  sort?: Maybe<Array<NctPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllOffsetMethodArgs = {
  where?: Maybe<OffsetMethodFilter>;
  sort?: Maybe<Array<OffsetMethodSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllPartnerArgs = {
  where?: Maybe<PartnerFilter>;
  sort?: Maybe<Array<PartnerSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllPartnersPageArgs = {
  where?: Maybe<PartnersPageFilter>;
  sort?: Maybe<Array<PartnersPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllPersonArgs = {
  where?: Maybe<PersonFilter>;
  sort?: Maybe<Array<PersonSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllPresskitPageArgs = {
  where?: Maybe<PresskitPageFilter>;
  sort?: Maybe<Array<PresskitPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllProjectArgs = {
  where?: Maybe<ProjectFilter>;
  sort?: Maybe<Array<ProjectSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllProjectActivityArgs = {
  where?: Maybe<ProjectActivityFilter>;
  sort?: Maybe<Array<ProjectActivitySorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllProjectPageArgs = {
  where?: Maybe<ProjectPageFilter>;
  sort?: Maybe<Array<ProjectPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllProjectsPageArgs = {
  where?: Maybe<ProjectsPageFilter>;
  sort?: Maybe<Array<ProjectsPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllRegenTeamMemberArgs = {
  where?: Maybe<RegenTeamMemberFilter>;
  sort?: Maybe<Array<RegenTeamMemberSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllResourceArgs = {
  where?: Maybe<ResourceFilter>;
  sort?: Maybe<Array<ResourceSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllResourcesPageArgs = {
  where?: Maybe<ResourcesPageFilter>;
  sort?: Maybe<Array<ResourcesPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllSciencePageArgs = {
  where?: Maybe<SciencePageFilter>;
  sort?: Maybe<Array<SciencePageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllSdgArgs = {
  where?: Maybe<SdgFilter>;
  sort?: Maybe<Array<SdgSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllSharedSectionsArgs = {
  where?: Maybe<SharedSectionsFilter>;
  sort?: Maybe<Array<SharedSectionsSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllSoldOutProjectsArgs = {
  where?: Maybe<SoldOutProjectsFilter>;
  sort?: Maybe<Array<SoldOutProjectsSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllStatCardArgs = {
  where?: Maybe<StatCardFilter>;
  sort?: Maybe<Array<StatCardSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllTagArgs = {
  where?: Maybe<TagFilter>;
  sort?: Maybe<Array<TagSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllTeamPageArgs = {
  where?: Maybe<TeamPageFilter>;
  sort?: Maybe<Array<TeamPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllTokenPageArgs = {
  where?: Maybe<TokenPageFilter>;
  sort?: Maybe<Array<TokenPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllValidatorsPageArgs = {
  where?: Maybe<ValidatorsPageFilter>;
  sort?: Maybe<Array<ValidatorsPageSorting>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RootQueryAllWalletAddressRegistrationPageArgs = {
  where?: Maybe<WalletAddressRegistrationPageFilter>;
  sort?: Maybe<Array<WalletAddressRegistrationPageSorting>>;
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
  uploadId?: Maybe<Scalars['String']>;
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
  uploadId?: Maybe<StringFilter>;
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
  uploadId?: Maybe<SortOrder>;
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
  blurHash?: Maybe<Scalars['String']>;
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
  blurHash?: Maybe<StringFilter>;
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
  blurHash?: Maybe<SortOrder>;
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

export type ScienceCommunityMember = {
  __typename?: 'ScienceCommunityMember';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
  roleRaw?: Maybe<Scalars['JSON']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
};

export type ScienceCommunityMemberFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type ScienceCommunityMemberSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
};

export type ScienceCommunitySection = {
  __typename?: 'ScienceCommunitySection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<ScienceCommunityMember>>>;
};

export type ScienceCommunitySectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  caption?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
};

export type ScienceCommunitySectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  caption?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
};

export type ScienceOpenScienceSection = {
  __typename?: 'ScienceOpenScienceSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  headerStart?: Maybe<Scalars['String']>;
  headerGreen?: Maybe<Scalars['String']>;
  phases?: Maybe<Array<Maybe<TitleBody>>>;
};

export type ScienceOpenScienceSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  caption?: Maybe<StringFilter>;
  headerStart?: Maybe<StringFilter>;
  headerGreen?: Maybe<StringFilter>;
};

export type ScienceOpenScienceSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  caption?: Maybe<SortOrder>;
  headerStart?: Maybe<SortOrder>;
  headerGreen?: Maybe<SortOrder>;
};

export type SciencePage = Document & {
  __typename?: 'SciencePage';
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
  topSection?: Maybe<TitleBody>;
  titleDescriptionSection?: Maybe<ScienceTitleDescriptionSection>;
  openScienceSection?: Maybe<ScienceOpenScienceSection>;
  partnershipSection?: Maybe<SciencePartnershipSection>;
  communitySection?: Maybe<ScienceCommunitySection>;
};

export type SciencePageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  topSection?: Maybe<TitleBodyFilter>;
  titleDescriptionSection?: Maybe<ScienceTitleDescriptionSectionFilter>;
  openScienceSection?: Maybe<ScienceOpenScienceSectionFilter>;
  partnershipSection?: Maybe<SciencePartnershipSectionFilter>;
  communitySection?: Maybe<ScienceCommunitySectionFilter>;
};

export type SciencePageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  topSection?: Maybe<TitleBodySorting>;
  titleDescriptionSection?: Maybe<ScienceTitleDescriptionSectionSorting>;
  openScienceSection?: Maybe<ScienceOpenScienceSectionSorting>;
  partnershipSection?: Maybe<SciencePartnershipSectionSorting>;
  communitySection?: Maybe<ScienceCommunitySectionSorting>;
};

export type SciencePartnershipSection = {
  __typename?: 'SciencePartnershipSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  partners?: Maybe<Array<Maybe<ImageCustomBody>>>;
};

export type SciencePartnershipSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
};

export type SciencePartnershipSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
};

export type ScienceTitleDescriptionSection = {
  __typename?: 'ScienceTitleDescriptionSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  outcomes?: Maybe<Array<Maybe<EcologicalOutcome>>>;
};

export type ScienceTitleDescriptionSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type ScienceTitleDescriptionSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
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
  iri?: Maybe<Slug>;
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
  iri?: Maybe<SlugFilter>;
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
  iri?: Maybe<SlugSorting>;
  image?: Maybe<CustomImageSorting>;
};

export type Seo = {
  __typename?: 'Seo';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
};

export type SeoFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  image?: Maybe<ImageFilter>;
};

export type SeoSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  image?: Maybe<ImageSorting>;
};

export type SharedSections = Document & {
  __typename?: 'SharedSections';
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
  newsletter?: Maybe<TitleCustomBody>;
  blog?: Maybe<BlogSection>;
};

export type SharedSectionsFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  newsletter?: Maybe<TitleCustomBodyFilter>;
  blog?: Maybe<BlogSectionFilter>;
};

export type SharedSectionsSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  newsletter?: Maybe<TitleCustomBodySorting>;
  blog?: Maybe<BlogSectionSorting>;
};

export type Slug = {
  __typename?: 'Slug';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  current?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
};

export type SlugFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  current?: Maybe<StringFilter>;
  source?: Maybe<StringFilter>;
};

export type SlugSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  current?: Maybe<SortOrder>;
  source?: Maybe<SortOrder>;
};

export type SoldOutProjects = Document & {
  __typename?: 'SoldOutProjects';
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
  soldOutProjectsList?: Maybe<Array<Maybe<Project>>>;
};

export type SoldOutProjectsFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
};

export type SoldOutProjectsSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
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

export type StatCard = Document & {
  __typename?: 'StatCard';
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
  label?: Maybe<Scalars['String']>;
  stat?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  image?: Maybe<CustomImage>;
};

export type StatCardFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  label?: Maybe<StringFilter>;
  stat?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type StatCardSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  label?: Maybe<SortOrder>;
  stat?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
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

export type Tag = Document & {
  __typename?: 'Tag';
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
  /** Must be a legal CSS color, as in https://www.w3schools.com/cssref/css_colors_legal.asp */
  color?: Maybe<Scalars['String']>;
};

export type TagFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  color?: Maybe<StringFilter>;
};

export type TagSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  color?: Maybe<SortOrder>;
};

export type TeamPage = Document & {
  __typename?: 'TeamPage';
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
  topSection?: Maybe<TitleBody>;
  coreSection?: Maybe<TeamSection>;
  advisorSection?: Maybe<TeamSection>;
};

export type TeamPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  topSection?: Maybe<TitleBodyFilter>;
  coreSection?: Maybe<TeamSectionFilter>;
  advisorSection?: Maybe<TeamSectionFilter>;
};

export type TeamPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  topSection?: Maybe<TitleBodySorting>;
  coreSection?: Maybe<TeamSectionSorting>;
  advisorSection?: Maybe<TeamSectionSorting>;
};

export type TeamSection = {
  __typename?: 'TeamSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<RegenTeamMember>>>;
};

export type TeamSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type TeamSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type TimelineItem = {
  __typename?: 'TimelineItem';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  /** (Optional) */
  url?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type TimelineItemFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  url?: Maybe<StringFilter>;
  image?: Maybe<ImageFilter>;
};

export type TimelineItemSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  url?: Maybe<SortOrder>;
  image?: Maybe<ImageSorting>;
};

export type TimelineSection = {
  __typename?: 'TimelineSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  timelineItems?: Maybe<Array<Maybe<TimelineItem>>>;
};

export type TimelineSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
};

export type TimelineSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
};

export type TitleBody = {
  __typename?: 'TitleBody';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};

export type TitleBodyButton = {
  __typename?: 'TitleBodyButton';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  bodyRaw?: Maybe<Scalars['JSON']>;
  button?: Maybe<Button>;
};

export type TitleBodyButtonFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  button?: Maybe<ButtonFilter>;
};

export type TitleBodyButtonSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  button?: Maybe<ButtonSorting>;
};

export type TitleBodyFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  body?: Maybe<StringFilter>;
};

export type TitleBodySorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  body?: Maybe<SortOrder>;
};

export type TitleCustomBody = {
  __typename?: 'TitleCustomBody';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  bodyRaw?: Maybe<Scalars['JSON']>;
};

export type TitleCustomBodyFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type TitleCustomBodySorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type TitleImage = {
  __typename?: 'TitleImage';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
};

export type TitleImageBody = {
  __typename?: 'TitleImageBody';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
  body?: Maybe<Scalars['String']>;
};

export type TitleImageBodyFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
  body?: Maybe<StringFilter>;
};

export type TitleImageBodySorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
  body?: Maybe<SortOrder>;
};

export type TitleImageCustomBody = {
  __typename?: 'TitleImageCustomBody';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  image?: Maybe<CustomImage>;
  bodyRaw?: Maybe<Scalars['JSON']>;
};

export type TitleImageCustomBodyFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type TitleImageCustomBodySorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
};

export type TitleImageFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type TitleImageLink = {
  __typename?: 'TitleImageLink';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
};

export type TitleImageLinkFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  link?: Maybe<StringFilter>;
  image?: Maybe<ImageFilter>;
};

export type TitleImageLinkSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  link?: Maybe<SortOrder>;
  image?: Maybe<ImageSorting>;
};

export type TitleImageSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
};

export type TokenInfoSection = {
  __typename?: 'TokenInfoSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  bodyRaw?: Maybe<Scalars['JSON']>;
  image?: Maybe<CustomImage>;
};

export type TokenInfoSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  subtitle?: Maybe<StringFilter>;
  image?: Maybe<CustomImageFilter>;
};

export type TokenInfoSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  subtitle?: Maybe<SortOrder>;
  image?: Maybe<CustomImageSorting>;
};

export type TokenNewsletterSection = {
  __typename?: 'TokenNewsletterSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  buttonText?: Maybe<Scalars['String']>;
  inputText?: Maybe<Scalars['String']>;
};

export type TokenNewsletterSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  buttonText?: Maybe<StringFilter>;
  inputText?: Maybe<StringFilter>;
};

export type TokenNewsletterSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  buttonText?: Maybe<SortOrder>;
  inputText?: Maybe<SortOrder>;
};

export type TokenPage = Document & {
  __typename?: 'TokenPage';
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
  topSection?: Maybe<TitleBody>;
  tokenEconomics?: Maybe<TitleCustomBody>;
  infoSection?: Maybe<TokenInfoSection>;
  poolSection?: Maybe<TokenPoolSection>;
  stakingSection?: Maybe<TitleBodyButton>;
  blockExplorerSection?: Maybe<TitleBodyButton>;
  connectSectionHeader?: Maybe<Scalars['String']>;
  mediaCards?: Maybe<Array<Maybe<Media>>>;
  newsletterSection?: Maybe<TokenNewsletterSection>;
};

export type TokenPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  topSection?: Maybe<TitleBodyFilter>;
  tokenEconomics?: Maybe<TitleCustomBodyFilter>;
  infoSection?: Maybe<TokenInfoSectionFilter>;
  poolSection?: Maybe<TokenPoolSectionFilter>;
  stakingSection?: Maybe<TitleBodyButtonFilter>;
  blockExplorerSection?: Maybe<TitleBodyButtonFilter>;
  connectSectionHeader?: Maybe<StringFilter>;
  newsletterSection?: Maybe<TokenNewsletterSectionFilter>;
};

export type TokenPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  topSection?: Maybe<TitleBodySorting>;
  tokenEconomics?: Maybe<TitleCustomBodySorting>;
  infoSection?: Maybe<TokenInfoSectionSorting>;
  poolSection?: Maybe<TokenPoolSectionSorting>;
  stakingSection?: Maybe<TitleBodyButtonSorting>;
  blockExplorerSection?: Maybe<TitleBodyButtonSorting>;
  connectSectionHeader?: Maybe<SortOrder>;
  newsletterSection?: Maybe<TokenNewsletterSectionSorting>;
};

export type TokenPoolSection = {
  __typename?: 'TokenPoolSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  mobileImage?: Maybe<Image>;
};

export type TokenPoolSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  subtitle?: Maybe<StringFilter>;
  image?: Maybe<ImageFilter>;
  mobileImage?: Maybe<ImageFilter>;
};

export type TokenPoolSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  subtitle?: Maybe<SortOrder>;
  image?: Maybe<ImageSorting>;
  mobileImage?: Maybe<ImageSorting>;
};

export type TokenUnlockSection = {
  __typename?: 'TokenUnlockSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  bodyRaw?: Maybe<Scalars['JSON']>;
  button?: Maybe<Button>;
};

export type TokenUnlockSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  button?: Maybe<ButtonFilter>;
};

export type TokenUnlockSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  button?: Maybe<ButtonSorting>;
};

export type Validator = {
  __typename?: 'Validator';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<ImageLink>>>;
};

export type ValidatorFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
};

export type ValidatorSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
};

export type ValidatorWhoSection = {
  __typename?: 'ValidatorWhoSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  bodyRaw?: Maybe<Scalars['JSON']>;
  validators?: Maybe<Array<Maybe<Validator>>>;
};

export type ValidatorWhoSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  header?: Maybe<StringFilter>;
};

export type ValidatorWhoSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  header?: Maybe<SortOrder>;
};

export type ValidatorsPage = Document & {
  __typename?: 'ValidatorsPage';
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
  topSection?: Maybe<TitleBody>;
  whatSection?: Maybe<TitleCustomBody>;
  whoSection?: Maybe<ValidatorWhoSection>;
  connectSectionHeader?: Maybe<Scalars['String']>;
  whySection?: Maybe<TitleCustomBody>;
};

export type ValidatorsPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  topSection?: Maybe<TitleBodyFilter>;
  whatSection?: Maybe<TitleCustomBodyFilter>;
  whoSection?: Maybe<ValidatorWhoSectionFilter>;
  connectSectionHeader?: Maybe<StringFilter>;
  whySection?: Maybe<TitleCustomBodyFilter>;
};

export type ValidatorsPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  topSection?: Maybe<TitleBodySorting>;
  whatSection?: Maybe<TitleCustomBodySorting>;
  whoSection?: Maybe<ValidatorWhoSectionSorting>;
  connectSectionHeader?: Maybe<SortOrder>;
  whySection?: Maybe<TitleCustomBodySorting>;
};

export type ValuesImageItem = {
  __typename?: 'ValuesImageItem';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
};

export type ValuesImageItemFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
  image?: Maybe<ImageFilter>;
};

export type ValuesImageItemSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  image?: Maybe<ImageSorting>;
};

export type WalletAddressRegistrationFormSection = {
  __typename?: 'WalletAddressRegistrationFormSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  airtableLink?: Maybe<Scalars['String']>;
  recaptchaMessage?: Maybe<Scalars['String']>;
};

export type WalletAddressRegistrationFormSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  airtableLink?: Maybe<StringFilter>;
  recaptchaMessage?: Maybe<StringFilter>;
};

export type WalletAddressRegistrationFormSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  airtableLink?: Maybe<SortOrder>;
  recaptchaMessage?: Maybe<SortOrder>;
};

export type WalletAddressRegistrationPage = Document & {
  __typename?: 'WalletAddressRegistrationPage';
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
  topSection?: Maybe<TitleBody>;
  instructionSection?: Maybe<TitleCustomBody>;
  walletSection?: Maybe<WalletAddressRegistrationWalletSection>;
  formSection?: Maybe<WalletAddressRegistrationFormSection>;
};

export type WalletAddressRegistrationPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<Sanity_DocumentFilter>;
  _id?: Maybe<IdFilter>;
  _type?: Maybe<StringFilter>;
  _createdAt?: Maybe<DatetimeFilter>;
  _updatedAt?: Maybe<DatetimeFilter>;
  _rev?: Maybe<StringFilter>;
  _key?: Maybe<StringFilter>;
  topSection?: Maybe<TitleBodyFilter>;
  instructionSection?: Maybe<TitleCustomBodyFilter>;
  walletSection?: Maybe<WalletAddressRegistrationWalletSectionFilter>;
  formSection?: Maybe<WalletAddressRegistrationFormSectionFilter>;
};

export type WalletAddressRegistrationPageSorting = {
  _id?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  _createdAt?: Maybe<SortOrder>;
  _updatedAt?: Maybe<SortOrder>;
  _rev?: Maybe<SortOrder>;
  _key?: Maybe<SortOrder>;
  topSection?: Maybe<TitleBodySorting>;
  instructionSection?: Maybe<TitleCustomBodySorting>;
  walletSection?: Maybe<WalletAddressRegistrationWalletSectionSorting>;
  formSection?: Maybe<WalletAddressRegistrationFormSectionSorting>;
};

export type WalletAddressRegistrationWalletSection = {
  __typename?: 'WalletAddressRegistrationWalletSection';
  _key?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  buttonText?: Maybe<Scalars['String']>;
  walletFoundButtonText?: Maybe<Scalars['String']>;
  noWalletFoundRaw?: Maybe<Scalars['JSON']>;
};

export type WalletAddressRegistrationWalletSectionFilter = {
  _key?: Maybe<StringFilter>;
  _type?: Maybe<StringFilter>;
  buttonText?: Maybe<StringFilter>;
  walletFoundButtonText?: Maybe<StringFilter>;
};

export type WalletAddressRegistrationWalletSectionSorting = {
  _key?: Maybe<SortOrder>;
  _type?: Maybe<SortOrder>;
  buttonText?: Maybe<SortOrder>;
  walletFoundButtonText?: Maybe<SortOrder>;
};

export type AllBasketDetailsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBasketDetailsPageQuery = (
  { __typename?: 'RootQuery' }
  & { allBasketDetailsPage: Array<(
    { __typename?: 'BasketDetailsPage' }
    & { gettingStartedResourcesCard?: Maybe<(
      { __typename?: 'GettingStartedResourcesCard' }
      & GettingStartedResourcesCardFieldsFragment
    )> }
  )> }
);

export type AllBuyModalQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBuyModalQuery = (
  { __typename?: 'RootQuery' }
  & { allBuyModal: Array<(
    { __typename?: 'BuyModal' }
    & { infoCard?: Maybe<(
      { __typename?: 'InfoCard' }
      & Pick<InfoCard, 'title' | 'descriptionRaw'>
      & { image?: Maybe<(
        { __typename?: 'CustomImage' }
        & CustomImageFieldsFragment
      )> }
    )> }
  )> }
);

export type AllBuyModalOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBuyModalOptionsQuery = (
  { __typename?: 'RootQuery' }
  & { allBuyModalOptions: Array<(
    { __typename?: 'BuyModalOptions' }
    & Pick<BuyModalOptions, 'title'>
    & { cards?: Maybe<Array<Maybe<(
      { __typename?: 'ActionCard' }
      & Pick<ActionCard, 'title' | 'descriptionRaw' | 'noteRaw'>
      & { button?: Maybe<(
        { __typename?: 'Button' }
        & ButtonFieldsFragment
      )>, image?: Maybe<(
        { __typename?: 'CustomImage' }
        & CustomImageFieldsFragment
      )> }
    )>>> }
  )> }
);

export type AllBuyersPageQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBuyersPageQuery = (
  { __typename?: 'RootQuery' }
  & { allBuyersPage: Array<(
    { __typename?: 'BuyersPage' }
    & Pick<BuyersPage, 'footerButtonText'>
    & { heroSection?: Maybe<(
      { __typename?: 'HeroSection' }
      & HeroSectionFieldsFragment
    )>, ecologicalCreditsSection?: Maybe<(
      { __typename?: 'ImageItemsSection' }
      & ImageItemsSectionFieldsFragment
    )>, imageGridSection?: Maybe<(
      { __typename?: 'ImageGridSection' }
      & ImageGridSectionFieldsFragment
    )>, ecologicalCreditCardsSection?: Maybe<(
      { __typename?: 'EcologicalCreditCardsSection' }
      & EcologicalCreditCardsSectionFieldsFragment
    )>, featuredProjectCardsSection?: Maybe<(
      { __typename?: 'BuyersFeaturedProjectCardsSection' }
      & BuyersFeaturedCardsSectionFieldsFragment
    )>, quoteSection?: Maybe<(
      { __typename?: 'BuyersQuoteSection' }
      & BuyersQuoteSectionFieldsFragment
    )>, partnersSection?: Maybe<(
      { __typename?: 'BuyersPartnersSection' }
      & BuyersPartnersSectionFieldsFragment
    )>, contactSection?: Maybe<(
      { __typename?: 'BottomBanner' }
      & BottomBannerFieldsFragment
    )>, metadata?: Maybe<(
      { __typename?: 'PageMetadata' }
      & PageMetadataFieldsFragment
    )> }
  )> }
);

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
    & { iri?: Maybe<(
      { __typename?: 'Slug' }
      & Pick<Slug, 'current'>
    )>, image?: Maybe<(
      { __typename?: 'CustomImage' }
      & CustomImageFieldsFragment
    )>, icon?: Maybe<(
      { __typename?: 'Image' }
      & { asset?: Maybe<(
        { __typename?: 'SanityImageAsset' }
        & Pick<SanityImageAsset, 'url'>
      )> }
    )>, ecologicalImpact?: Maybe<Array<Maybe<(
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
    & { seo?: Maybe<(
      { __typename?: 'Seo' }
      & SeoFieldsFragment
    )>, heroSection?: Maybe<(
      { __typename?: 'HomePageTopSection' }
      & Pick<HomePageTopSection, 'title' | 'bodyRaw'>
      & { button?: Maybe<(
        { __typename?: 'Button' }
        & ButtonFieldsFragment
      )>, background?: Maybe<(
        { __typename?: 'CustomImage' }
        & CustomImageFieldsFragment
      )>, icon?: Maybe<(
        { __typename?: 'CustomImage' }
        & CustomImageFieldsFragment
      )> }
    )>, gettingStartedResourcesSection?: Maybe<(
      { __typename?: 'GettingStartedResourcesSection' }
      & GettingStartedResourcesSectionFieldsFragment
    )>, projectsSection?: Maybe<(
      { __typename?: 'TitleCustomBody' }
      & TitleCustomBodyFieldsFragment
    )>, creditClassesSection?: Maybe<(
      { __typename?: 'TitleCustomBody' }
      & TitleCustomBodyFieldsFragment
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
      & { practices?: Maybe<Array<Maybe<(
        { __typename?: 'LandManagementPractice' }
        & LandManagementPracticeFieldsFragment
      )>>>, outcomes?: Maybe<Array<Maybe<(
        { __typename?: 'EcologicalOutcome' }
        & EcologicalOutcomeFieldsFragment
      )>>> }
    )>, timelineSection?: Maybe<(
      { __typename?: 'TimelineSection' }
      & Pick<TimelineSection, 'header'>
      & { timelineItems?: Maybe<Array<Maybe<(
        { __typename?: 'TimelineItem' }
        & TimelineItemFieldsFragment
      )>>> }
    )>, featuredSection?: Maybe<(
      { __typename?: 'FeaturedSection' }
      & FeaturedSectionFieldsFragment
    )>, moreQuestionsSection?: Maybe<(
      { __typename?: 'BottomBanner' }
      & BottomBannerFieldsFragment
    )>, footerButton?: Maybe<(
      { __typename?: 'Button' }
      & ButtonFieldsFragment
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

export type AllProjectPageQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectPageQuery = (
  { __typename?: 'RootQuery' }
  & { allProjectPage: Array<(
    { __typename?: 'ProjectPage' }
    & { gettingStartedResourcesSection?: Maybe<(
      { __typename?: 'GettingStartedResourcesSection' }
      & GettingStartedResourcesSectionFieldsFragment
    )>, projectDetailsSection?: Maybe<(
      { __typename?: 'ProjectDetailsSection' }
      & Pick<ProjectDetailsSection, 'label' | 'title' | 'descriptionRaw'>
    )> }
  )> }
);

export type AllProjectsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectsPageQuery = (
  { __typename?: 'RootQuery' }
  & { allProjectsPage: Array<(
    { __typename?: 'ProjectsPage' }
    & { gettingStartedResourcesSection?: Maybe<(
      { __typename?: 'GettingStartedResourcesSection' }
      & GettingStartedResourcesSectionFieldsFragment
    )> }
  )> }
);

export type AllSoldOutProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSoldOutProjectsQuery = (
  { __typename?: 'RootQuery' }
  & { allSoldOutProjects: Array<(
    { __typename?: 'SoldOutProjects' }
    & { soldOutProjectsList?: Maybe<Array<Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'projectName' | 'projectId'>
    )>>> }
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
  )>, secondButton?: Maybe<(
    { __typename?: 'Button' }
    & ButtonFieldsFragment
  )>, image?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
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

export type EcologicalCreditCardFieldsFragment = (
  { __typename?: 'EcologicalCreditCard' }
  & Pick<EcologicalCreditCard, 'title' | 'description'>
  & { image?: Maybe<(
    { __typename?: 'CustomImage' }
    & Pick<CustomImage, 'imageHref' | 'imageAlt'>
    & { image?: Maybe<(
      { __typename?: 'Image' }
      & { asset?: Maybe<(
        { __typename?: 'SanityImageAsset' }
        & Pick<SanityImageAsset, 'url'>
      )> }
    )> }
  )>, type?: Maybe<(
    { __typename?: 'CreditType' }
    & Pick<CreditType, 'name'>
    & { image?: Maybe<(
      { __typename?: 'Image' }
      & { asset?: Maybe<(
        { __typename?: 'SanityImageAsset' }
        & Pick<SanityImageAsset, 'url'>
      )> }
    )> }
  )>, creditInfos?: Maybe<(
    { __typename?: 'CreditInfos' }
    & Pick<CreditInfos, 'country' | 'price' | 'count'>
  )>, offsetMethods?: Maybe<Array<Maybe<(
    { __typename?: 'OffsetMethod' }
    & Pick<OffsetMethod, 'name'>
    & { icon?: Maybe<(
      { __typename?: 'Image' }
      & { asset?: Maybe<(
        { __typename?: 'SanityImageAsset' }
        & Pick<SanityImageAsset, 'url'>
      )> }
    )> }
  )>>>, projectActivities?: Maybe<Array<Maybe<(
    { __typename?: 'ProjectActivity' }
    & Pick<ProjectActivity, 'name'>
    & { icon?: Maybe<(
      { __typename?: 'Image' }
      & { asset?: Maybe<(
        { __typename?: 'SanityImageAsset' }
        & Pick<SanityImageAsset, 'url'>
      )> }
    )> }
  )>>>, button?: Maybe<(
    { __typename?: 'Button' }
    & Pick<Button, 'buttonText'>
    & { buttonLink?: Maybe<(
      { __typename?: 'Link' }
      & Pick<Link, 'buttonHref'>
    )> }
  )> }
);

export type EcologicalCreditCardsSectionFieldsFragment = (
  { __typename?: 'EcologicalCreditCardsSection' }
  & Pick<EcologicalCreditCardsSection, 'title' | 'descriptionRaw'>
  & { cards?: Maybe<Array<Maybe<(
    { __typename?: 'EcologicalCreditCard' }
    & EcologicalCreditCardFieldsFragment
  )>>> }
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
    )>, sdgs?: Maybe<Array<Maybe<(
      { __typename?: 'Sdg' }
      & Pick<Sdg, 'title'>
      & { image?: Maybe<(
        { __typename?: 'CustomImage' }
        & CustomImageFieldsFragment
      )> }
    )>>> }
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

export type FeaturedSectionFieldsFragment = (
  { __typename?: 'FeaturedSection' }
  & Pick<FeaturedSection, 'header' | 'titleRaw' | 'descriptionRaw'>
  & { button?: Maybe<(
    { __typename?: 'Button' }
    & ButtonFieldsFragment
  )>, image?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
  )> }
);

export type GettingStartedResourcesSectionFieldsFragment = (
  { __typename?: 'GettingStartedResourcesSection' }
  & Pick<GettingStartedResourcesSection, 'header'>
  & { resourcesCards?: Maybe<Array<Maybe<(
    { __typename?: 'GettingStartedResourcesCard' }
    & GettingStartedResourcesCardFieldsFragment
  )>>> }
);

export type GettingStartedResourcesCardFieldsFragment = (
  { __typename?: 'GettingStartedResourcesCard' }
  & Pick<GettingStartedResourcesCard, 'header' | 'descriptionRaw'>
  & { image?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
  )>, mobileImage?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
  )>, links?: Maybe<Array<Maybe<(
    { __typename?: 'Button' }
    & ButtonFieldsFragment
  )>>> }
);

export type HeroSectionFieldsFragment = (
  { __typename?: 'HeroSection' }
  & Pick<HeroSection, 'title' | 'descriptionRaw' | 'tooltipText'>
  & { backgroundImage?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
  )> }
);

export type ImageBoldTextLabelFieldsFragment = (
  { __typename?: 'ImageBoldTextLabel' }
  & Pick<ImageBoldTextLabel, 'boldText' | 'label'>
  & { image?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
  )> }
);

export type ImageFieldsFragment = (
  { __typename?: 'Image' }
  & { asset?: Maybe<(
    { __typename?: 'SanityImageAsset' }
    & Pick<SanityImageAsset, 'url'>
  )> }
);

export type ImageGridItemFieldsFragment = (
  { __typename?: 'ImageGridItem' }
  & Pick<ImageGridItem, 'header' | 'descriptionRaw'>
  & { image?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
  )>, button?: Maybe<(
    { __typename?: 'Button' }
    & ButtonFieldsFragment
  )> }
);

export type ImageGridSectionFieldsFragment = (
  { __typename?: 'ImageGridSection' }
  & { backgroundImage?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
  )>, items?: Maybe<Array<Maybe<(
    { __typename?: 'ImageGridItem' }
    & ImageGridItemFieldsFragment
  )>>> }
);

export type ImageItemsSectionFieldsFragment = (
  { __typename?: 'ImageItemsSection' }
  & Pick<ImageItemsSection, 'title' | 'description'>
  & { imageCards?: Maybe<Array<Maybe<(
    { __typename?: 'Card' }
    & CardFieldsFragment
  )>>> }
);

export type EcologicalImpactByIriQueryVariables = Exact<{
  iris?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type EcologicalImpactByIriQuery = (
  { __typename?: 'RootQuery' }
  & { allEcologicalImpact: Array<(
    { __typename?: 'EcologicalImpact' }
    & Pick<EcologicalImpact, 'name' | 'descriptionRaw'>
    & { image?: Maybe<(
      { __typename?: 'CustomImage' }
      & CustomImageFieldsFragment
    )>, sdgs?: Maybe<Array<Maybe<(
      { __typename?: 'Sdg' }
      & Pick<Sdg, 'title'>
      & { image?: Maybe<(
        { __typename?: 'CustomImage' }
        & CustomImageFieldsFragment
      )> }
    )>>>, standard?: Maybe<(
      { __typename?: 'CustomImage' }
      & CustomImageFieldsFragment
    )>, iri?: Maybe<(
      { __typename?: 'Slug' }
      & Pick<Slug, 'current'>
    )> }
  )> }
);

export type LandManagementPracticeFieldsFragment = (
  { __typename?: 'LandManagementPractice' }
  & Pick<LandManagementPractice, 'title' | 'descriptionRaw'>
  & { icon?: Maybe<(
    { __typename?: 'Image' }
    & { asset?: Maybe<(
      { __typename?: 'SanityImageAsset' }
      & Pick<SanityImageAsset, 'url'>
    )> }
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

export type ProjectByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectByIdQuery = (
  { __typename?: 'RootQuery' }
  & { allProject: Array<(
    { __typename?: 'Project' }
    & { credibilityCards?: Maybe<Array<Maybe<(
      { __typename?: 'ProjectDetailsCard' }
      & { credibilityCard?: Maybe<(
        { __typename?: 'CredibilityCard' }
        & Pick<CredibilityCard, 'title' | 'descriptionRaw'>
        & { icon?: Maybe<(
          { __typename?: 'Image' }
          & { asset?: Maybe<(
            { __typename?: 'SanityImageAsset' }
            & Pick<SanityImageAsset, 'altText' | 'url'>
          )> }
        )> }
      )>, claims?: Maybe<Array<Maybe<(
        { __typename?: 'Claim' }
        & Pick<Claim, 'description'>
      )>>> }
    )>>> }
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

export type SeoFieldsFragment = (
  { __typename?: 'Seo' }
  & Pick<Seo, 'title' | 'description'>
  & { image?: Maybe<(
    { __typename?: 'Image' }
    & { asset?: Maybe<(
      { __typename?: 'SanityImageAsset' }
      & Pick<SanityImageAsset, 'url'>
    )> }
  )> }
);

export type SdgByIriQueryVariables = Exact<{
  iris?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type SdgByIriQuery = (
  { __typename?: 'RootQuery' }
  & { allSdg: Array<(
    { __typename?: 'Sdg' }
    & Pick<Sdg, 'title'>
    & { image?: Maybe<(
      { __typename?: 'CustomImage' }
      & CustomImageFieldsFragment
    )>, iri?: Maybe<(
      { __typename?: 'Slug' }
      & Pick<Slug, 'current'>
    )> }
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

export type TimelineItemFieldsFragment = (
  { __typename?: 'TimelineItem' }
  & Pick<TimelineItem, 'title' | 'url'>
  & { image?: Maybe<(
    { __typename?: 'Image' }
    & { asset?: Maybe<(
      { __typename?: 'SanityImageAsset' }
      & Pick<SanityImageAsset, 'url'>
    )> }
  )>, tags?: Maybe<Array<Maybe<(
    { __typename?: 'Tag' }
    & TagFieldsFragment
  )>>> }
);

export type TitleCustomBodyFieldsFragment = (
  { __typename?: 'TitleCustomBody' }
  & Pick<TitleCustomBody, 'title' | 'bodyRaw'>
);

export type AllBridgePageQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBridgePageQuery = (
  { __typename?: 'RootQuery' }
  & { allBridgePage: Array<(
    { __typename?: 'BridgePage' }
    & { gettingStartedResourcesCard?: Maybe<(
      { __typename?: 'GettingStartedResourcesCard' }
      & GettingStartedResourcesCardFieldsFragment
    )> }
  )> }
);

export type BuyersFeaturedCardsSectionFieldsFragment = (
  { __typename?: 'BuyersFeaturedProjectCardsSection' }
  & Pick<BuyersFeaturedProjectCardsSection, 'title' | 'descriptionRaw'>
  & { backgroundImage?: Maybe<(
    { __typename?: 'CustomImage' }
    & Pick<CustomImage, 'imageHref' | 'imageAlt'>
    & { image?: Maybe<(
      { __typename?: 'Image' }
      & { asset?: Maybe<(
        { __typename?: 'SanityImageAsset' }
        & Pick<SanityImageAsset, 'url'>
      )> }
    )> }
  )>, cards?: Maybe<Array<Maybe<(
    { __typename?: 'FeaturedProjectCard' }
    & BuyersFeaturedProjectCardFragment
  )>>> }
);

export type BuyersFeaturedProjectCardFragment = (
  { __typename?: 'FeaturedProjectCard' }
  & { project?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'projectId'>
  )>, creditClass?: Maybe<(
    { __typename?: 'CreditClass' }
    & Pick<CreditClass, 'path'>
    & { image?: Maybe<(
      { __typename?: 'CustomImage' }
      & Pick<CustomImage, 'imageHref' | 'imageAlt'>
      & { image?: Maybe<(
        { __typename?: 'Image' }
        & { asset?: Maybe<(
          { __typename?: 'SanityImageAsset' }
          & Pick<SanityImageAsset, 'url'>
        )> }
      )> }
    )> }
  )> }
);

export type BuyersPartnersSectionFieldsFragment = (
  { __typename?: 'BuyersPartnersSection' }
  & Pick<BuyersPartnersSection, 'title'>
  & { partners?: Maybe<Array<Maybe<(
    { __typename?: 'Partner' }
    & Pick<Partner, 'name'>
    & { logo?: Maybe<(
      { __typename?: 'Image' }
      & { asset?: Maybe<(
        { __typename?: 'SanityImageAsset' }
        & Pick<SanityImageAsset, 'url'>
      )> }
    )> }
  )>>> }
);

export type BuyersQuoteSectionFieldsFragment = (
  { __typename?: 'BuyersQuoteSection' }
  & { quoteText?: Maybe<(
    { __typename?: 'BuyersQuoteText' }
    & Pick<BuyersQuoteText, 'quoteFirstPart' | 'quoteMiddlePart' | 'quoteLastPart'>
  )>, person?: Maybe<(
    { __typename?: 'Person' }
    & PersonFieldsFragment
  )>, backgroundImage?: Maybe<(
    { __typename?: 'CustomImage' }
    & CustomImageFieldsFragment
  )>, logo?: Maybe<(
    { __typename?: 'Image' }
    & ImageFieldsFragment
  )> }
);

export type PersonFieldsFragment = (
  { __typename?: 'Person' }
  & Pick<Person, 'name' | 'role'>
);

export type TagFieldsFragment = (
  { __typename?: 'Tag' }
  & Pick<Tag, 'name' | 'color'>
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
  secondButton {
    ...buttonFields
  }
  image {
    ...customImageFields
  }
}
    ${ButtonFieldsFragmentDoc}
${CustomImageFieldsFragmentDoc}`;
export const EcologicalCreditCardFieldsFragmentDoc = gql`
    fragment ecologicalCreditCardFields on EcologicalCreditCard {
  title
  description
  image {
    imageHref
    imageAlt
    image {
      asset {
        url
      }
    }
  }
  type {
    name
    image {
      asset {
        url
      }
    }
  }
  creditInfos {
    country
    price
    count
  }
  offsetMethods {
    name
    icon {
      asset {
        url
      }
    }
  }
  projectActivities {
    name
    icon {
      asset {
        url
      }
    }
  }
  button {
    buttonText
    buttonLink {
      buttonHref
    }
  }
}
    `;
export const EcologicalCreditCardsSectionFieldsFragmentDoc = gql`
    fragment ecologicalCreditCardsSectionFields on EcologicalCreditCardsSection {
  title
  descriptionRaw
  cards {
    ...ecologicalCreditCardFields
  }
}
    ${EcologicalCreditCardFieldsFragmentDoc}`;
export const EcologicalImpactRelationFieldsFragmentDoc = gql`
    fragment ecologicalImpactRelationFields on EcologicalImpactRelation {
  primary
  ecologicalImpact {
    name
    descriptionRaw
    image {
      ...customImageFields
    }
    sdgs {
      title
      image {
        ...customImageFields
      }
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
export const FeaturedSectionFieldsFragmentDoc = gql`
    fragment featuredSectionFields on FeaturedSection {
  header
  titleRaw
  descriptionRaw
  button {
    ...buttonFields
  }
  image {
    ...customImageFields
  }
}
    ${ButtonFieldsFragmentDoc}
${CustomImageFieldsFragmentDoc}`;
export const GettingStartedResourcesCardFieldsFragmentDoc = gql`
    fragment gettingStartedResourcesCardFields on GettingStartedResourcesCard {
  header
  descriptionRaw
  image {
    ...customImageFields
  }
  mobileImage {
    ...customImageFields
  }
  links {
    ...buttonFields
  }
}
    ${CustomImageFieldsFragmentDoc}
${ButtonFieldsFragmentDoc}`;
export const GettingStartedResourcesSectionFieldsFragmentDoc = gql`
    fragment gettingStartedResourcesSectionFields on GettingStartedResourcesSection {
  header
  resourcesCards {
    ...gettingStartedResourcesCardFields
  }
}
    ${GettingStartedResourcesCardFieldsFragmentDoc}`;
export const HeroSectionFieldsFragmentDoc = gql`
    fragment heroSectionFields on HeroSection {
  title
  descriptionRaw
  tooltipText
  backgroundImage {
    ...customImageFields
  }
}
    ${CustomImageFieldsFragmentDoc}`;
export const ImageBoldTextLabelFieldsFragmentDoc = gql`
    fragment imageBoldTextLabelFields on ImageBoldTextLabel {
  boldText
  label
  image {
    ...customImageFields
  }
}
    ${CustomImageFieldsFragmentDoc}`;
export const ImageGridItemFieldsFragmentDoc = gql`
    fragment imageGridItemFields on ImageGridItem {
  header
  descriptionRaw
  image {
    ...customImageFields
  }
  button {
    ...buttonFields
  }
}
    ${CustomImageFieldsFragmentDoc}
${ButtonFieldsFragmentDoc}`;
export const ImageGridSectionFieldsFragmentDoc = gql`
    fragment imageGridSectionFields on ImageGridSection {
  backgroundImage {
    ...customImageFields
  }
  items {
    ...imageGridItemFields
  }
}
    ${CustomImageFieldsFragmentDoc}
${ImageGridItemFieldsFragmentDoc}`;
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
export const ImageItemsSectionFieldsFragmentDoc = gql`
    fragment imageItemsSectionFields on ImageItemsSection {
  title
  description
  imageCards {
    ...cardFields
  }
}
    ${CardFieldsFragmentDoc}`;
export const LandManagementPracticeFieldsFragmentDoc = gql`
    fragment landManagementPracticeFields on LandManagementPractice {
  title
  descriptionRaw
  icon {
    asset {
      url
    }
  }
}
    `;
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
export const SeoFieldsFragmentDoc = gql`
    fragment seoFields on Seo {
  title
  description
  image {
    asset {
      url
    }
  }
}
    `;
export const TagFieldsFragmentDoc = gql`
    fragment tagFields on Tag {
  name
  color
}
    `;
export const TimelineItemFieldsFragmentDoc = gql`
    fragment timelineItemFields on TimelineItem {
  title
  url
  image {
    asset {
      url
    }
  }
  tags {
    ...tagFields
  }
}
    ${TagFieldsFragmentDoc}`;
export const TitleCustomBodyFieldsFragmentDoc = gql`
    fragment titleCustomBodyFields on TitleCustomBody {
  title
  bodyRaw
}
    `;
export const BuyersFeaturedProjectCardFragmentDoc = gql`
    fragment buyersFeaturedProjectCard on FeaturedProjectCard {
  project {
    projectId
  }
  creditClass {
    path
    image {
      imageHref
      imageAlt
      image {
        asset {
          url
        }
      }
    }
  }
}
    `;
export const BuyersFeaturedCardsSectionFieldsFragmentDoc = gql`
    fragment buyersFeaturedCardsSectionFields on BuyersFeaturedProjectCardsSection {
  title
  descriptionRaw
  backgroundImage {
    imageHref
    imageAlt
    image {
      asset {
        url
      }
    }
  }
  cards {
    ...buyersFeaturedProjectCard
  }
}
    ${BuyersFeaturedProjectCardFragmentDoc}`;
export const BuyersPartnersSectionFieldsFragmentDoc = gql`
    fragment buyersPartnersSectionFields on BuyersPartnersSection {
  title
  partners {
    name
    logo {
      asset {
        url
      }
    }
  }
}
    `;
export const PersonFieldsFragmentDoc = gql`
    fragment personFields on Person {
  name
  role
}
    `;
export const ImageFieldsFragmentDoc = gql`
    fragment imageFields on Image {
  asset {
    url
  }
}
    `;
export const BuyersQuoteSectionFieldsFragmentDoc = gql`
    fragment buyersQuoteSectionFields on BuyersQuoteSection {
  quoteText {
    quoteFirstPart
    quoteMiddlePart
    quoteLastPart
  }
  person {
    ...personFields
  }
  backgroundImage {
    ...customImageFields
  }
  logo {
    ...imageFields
  }
}
    ${PersonFieldsFragmentDoc}
${CustomImageFieldsFragmentDoc}
${ImageFieldsFragmentDoc}`;
export const AllBasketDetailsPageDocument = gql`
    query allBasketDetailsPage {
  allBasketDetailsPage {
    gettingStartedResourcesCard {
      ...gettingStartedResourcesCardFields
    }
  }
}
    ${GettingStartedResourcesCardFieldsFragmentDoc}`;

/**
 * __useAllBasketDetailsPageQuery__
 *
 * To run a query within a React component, call `useAllBasketDetailsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBasketDetailsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBasketDetailsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllBasketDetailsPageQuery(baseOptions?: Apollo.QueryHookOptions<AllBasketDetailsPageQuery, AllBasketDetailsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBasketDetailsPageQuery, AllBasketDetailsPageQueryVariables>(AllBasketDetailsPageDocument, options);
      }
export function useAllBasketDetailsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBasketDetailsPageQuery, AllBasketDetailsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBasketDetailsPageQuery, AllBasketDetailsPageQueryVariables>(AllBasketDetailsPageDocument, options);
        }
export type AllBasketDetailsPageQueryHookResult = ReturnType<typeof useAllBasketDetailsPageQuery>;
export type AllBasketDetailsPageLazyQueryHookResult = ReturnType<typeof useAllBasketDetailsPageLazyQuery>;
export type AllBasketDetailsPageQueryResult = Apollo.QueryResult<AllBasketDetailsPageQuery, AllBasketDetailsPageQueryVariables>;
export const AllBuyModalDocument = gql`
    query allBuyModal {
  allBuyModal {
    infoCard {
      title
      descriptionRaw
      image {
        ...customImageFields
      }
    }
  }
}
    ${CustomImageFieldsFragmentDoc}`;

/**
 * __useAllBuyModalQuery__
 *
 * To run a query within a React component, call `useAllBuyModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBuyModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBuyModalQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllBuyModalQuery(baseOptions?: Apollo.QueryHookOptions<AllBuyModalQuery, AllBuyModalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBuyModalQuery, AllBuyModalQueryVariables>(AllBuyModalDocument, options);
      }
export function useAllBuyModalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBuyModalQuery, AllBuyModalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBuyModalQuery, AllBuyModalQueryVariables>(AllBuyModalDocument, options);
        }
export type AllBuyModalQueryHookResult = ReturnType<typeof useAllBuyModalQuery>;
export type AllBuyModalLazyQueryHookResult = ReturnType<typeof useAllBuyModalLazyQuery>;
export type AllBuyModalQueryResult = Apollo.QueryResult<AllBuyModalQuery, AllBuyModalQueryVariables>;
export const AllBuyModalOptionsDocument = gql`
    query allBuyModalOptions {
  allBuyModalOptions {
    title
    cards {
      title
      descriptionRaw
      button {
        ...buttonFields
      }
      noteRaw
      image {
        ...customImageFields
      }
    }
  }
}
    ${ButtonFieldsFragmentDoc}
${CustomImageFieldsFragmentDoc}`;

/**
 * __useAllBuyModalOptionsQuery__
 *
 * To run a query within a React component, call `useAllBuyModalOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBuyModalOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBuyModalOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllBuyModalOptionsQuery(baseOptions?: Apollo.QueryHookOptions<AllBuyModalOptionsQuery, AllBuyModalOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBuyModalOptionsQuery, AllBuyModalOptionsQueryVariables>(AllBuyModalOptionsDocument, options);
      }
export function useAllBuyModalOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBuyModalOptionsQuery, AllBuyModalOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBuyModalOptionsQuery, AllBuyModalOptionsQueryVariables>(AllBuyModalOptionsDocument, options);
        }
export type AllBuyModalOptionsQueryHookResult = ReturnType<typeof useAllBuyModalOptionsQuery>;
export type AllBuyModalOptionsLazyQueryHookResult = ReturnType<typeof useAllBuyModalOptionsLazyQuery>;
export type AllBuyModalOptionsQueryResult = Apollo.QueryResult<AllBuyModalOptionsQuery, AllBuyModalOptionsQueryVariables>;
export const AllBuyersPageDocument = gql`
    query allBuyersPage {
  allBuyersPage {
    heroSection {
      ...heroSectionFields
    }
    ecologicalCreditsSection {
      ...imageItemsSectionFields
    }
    imageGridSection {
      ...imageGridSectionFields
    }
    ecologicalCreditCardsSection {
      ...ecologicalCreditCardsSectionFields
    }
    featuredProjectCardsSection {
      ...buyersFeaturedCardsSectionFields
    }
    quoteSection {
      ...buyersQuoteSectionFields
    }
    partnersSection {
      ...buyersPartnersSectionFields
    }
    contactSection {
      ...bottomBannerFields
    }
    footerButtonText
    metadata {
      ...pageMetadataFields
    }
  }
}
    ${HeroSectionFieldsFragmentDoc}
${ImageItemsSectionFieldsFragmentDoc}
${ImageGridSectionFieldsFragmentDoc}
${EcologicalCreditCardsSectionFieldsFragmentDoc}
${BuyersFeaturedCardsSectionFieldsFragmentDoc}
${BuyersQuoteSectionFieldsFragmentDoc}
${BuyersPartnersSectionFieldsFragmentDoc}
${BottomBannerFieldsFragmentDoc}
${PageMetadataFieldsFragmentDoc}`;

/**
 * __useAllBuyersPageQuery__
 *
 * To run a query within a React component, call `useAllBuyersPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBuyersPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBuyersPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllBuyersPageQuery(baseOptions?: Apollo.QueryHookOptions<AllBuyersPageQuery, AllBuyersPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBuyersPageQuery, AllBuyersPageQueryVariables>(AllBuyersPageDocument, options);
      }
export function useAllBuyersPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBuyersPageQuery, AllBuyersPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBuyersPageQuery, AllBuyersPageQueryVariables>(AllBuyersPageDocument, options);
        }
export type AllBuyersPageQueryHookResult = ReturnType<typeof useAllBuyersPageQuery>;
export type AllBuyersPageLazyQueryHookResult = ReturnType<typeof useAllBuyersPageLazyQuery>;
export type AllBuyersPageQueryResult = Apollo.QueryResult<AllBuyersPageQuery, AllBuyersPageQueryVariables>;
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
    iri {
      current
    }
    nameRaw
    descriptionRaw
    shortDescriptionRaw
    image {
      ...customImageFields
    }
    icon {
      asset {
        url
      }
    }
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
    ${CustomImageFieldsFragmentDoc}
${EcologicalImpactRelationFieldsFragmentDoc}
${CardFieldsFragmentDoc}
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
    seo {
      ...seoFields
    }
    heroSection {
      title
      bodyRaw
      button {
        ...buttonFields
      }
      background {
        ...customImageFields
      }
      icon {
        ...customImageFields
      }
    }
    gettingStartedResourcesSection {
      ...gettingStartedResourcesSectionFields
    }
    projectsSection {
      ...titleCustomBodyFields
    }
    creditClassesSection {
      ...titleCustomBodyFields
    }
    bottomBanner {
      ...bottomBannerFields
    }
  }
}
    ${SeoFieldsFragmentDoc}
${ButtonFieldsFragmentDoc}
${CustomImageFieldsFragmentDoc}
${GettingStartedResourcesSectionFieldsFragmentDoc}
${TitleCustomBodyFieldsFragmentDoc}
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
        ...landManagementPracticeFields
      }
      outcomes {
        ...ecologicalOutcomeFields
      }
    }
    timelineSection {
      header
      timelineItems {
        ...timelineItemFields
      }
    }
    featuredSection {
      ...featuredSectionFields
    }
    moreQuestionsSection {
      ...bottomBannerFields
    }
    footerButton {
      ...buttonFields
    }
    metadata {
      ...pageMetadataFields
    }
  }
}
    ${HeroSectionFieldsFragmentDoc}
${CardFieldsFragmentDoc}
${ImageBoldTextLabelFieldsFragmentDoc}
${LandManagementPracticeFieldsFragmentDoc}
${EcologicalOutcomeFieldsFragmentDoc}
${TimelineItemFieldsFragmentDoc}
${FeaturedSectionFieldsFragmentDoc}
${BottomBannerFieldsFragmentDoc}
${ButtonFieldsFragmentDoc}
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
export const AllProjectPageDocument = gql`
    query allProjectPage {
  allProjectPage {
    gettingStartedResourcesSection {
      ...gettingStartedResourcesSectionFields
    }
    projectDetailsSection {
      label
      title
      descriptionRaw
    }
  }
}
    ${GettingStartedResourcesSectionFieldsFragmentDoc}`;

/**
 * __useAllProjectPageQuery__
 *
 * To run a query within a React component, call `useAllProjectPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProjectPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProjectPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllProjectPageQuery(baseOptions?: Apollo.QueryHookOptions<AllProjectPageQuery, AllProjectPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllProjectPageQuery, AllProjectPageQueryVariables>(AllProjectPageDocument, options);
      }
export function useAllProjectPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllProjectPageQuery, AllProjectPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllProjectPageQuery, AllProjectPageQueryVariables>(AllProjectPageDocument, options);
        }
export type AllProjectPageQueryHookResult = ReturnType<typeof useAllProjectPageQuery>;
export type AllProjectPageLazyQueryHookResult = ReturnType<typeof useAllProjectPageLazyQuery>;
export type AllProjectPageQueryResult = Apollo.QueryResult<AllProjectPageQuery, AllProjectPageQueryVariables>;
export const AllProjectsPageDocument = gql`
    query allProjectsPage {
  allProjectsPage {
    gettingStartedResourcesSection {
      ...gettingStartedResourcesSectionFields
    }
  }
}
    ${GettingStartedResourcesSectionFieldsFragmentDoc}`;

/**
 * __useAllProjectsPageQuery__
 *
 * To run a query within a React component, call `useAllProjectsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProjectsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProjectsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllProjectsPageQuery(baseOptions?: Apollo.QueryHookOptions<AllProjectsPageQuery, AllProjectsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllProjectsPageQuery, AllProjectsPageQueryVariables>(AllProjectsPageDocument, options);
      }
export function useAllProjectsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllProjectsPageQuery, AllProjectsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllProjectsPageQuery, AllProjectsPageQueryVariables>(AllProjectsPageDocument, options);
        }
export type AllProjectsPageQueryHookResult = ReturnType<typeof useAllProjectsPageQuery>;
export type AllProjectsPageLazyQueryHookResult = ReturnType<typeof useAllProjectsPageLazyQuery>;
export type AllProjectsPageQueryResult = Apollo.QueryResult<AllProjectsPageQuery, AllProjectsPageQueryVariables>;
export const AllSoldOutProjectsDocument = gql`
    query allSoldOutProjects {
  allSoldOutProjects {
    soldOutProjectsList {
      projectName
      projectId
    }
  }
}
    `;

/**
 * __useAllSoldOutProjectsQuery__
 *
 * To run a query within a React component, call `useAllSoldOutProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSoldOutProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSoldOutProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSoldOutProjectsQuery(baseOptions?: Apollo.QueryHookOptions<AllSoldOutProjectsQuery, AllSoldOutProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSoldOutProjectsQuery, AllSoldOutProjectsQueryVariables>(AllSoldOutProjectsDocument, options);
      }
export function useAllSoldOutProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSoldOutProjectsQuery, AllSoldOutProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSoldOutProjectsQuery, AllSoldOutProjectsQueryVariables>(AllSoldOutProjectsDocument, options);
        }
export type AllSoldOutProjectsQueryHookResult = ReturnType<typeof useAllSoldOutProjectsQuery>;
export type AllSoldOutProjectsLazyQueryHookResult = ReturnType<typeof useAllSoldOutProjectsLazyQuery>;
export type AllSoldOutProjectsQueryResult = Apollo.QueryResult<AllSoldOutProjectsQuery, AllSoldOutProjectsQueryVariables>;
export const EcologicalImpactByIriDocument = gql`
    query EcologicalImpactByIri($iris: [String!]) {
  allEcologicalImpact(where: {iri: {current: {in: $iris}}}) {
    name
    descriptionRaw
    image {
      ...customImageFields
    }
    sdgs {
      title
      image {
        ...customImageFields
      }
    }
    standard {
      ...customImageFields
    }
    iri {
      current
    }
  }
}
    ${CustomImageFieldsFragmentDoc}`;

/**
 * __useEcologicalImpactByIriQuery__
 *
 * To run a query within a React component, call `useEcologicalImpactByIriQuery` and pass it any options that fit your needs.
 * When your component renders, `useEcologicalImpactByIriQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEcologicalImpactByIriQuery({
 *   variables: {
 *      iris: // value for 'iris'
 *   },
 * });
 */
export function useEcologicalImpactByIriQuery(baseOptions?: Apollo.QueryHookOptions<EcologicalImpactByIriQuery, EcologicalImpactByIriQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EcologicalImpactByIriQuery, EcologicalImpactByIriQueryVariables>(EcologicalImpactByIriDocument, options);
      }
export function useEcologicalImpactByIriLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EcologicalImpactByIriQuery, EcologicalImpactByIriQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EcologicalImpactByIriQuery, EcologicalImpactByIriQueryVariables>(EcologicalImpactByIriDocument, options);
        }
export type EcologicalImpactByIriQueryHookResult = ReturnType<typeof useEcologicalImpactByIriQuery>;
export type EcologicalImpactByIriLazyQueryHookResult = ReturnType<typeof useEcologicalImpactByIriLazyQuery>;
export type EcologicalImpactByIriQueryResult = Apollo.QueryResult<EcologicalImpactByIriQuery, EcologicalImpactByIriQueryVariables>;
export const ProjectByIdDocument = gql`
    query ProjectById($id: String!) {
  allProject(where: {projectId: {eq: $id}}) {
    credibilityCards {
      credibilityCard {
        title
        descriptionRaw
        icon {
          asset {
            altText
            url
          }
        }
      }
      claims {
        description
      }
    }
  }
}
    `;

/**
 * __useProjectByIdQuery__
 *
 * To run a query within a React component, call `useProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<ProjectByIdQuery, ProjectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectByIdQuery, ProjectByIdQueryVariables>(ProjectByIdDocument, options);
      }
export function useProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectByIdQuery, ProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectByIdQuery, ProjectByIdQueryVariables>(ProjectByIdDocument, options);
        }
export type ProjectByIdQueryHookResult = ReturnType<typeof useProjectByIdQuery>;
export type ProjectByIdLazyQueryHookResult = ReturnType<typeof useProjectByIdLazyQuery>;
export type ProjectByIdQueryResult = Apollo.QueryResult<ProjectByIdQuery, ProjectByIdQueryVariables>;
export const SdgByIriDocument = gql`
    query SdgByIri($iris: [String!]) {
  allSdg(where: {iri: {current: {in: $iris}}}) {
    title
    image {
      ...customImageFields
    }
    iri {
      current
    }
  }
}
    ${CustomImageFieldsFragmentDoc}`;

/**
 * __useSdgByIriQuery__
 *
 * To run a query within a React component, call `useSdgByIriQuery` and pass it any options that fit your needs.
 * When your component renders, `useSdgByIriQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSdgByIriQuery({
 *   variables: {
 *      iris: // value for 'iris'
 *   },
 * });
 */
export function useSdgByIriQuery(baseOptions?: Apollo.QueryHookOptions<SdgByIriQuery, SdgByIriQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SdgByIriQuery, SdgByIriQueryVariables>(SdgByIriDocument, options);
      }
export function useSdgByIriLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SdgByIriQuery, SdgByIriQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SdgByIriQuery, SdgByIriQueryVariables>(SdgByIriDocument, options);
        }
export type SdgByIriQueryHookResult = ReturnType<typeof useSdgByIriQuery>;
export type SdgByIriLazyQueryHookResult = ReturnType<typeof useSdgByIriLazyQuery>;
export type SdgByIriQueryResult = Apollo.QueryResult<SdgByIriQuery, SdgByIriQueryVariables>;
export const AllBridgePageDocument = gql`
    query allBridgePage {
  allBridgePage {
    gettingStartedResourcesCard {
      ...gettingStartedResourcesCardFields
    }
  }
}
    ${GettingStartedResourcesCardFieldsFragmentDoc}`;

/**
 * __useAllBridgePageQuery__
 *
 * To run a query within a React component, call `useAllBridgePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBridgePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBridgePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllBridgePageQuery(baseOptions?: Apollo.QueryHookOptions<AllBridgePageQuery, AllBridgePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBridgePageQuery, AllBridgePageQueryVariables>(AllBridgePageDocument, options);
      }
export function useAllBridgePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBridgePageQuery, AllBridgePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBridgePageQuery, AllBridgePageQueryVariables>(AllBridgePageDocument, options);
        }
export type AllBridgePageQueryHookResult = ReturnType<typeof useAllBridgePageQuery>;
export type AllBridgePageLazyQueryHookResult = ReturnType<typeof useAllBridgePageLazyQuery>;
export type AllBridgePageQueryResult = Apollo.QueryResult<AllBridgePageQuery, AllBridgePageQueryVariables>;