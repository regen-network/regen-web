const createBlockText = (text: string, key: string) => [
  {
    _key: key,
    _type: 'block',
    style: 'normal',
    children: [
      {
        _key: `${key}-text`,
        _type: 'span',
        text,
        marks: [],
      },
    ],
    markDefs: [],
  },
];

const createSanityImage = (imageUrl: string, altText: string) => ({
  __typename: 'CustomImage' as const,
  imageAlt: altText,
  imageHref: null,
  image: {
    __typename: 'Image' as const,
    asset: {
      __typename: 'SanityImageAsset' as const,
      url: imageUrl,
    },
  },
});

export const createCreditClassFromMetadata = (
  adminClass: any,
  metadata?: any,
) => {
  const description = metadata?.['schema:description'];
  const className = adminClass.name;
  const imageUrl = adminClass.imgSrc;

  return {
    __typename: 'CreditClass' as const,
    id: adminClass.id,
    name: className,
    nameRaw: createBlockText(className, 'name0'),
    path: adminClass.id,
    ...(description && {
      shortDescriptionRaw: createBlockText(description, 'description0'),
      descriptionRaw: createBlockText(description, 'description0'),
    }),
    imgSrc: imageUrl,
    image: createSanityImage(imageUrl, className || adminClass.id),
    ...(metadata && {
      'regen:sourceRegistry': metadata['regen:sourceRegistry'],
      accountByRegistryId: metadata.accountByRegistryId,
    }),
  };
};
