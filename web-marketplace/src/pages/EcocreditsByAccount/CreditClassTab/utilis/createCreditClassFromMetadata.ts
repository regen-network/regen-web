export const createCreditClassFromMetadata = (
  adminClass: any,
  metadata?: any,
) => {
  const metadataDescription =
    metadata?.['schema:description'] ||
    'This credit class provides a vehicle for nature based Verified Carbon Units (VCUs) to enter the blockchain space via issuance on Regen Ledger.';

  const className = adminClass.name;

  const imageUrl = adminClass.imgSrc;

  const nameRaw = [
    {
      _key: 'name0',
      _type: 'block',
      style: 'normal',
      children: [
        {
          _key: 'name-text0',
          _type: 'span',
          text: className,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ];

  const descriptionRaw = [
    {
      _key: 'description0',
      _type: 'block',
      style: 'normal',
      children: [
        {
          _key: 'text0',
          _type: 'span',
          text: metadataDescription,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ];

  // Return the on-chain data in Sanity-compatible format
  return {
    __typename: 'CreditClass' as const,
    id: adminClass.id,
    name: className,
    nameRaw: nameRaw,
    path: adminClass.id,
    shortDescriptionRaw: descriptionRaw,
    descriptionRaw: descriptionRaw,
    imgSrc: imageUrl,
    image: {
      __typename: 'CustomImage' as const,
      imageAlt: className || adminClass.id,
      imageHref: null,
      image: {
        __typename: 'Image' as const,
        asset: {
          __typename: 'SanityImageAsset' as const,
          url: imageUrl,
        },
      },
    },
  };
};
