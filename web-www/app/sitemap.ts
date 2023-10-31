import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.regen.network/',
      lastModified: new Date('2023-10-31'),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://www.regen.network/buyers',
      lastModified: new Date('2023-10-31'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.regen.network/media',
      lastModified: new Date('2023-10-31'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.regen.network/resources',
      lastModified: new Date('2023-10-31'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.regen.network/faq',
      lastModified: new Date('2023-10-31'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://www.regen.network/contact',
      lastModified: new Date('2023-10-31'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://www.regen.network/press-kit',
      lastModified: new Date('2023-10-31'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: 'https://www.regen.network/privacy-policy',
      lastModified: new Date('2023-10-31'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.regen.network/terms-service',
      lastModified: new Date('2023-10-31'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
